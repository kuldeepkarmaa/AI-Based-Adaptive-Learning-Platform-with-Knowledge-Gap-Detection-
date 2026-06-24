import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/common/Loader";

export default function Quiz() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [quiz,       setQuiz]       = useState(null);
  const [answers,    setAnswers]    = useState({});
  const [current,    setCurrent]    = useState(0);
  const [timeLeft,   setTimeLeft]   = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [started,    setStarted]    = useState(false);
  const [startTime,  setStartTime]  = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    API.get(`/quizzes/${id}`)
      .then(r => {
        setQuiz(r.data.data);
        if (r.data.data?.timeLimit) setTimeLeft(r.data.data.timeLimit * 60);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = useCallback(async (auto = false) => {
    if (submitting) return;
    if (!auto && !window.confirm("Submit quiz? You won't be able to change answers.")) return;
    setSubmitting(true);
    clearInterval(timerRef.current);
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    try {
      const res = await API.post(`/quizzes/${id}/submit`, { answers, timeTaken });
      navigate(`/student/results/${res.data.data._id}`);
    } catch (e) {
      alert(e.response?.data?.message || "Submission failed. Please try again.");
      setSubmitting(false);
    }
  }, [id, answers, navigate, submitting, startTime]);

  useEffect(() => {
    if (!started || timeLeft === null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); handleSubmit(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, handleSubmit]);

  if (loading) return <Loader fullScreen={false} />;
  if (!quiz)   return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <p className="text-on-surface-variant">Quiz not found</p>
      <Link to="/student/courses" className="mt-3 text-primary text-sm">Back to courses</Link>
    </div>
  );

  const questions = quiz.questions || [];
  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const pct = (answeredCount / (questions.length || 1)) * 100;

  // ── START SCREEN ────────────────────────────────────────────
  if (!started) return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="glass-card rounded-2xl p-8 space-y-5 text-center">
          <div className="w-16 h-16 primary-gradient rounded-2xl flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-white text-3xl"
              style={{ fontVariationSettings: '"FILL" 1' }}>quiz</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">{quiz.title}</h1>
            <p className="text-sm text-on-surface-variant mt-1">{quiz.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "help_outline",  label: "Questions",  val: questions.length },
              { icon: "timer",         label: "Time Limit",  val: quiz.timeLimit ? `${quiz.timeLimit} min` : "No limit" },
              { icon: "stars",         label: "Total Marks", val: quiz.totalMarks || questions.length },
              { icon: "format_list_numbered", label: "Passing Score", val: "50%" },
            ].map(s => (
              <div key={s.label} className="bg-surface-container rounded-xl p-3">
                <span className="material-symbols-outlined text-primary text-xl">{s.icon}</span>
                <p className="text-lg font-bold mt-1">{s.val}</p>
                <p className="text-xs text-on-surface-variant">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 rounded-xl p-4 text-left space-y-2">
            <p className="text-xs font-bold text-amber-700">Before you start:</p>
            {["Read each question carefully before selecting", "You can navigate between questions freely",
              quiz.timeLimit && "Timer starts immediately after you click Start",
              "Confirm your answers before final submission"].filter(Boolean).map((t, i) => (
              <p key={i} className="text-xs text-amber-700 flex items-start gap-2">
                <span className="material-symbols-outlined text-xs mt-0.5">check_circle</span>{t}
              </p>
            ))}
          </div>

          <button onClick={() => { setStarted(true); setStartTime(Date.now()); }}
            className="w-full py-3 primary-gradient text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm">
            Start Quiz →
          </button>
        </div>
      </div>
    </div>
  );

  // ── QUIZ SCREEN ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-outline-variant/30 px-4 py-3 flex items-center justify-between shadow-sm">
        <div>
          <p className="font-semibold text-sm">{quiz.title}</p>
          <p className="text-xs text-on-surface-variant">{answeredCount}/{questions.length} answered</p>
        </div>
        <div className="flex items-center gap-3">
          {timeLeft !== null && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
              timeLeft < 60 ? "bg-red-100 text-red-600 animate-pulse" : "bg-surface-container text-on-surface"}`}>
              <span className="material-symbols-outlined text-base">timer</span>
              {fmt(timeLeft)}
            </div>
          )}
          <button onClick={() => handleSubmit(false)} disabled={submitting}
            className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 disabled:opacity-60 transition-colors">
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-surface-dim">
        <div className="h-full primary-gradient transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full p-4 md:p-6 space-y-5">
        {/* Question card */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
              Q {current + 1} / {questions.length}
            </span>
            {q.topic && (
              <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs rounded-full">
                {q.topic}
              </span>
            )}
            {q.marks > 1 && (
              <span className="ml-auto text-xs text-on-surface-variant">{q.marks} marks</span>
            )}
          </div>
          <p className="text-base font-medium leading-relaxed">{q.questionText}</p>

          {/* MCQ / True-False */}
          {(q.type === "mcq" || q.type === "true_false") && (
            <div className="mt-5 space-y-3">
              {q.options.map((opt, idx) => {
                const sel = answers[q._id] === opt;
                return (
                  <button key={idx} onClick={() => setAnswers(p => ({ ...p, [q._id]: opt }))}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      sel
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant bg-surface-container hover:border-primary/40"
                    }`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      sel ? "bg-primary text-white" : "bg-surface-dim text-on-surface-variant"}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm">{opt}</span>
                    {sel && <span className="ml-auto material-symbols-outlined text-primary text-base"
                      style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>}
                  </button>
                );
              })}
            </div>
          )}

          {/* Short answer */}
          {q.type === "short_answer" && (
            <textarea value={answers[q._id] || ""} rows={4}
              onChange={e => setAnswers(p => ({ ...p, [q._id]: e.target.value }))}
              placeholder="Type your answer here…"
              className="mt-5 w-full p-4 bg-surface-container border-2 border-outline-variant rounded-xl text-sm resize-none focus:outline-none focus:border-primary transition-colors" />
          )}
        </div>

        {/* Question palette */}
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-on-surface-variant font-semibold mb-3">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((qq, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  i === current
                    ? "primary-gradient text-white shadow-sm"
                    : answers[qq._id]
                    ? "bg-green-100 text-green-700"
                    : "bg-surface-container text-on-surface-variant hover:bg-primary/10"
                }`}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded primary-gradient" />Current</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-200" />Answered</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-surface-container border border-outline-variant" />Skipped</span>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-outline-variant rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span> Previous
          </button>
          {current < questions.length - 1 ? (
            <button onClick={() => setCurrent(c => c + 1)}
              className="flex items-center gap-2 px-5 py-2.5 primary-gradient text-white rounded-xl text-sm font-semibold hover:opacity-90">
              Next <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          ) : (
            <button onClick={() => handleSubmit(false)} disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 disabled:opacity-60">
              <span className="material-symbols-outlined text-base">check_circle</span>
              {submitting ? "Submitting…" : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}