import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/common/Loader";
import QuizCard     from "../../components/quiz/QuizCard";
import QuizQuestion from "../../components/quiz/QuizQuestion";
import QuizTimer    from "../../components/quiz/QuizTimer";
import QuizResult   from "../../components/quiz/QuizResult";

/* ═══════════════════════════════════════════════
   QUIZ LIST PAGE  –  /student/quiz
═══════════════════════════════════════════════ */
function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const enrolledRes = await API.get("/student/enrolled-courses");
        const courseIds   = (enrolledRes.data.data || []).map(e => e.course?._id).filter(Boolean);
        if (!courseIds.length) { setLoading(false); return; }

        const results = await Promise.all(
          courseIds.map(id =>
            API.get(`/quizzes?courseId=${id}`).then(r => r.data.data || []).catch(() => [])
          )
        );
        const flat   = results.flat();
        const unique = Object.values(flat.reduce((acc, q) => ({ ...acc, [q._id]: q }), {}));
        setQuizzes(unique);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader fullScreen={false} />;

  const filtered = quizzes.filter(q => {
    const match = q.title?.toLowerCase().includes(search.toLowerCase());
    if (filter === "pending")   return match && !q.attempted;
    if (filter === "completed") return match && q.attempted;
    return match;
  });

  const pending   = quizzes.filter(q => !q.attempted).length;
  const completed = quizzes.filter(q =>  q.attempted).length;

  return (
    <div className="p-5 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold">Quizzes</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">All quizzes from your enrolled courses</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:"Total",     val:quizzes.length, icon:"quiz",         bg:"bg-primary/10",  tc:"text-primary"   },
          { label:"Pending",   val:pending,         icon:"pending",      bg:"bg-amber-50",    tc:"text-amber-600" },
          { label:"Completed", val:completed,       icon:"check_circle", bg:"bg-green-50",    tc:"text-green-600" },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-2xl p-4 text-center">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${s.bg}`}>
              <span className={`material-symbols-outlined text-xl ${s.tc}`}
                style={{ fontVariationSettings:'"FILL" 1' }}>{s.icon}</span>
            </div>
            <p className="text-xl font-black">{s.val}</p>
            <p className="text-xs text-on-surface-variant">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search quizzes…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"/>
        </div>
        <div className="flex gap-2">
          {["all","pending","completed"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-white border border-outline-variant text-on-surface-variant hover:border-primary/50"
              }`}>{f}</button>
          ))}
        </div>
      </div>

      {/* List using QuizCard (list mode) */}
      {!filtered.length ? (
        <div className="text-center py-16 space-y-3">
          <span className="material-symbols-outlined text-5xl text-outline">quiz</span>
          <p className="text-on-surface-variant text-sm">
            {!quizzes.length ? "No quizzes yet — enroll in a course first" : "No quizzes match your filter"}
          </p>
          {!quizzes.length && (
            <Link to="/student/courses"
              className="inline-block mt-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl">
              Browse Courses
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(q => (
            <QuizCard key={q._id} quiz={q} mode="list" attempted={q.attempted} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   QUIZ TAKER PAGE  –  /student/quiz/:id
═══════════════════════════════════════════════ */
function QuizTaker() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const tRef     = useRef(null);

  const [quiz,       setQuiz]       = useState(null);
  const [answers,    setAnswers]    = useState({});
  const [current,    setCurrent]    = useState(0);
  const [timeLeft,   setTimeLeft]   = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [started,    setStarted]    = useState(false);
  const [startTime,  setStartTime]  = useState(null);
  const [result,     setResult]     = useState(null); // after submit

  useEffect(() => {
    API.get(`/quizzes/${id}`)
      .then(r => {
        setQuiz(r.data.data);
        if (r.data.data?.timeLimit) setTimeLeft(r.data.data.timeLimit * 60);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const doSubmit = async (auto = false) => {
    if (submitting) return;
    if (!auto && !window.confirm("Submit quiz now? This cannot be undone.")) return;
    setSubmitting(true);
    clearInterval(tRef.current);
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    try {
      const res = await API.post(`/quizzes/${id}/submit`, { answers, timeTaken });
      // Navigate to result page
      navigate(`/student/results/${res.data.data._id}`);
    } catch (e) {
      alert(e.response?.data?.message || "Submission failed. Please try again.");
      setSubmitting(false);
    }
  };

  const handleStart = () => {
    setStarted(true);
    setStartTime(Date.now());
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // ── Loading ──
  if (loading) return <Loader fullScreen={false} />;

  if (!quiz) return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-3">
      <span className="material-symbols-outlined text-5xl text-outline">error_outline</span>
      <p className="text-on-surface-variant text-sm">Quiz not found</p>
      <Link to="/student/quiz" className="text-primary text-sm font-semibold">← Back to Quizzes</Link>
    </div>
  );

  const questions     = quiz.questions || [];
  const answeredCount = Object.keys(answers).length;
  const pct           = (answeredCount / Math.max(questions.length, 1)) * 100;

  // ── Start screen – uses QuizCard ──
  if (!started) {
    return (
      <QuizCard
        quiz={quiz}
        questions={questions}
        mode="start"
        onStart={handleStart}
      />
    );
  }

  // ── Active quiz ──
  const q = questions[current];

  return (
    <div className="min-h-screen bg-surface flex flex-col">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-outline-variant/30 px-4 py-3 flex items-center justify-between shadow-sm">
        <div>
          <p className="font-semibold text-sm truncate max-w-48 md:max-w-xs">{quiz.title}</p>
          <p className="text-xs text-on-surface-variant">{answeredCount}/{questions.length} answered</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Timer component */}
          {started && timeLeft !== null && (
            <QuizTimer
              timeLeft={timeLeft}
              onTick={setTimeLeft}
              onTimeUp={() => doSubmit(true)}
              isRunning={started && !submitting}
            />
          )}
          <button
            onClick={() => doSubmit(false)}
            disabled={submitting}
            className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 disabled:opacity-60 transition-colors"
          >
            {submitting ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                Submitting…
              </span>
            ) : "Submit"}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-surface-dim">
        <div className="h-full primary-gradient transition-all duration-300" style={{ width:`${pct}%` }}/>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full p-4 md:p-6 space-y-5">

        {/* Question – uses QuizQuestion component */}
        <QuizQuestion
          question={q}
          questionNumber={current + 1}
          totalQuestions={questions.length}
          selectedAnswer={answers[q?._id] || ""}
          onAnswer={handleAnswer}
        />

        {/* ── Question Navigator palette ── */}
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-on-surface-variant mb-3">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((qq, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  i === current
                    ? "primary-gradient text-white shadow-sm"
                    : answers[qq._id]
                    ? "bg-green-100 text-green-700"
                    : "bg-surface-container text-on-surface-variant hover:bg-primary/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded primary-gradient"/>Current
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-green-200"/>Answered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-surface-dim border border-outline-variant"/>Unanswered
            </span>
          </div>
        </div>

        {/* ── Prev / Next navigation ── */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrent(c => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-outline-variant rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span> Previous
          </button>

          {current < questions.length - 1 ? (
            <button
              onClick={() => setCurrent(c => c + 1)}
              className="flex items-center gap-2 px-5 py-2.5 primary-gradient text-white rounded-xl text-sm font-semibold hover:opacity-90"
            >
              Next <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={() => doSubmit(false)}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-base"
                style={{ fontVariationSettings:'"FILL" 1' }}>check_circle</span>
              {submitting ? "Submitting…" : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DEFAULT EXPORT — router on :id presence
═══════════════════════════════════════════════ */
export default function Quiz() {
  const { id } = useParams();
  return id ? <QuizTaker /> : <QuizList />;
}
