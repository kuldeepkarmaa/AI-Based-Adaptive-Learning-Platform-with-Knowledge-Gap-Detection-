import { Link } from "react-router-dom";

/**
 * QuizResult
 * Props:
 *   attempt  – QuizAttempt object from backend
 *              { score, correct, incorrect, skipped, topicScores, geminiAnalysis, timeTaken, quiz, course }
 *   onRetake – optional () => void
 */
export default function QuizResult({ attempt, onRetake }) {
  if (!attempt) return null;

  const {
    score, correct, incorrect, skipped,
    topicScores = [], geminiAnalysis, timeTaken,
    quiz, course,
  } = attempt;

  /* Grade config */
  const grade =
    score >= 90 ? { label: "Excellent! 🏆", color: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-200", icon: "workspace_premium" }
  : score >= 75 ? { label: "Great Work! ⭐",  color: "text-green-600",   bg: "bg-green-50",   ring: "ring-green-200",   icon: "star" }
  : score >= 50 ? { label: "Good Job! 👍",   color: "text-amber-600",   bg: "bg-amber-50",   ring: "ring-amber-200",   icon: "thumb_up" }
  :               { label: "Keep Trying! 💪", color: "text-red-500",    bg: "bg-red-50",     ring: "ring-red-200",     icon: "refresh" };

  const fmtTime = (s) => {
    if (!s) return "—";
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  return (
    <div className="space-y-5">
      {/* Score hero card */}
      <div className="primary-gradient rounded-2xl p-6 text-white text-center relative overflow-hidden">
        <div
          className="blob-animation"
          style={{ width: 200, height: 200, top: -60, right: -40, opacity: 0.15 }}
        />
        <div className="relative z-10">
          {/* Grade icon */}
          <div
            className={`w-20 h-20 ${grade.bg} ring-4 ${grade.ring} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <span
              className={`material-symbols-outlined text-4xl ${grade.color}`}
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              {grade.icon}
            </span>
          </div>

          <p className="text-6xl font-black tracking-tight">{score}%</p>
          <p className="text-white/80 text-base font-semibold mt-1">{grade.label}</p>

          {quiz?.title && (
            <p className="text-white/60 text-xs mt-1">{quiz.title}</p>
          )}

          <div className="flex items-center justify-center gap-3 mt-3 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">timer</span>
              {fmtTime(timeTaken)}
            </span>
            {course?.title && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">school</span>
                {course.title}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Answer stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Correct",   val: correct,   icon: "check_circle", textColor: "text-green-600", bgColor: "bg-green-50"  },
          { label: "Incorrect", val: incorrect, icon: "cancel",        textColor: "text-red-500",   bgColor: "bg-red-50"    },
          { label: "Skipped",   val: skipped,   icon: "remove_circle", textColor: "text-amber-500", bgColor: "bg-amber-50"  },
        ].map((s) => (
          <div key={s.label} className={`${s.bgColor} rounded-2xl p-4 text-center`}>
            <span
              className={`material-symbols-outlined text-2xl ${s.textColor}`}
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              {s.icon}
            </span>
            <p className={`text-2xl font-black mt-1 ${s.textColor}`}>{s.val}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Topic breakdown */}
      {topicScores.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base"
              style={{ fontVariationSettings: '"FILL" 1' }}>bar_chart</span>
            Topic-wise Performance
          </h3>
          <div className="space-y-4">
            {topicScores.map((ts, i) => {
              const pct = ts.total > 0 ? Math.round((ts.score / ts.total) * 100) : 0;
              const barColor =
                pct >= 75 ? "#16a34a"
                : pct >= 50 ? "#d97706"
                : "#ef4444";
              return (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium truncate max-w-[60%]">{ts.topic}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-on-surface-variant">
                        {ts.score}/{ts.total}
                      </span>
                      <span className="text-sm font-bold" style={{ color: barColor }}>
                        {pct}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-surface-dim rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Gemini AI Analysis */}
      {geminiAnalysis && (
        <div className="glass-card rounded-2xl p-5 border border-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              auto_awesome
            </span>
            <h3 className="font-semibold text-sm">AI Analysis</h3>
            <span className="ml-auto text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
              Gemini AI
            </span>
          </div>

          {/* Overall assessment */}
          {geminiAnalysis.overallStrength && (
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              {geminiAnalysis.overallStrength}
            </p>
          )}

          {/* Strong topics */}
          {geminiAnalysis.strongTopics?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs"
                  style={{ fontVariationSettings: '"FILL" 1' }}>trending_up</span>
                Strong Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {geminiAnalysis.strongTopics.map((t, i) => (
                  <span key={i}
                    className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gaps */}
          {geminiAnalysis.gaps?.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-red-600 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs"
                  style={{ fontVariationSettings: '"FILL" 1' }}>warning</span>
                Areas to Improve
              </p>
              {geminiAnalysis.gaps.map((g, i) => {
                const sev = {
                  high:   "bg-red-50 border-red-100",
                  medium: "bg-amber-50 border-amber-100",
                  low:    "bg-blue-50 border-blue-100",
                }[g.severity] || "bg-surface-container border-outline-variant";
                const sevText = {
                  high: "text-red-500", medium: "text-amber-500", low: "text-blue-500",
                }[g.severity] || "text-on-surface-variant";

                return (
                  <div key={i} className={`border rounded-xl p-4 ${sev}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-semibold text-sm">{g.topic}</p>
                      <span className={`text-[10px] font-black uppercase ${sevText}`}>
                        {g.severity}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{g.description}</p>
                    {g.recommendations?.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {g.recommendations.map((r, j) => (
                          <li key={j} className="text-xs flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-xs text-primary mt-0.5">
                              arrow_right
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Encouragement */}
          {geminiAnalysis.encouragement && (
            <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm text-primary font-medium italic leading-relaxed">
                "{geminiAnalysis.encouragement}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/student/recommendations"
          className="flex-1 py-3 primary-gradient text-white text-sm font-bold rounded-xl text-center flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-base"
            style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
          View AI Recommendations
        </Link>
        {onRetake && (
          <button
            onClick={onRetake}
            className="flex-1 py-3 bg-white border border-outline-variant text-on-surface text-sm font-semibold rounded-xl hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">replay</span>
            Retake Quiz
          </button>
        )}
        <Link
          to="/student/results"
          className="flex-1 py-3 bg-surface-container text-on-surface-variant text-sm font-semibold rounded-xl text-center hover:bg-outline-variant/20 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-base">history</span>
          All Results
        </Link>
      </div>
    </div>
  );
}
