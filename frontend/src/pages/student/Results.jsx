import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/common/Loader";

/* ── Result detail for a single attempt ── */
function ResultDetail({ id }) {
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/quizzes/attempts/${id}`)
      .then(r => setAttempt(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)  return <Loader fullScreen={false} />;
  if (!attempt) return <p className="text-on-surface-variant text-center py-12">Result not found</p>;

  const { score, correct, incorrect, skipped, quiz, topicScores, geminiAnalysis, timeTaken } = attempt;
  const grade = score >= 90 ? { label: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50", icon: "workspace_premium" }
              : score >= 75 ? { label: "Great",     color: "text-green-600",   bg: "bg-green-50",   icon: "star" }
              : score >= 50 ? { label: "Good",      color: "text-amber-600",   bg: "bg-amber-50",   icon: "thumb_up" }
              :               { label: "Needs Work", color: "text-red-500",    bg: "bg-red-50",     icon: "refresh" };

  const fmt = s => s ? `${Math.floor(s/60)}m ${s%60}s` : "—";

  return (
    <div className="p-5 md:p-6 space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/student/results" className="w-9 h-9 flex items-center justify-center bg-white border border-outline-variant rounded-xl hover:bg-surface-container">
          <span className="material-symbols-outlined text-base">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-bold text-lg">{quiz?.title || "Quiz Result"}</h1>
          <p className="text-xs text-on-surface-variant">{new Date(attempt.createdAt).toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Score card */}
      <div className="primary-gradient rounded-2xl p-6 text-white text-center relative overflow-hidden">
        <div className="blob-animation" style={{ width:200, height:200, top:-60, right:-60, opacity:0.15 }} />
        <div className={`w-20 h-20 ${grade.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
          <span className={`material-symbols-outlined text-4xl ${grade.color}`}
            style={{ fontVariationSettings: '"FILL" 1' }}>{grade.icon}</span>
        </div>
        <p className="text-5xl font-black">{score}%</p>
        <p className="text-white/80 mt-1">{grade.label}</p>
        <p className="text-white/60 text-xs mt-2">Time taken: {fmt(timeTaken)}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Correct",   val: correct,   color: "text-green-600", bg: "bg-green-50",  icon: "check_circle" },
          { label: "Incorrect", val: incorrect, color: "text-red-500",   bg: "bg-red-50",    icon: "cancel" },
          { label: "Skipped",   val: skipped,   color: "text-amber-500", bg: "bg-amber-50",  icon: "remove_circle" },
        ].map(s => (
          <div key={s.label} className={`glass-card rounded-xl p-4 text-center ${s.bg}`}>
            <span className={`material-symbols-outlined text-2xl ${s.color}`}
              style={{ fontVariationSettings: '"FILL" 1' }}>{s.icon}</span>
            <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.val}</p>
            <p className="text-xs text-on-surface-variant">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Topic breakdown */}
      {topicScores?.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4">Topic-wise Performance</h2>
          <div className="space-y-3">
            {topicScores.map((ts, i) => {
              const pct = ts.total > 0 ? Math.round((ts.score / ts.total) * 100) : 0;
              const col = pct >= 75 ? "#16a34a" : pct >= 50 ? "#d97706" : "#ef4444";
              return (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium">{ts.topic}</span>
                    <span className="font-bold" style={{ color: col }}>{ts.score}/{ts.total} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-surface-dim rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: col }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Gemini Analysis */}
      {geminiAnalysis && (
        <div className="glass-card rounded-2xl p-5 border border-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
            <h2 className="font-semibold text-sm">AI Analysis</h2>
            <span className="ml-auto text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">Powered by Gemini</span>
          </div>

          <p className="text-sm text-on-surface-variant mb-4">{geminiAnalysis.overallStrength}</p>

          {geminiAnalysis.gaps?.length > 0 && (
            <div className="space-y-3">
              {geminiAnalysis.gaps.map((g, i) => {
                const sev = { high: "bg-red-50 border-red-100", medium: "bg-amber-50 border-amber-100", low: "bg-blue-50 border-blue-100" }[g.severity] || "bg-surface-container";
                const sevColor = { high: "text-red-500", medium: "text-amber-500", low: "text-blue-500" }[g.severity] || "";
                return (
                  <div key={i} className={`border rounded-xl p-4 ${sev}`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm">{g.topic}</p>
                      <span className={`text-[10px] font-bold uppercase ${sevColor}`}>{g.severity} priority</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-2">{g.description}</p>
                    {g.recommendations?.map((r, j) => (
                      <p key={j} className="text-xs flex items-start gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-xs mt-0.5 text-primary">arrow_right</span>{r}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {geminiAnalysis.encouragement && (
            <div className="mt-4 p-4 bg-primary/5 rounded-xl">
              <p className="text-sm text-primary font-medium italic">"{geminiAnalysis.encouragement}"</p>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="flex gap-3">
        <Link to="/student/recommendations"
          className="flex-1 py-3 primary-gradient text-white text-sm font-bold rounded-xl text-center">
          View AI Recommendations
        </Link>
        <Link to="/student/courses"
          className="flex-1 py-3 bg-white border border-outline-variant text-on-surface text-sm font-semibold rounded-xl text-center hover:bg-surface-container">
          Back to Courses
        </Link>
      </div>
    </div>
  );
}

/* ── All results list ── */
function AllResults() {
  const [attempts, setAttempts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    API.get("/quizzes/my-results")
      .then(r => setAttempts(r.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen={false} />;

  return (
    <div className="p-5 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold">Quiz Results</h1>
        <p className="text-sm text-on-surface-variant">All your quiz attempts and scores</p>
      </div>

      {!attempts.length ? (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-outline">quiz</span>
          <p className="mt-2 text-on-surface-variant text-sm">No quiz attempts yet</p>
          <Link to="/student/courses" className="inline-block mt-4 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {attempts.map(a => {
            const col = a.score >= 75 ? "text-green-600 bg-green-50" : a.score >= 50 ? "text-amber-600 bg-amber-50" : "text-red-500 bg-red-50";
            return (
              <Link key={a._id} to={`/student/results/${a._id}`}
                className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${col.split(" ")[1]}`}>
                  <span className={`text-lg font-black leading-none ${col.split(" ")[0]}`}>{a.score}%</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{a.quiz?.title || "Quiz"}</p>
                  <p className="text-xs text-on-surface-variant">{a.course?.title || ""}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-on-surface-variant">
                    <span className="text-green-600">✓ {a.correct}</span>
                    <span className="text-red-500">✗ {a.incorrect}</span>
                    {a.skipped > 0 && <span>— {a.skipped} skipped</span>}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-on-surface-variant">{new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  <span className="material-symbols-outlined text-outline text-base mt-1">chevron_right</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Router: /student/results vs /student/results/:id ── */
export default function Results() {
  const { id } = useParams();
  return id ? <ResultDetail id={id} /> : <AllResults />;
}