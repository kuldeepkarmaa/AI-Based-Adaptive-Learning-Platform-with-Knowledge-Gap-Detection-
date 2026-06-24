import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/common/Loader";

const PRIORITY_CONFIG = {
  high:   { bg: "bg-red-50",    border: "border-red-100",    badge: "bg-red-100 text-red-600",    dot: "bg-red-500"  },
  medium: { bg: "bg-amber-50",  border: "border-amber-100",  badge: "bg-amber-100 text-amber-600", dot: "bg-amber-500" },
  low:    { bg: "bg-blue-50",   border: "border-blue-100",   badge: "bg-blue-100 text-blue-600",   dot: "bg-blue-400" },
};

export default function Recommendations() {
  const [recs,    setRecs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [active,  setActive]  = useState(0); // which recommendation set is expanded

  useEffect(() => {
    API.get("/recommendations/my")
      .then(r => setRecs(r.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen={false} />;

  if (!recs.length) return (
    <div className="p-5 md:p-6">
      <h1 className="text-xl font-bold">AI Recommendations</h1>
      <div className="mt-12 text-center space-y-4">
        <div className="w-20 h-20 primary-gradient/10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-4xl text-primary"
            style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
        </div>
        <p className="font-semibold">No recommendations yet</p>
        <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
          Take a quiz first — our AI will analyze your performance and generate personalized learning recommendations.
        </p>
        <Link to="/student/courses"
          className="inline-block px-5 py-2.5 primary-gradient text-white text-sm font-semibold rounded-xl">
          Start Learning
        </Link>
      </div>
    </div>
  );

  const current = recs[active];
  const allWeakTopics = [...new Set(recs.flatMap(r => r.weakTopics || []))];

  return (
    <div className="p-5 md:p-6 space-y-5">
      {/* Header */}
      <div className="primary-gradient rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="blob-animation" style={{ width:200, height:200, top:-60, right:-40, opacity:0.15 }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">Powered by Gemini AI</span>
          </div>
          <h1 className="text-xl font-bold">Your Learning Roadmap</h1>
          <p className="text-white/70 text-sm mt-1">Personalized based on your quiz performance</p>
          <div className="flex gap-4 mt-4 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">psychology</span>
              {allWeakTopics.length} gaps detected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">lightbulb</span>
              {recs.reduce((s, r) => s + (r.recommendations?.length || 0), 0)} suggestions
            </span>
          </div>
        </div>
      </div>

      {/* Weak topics pills */}
      {allWeakTopics.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500 text-base"
              style={{ fontVariationSettings: '"FILL" 1' }}>warning</span>
            Knowledge Gaps Identified
          </h2>
          <div className="flex flex-wrap gap-2">
            {allWeakTopics.map((t, i) => (
              <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Session picker */}
      {recs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {recs.map((r, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                active === i ? "bg-primary text-white" : "bg-white border border-outline-variant text-on-surface-variant"
              }`}>
              Session {i + 1} · {new Date(r.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </button>
          ))}
        </div>
      )}

      {/* Recommendation cards */}
      <div className="space-y-4">
        <h2 className="font-semibold text-sm">Action Plan</h2>
        {current?.recommendations?.map((rec, i) => {
          const cfg = PRIORITY_CONFIG[rec.priority] || PRIORITY_CONFIG.medium;
          return (
            <div key={i} className={`border rounded-2xl p-5 ${cfg.bg} ${cfg.border}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${cfg.dot}`} />
                  <h3 className="font-bold text-sm">{rec.topic}</h3>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.badge}`}>
                  {rec.priority} priority
                </span>
              </div>
              <p className="text-sm text-on-surface-variant ml-5 leading-relaxed">{rec.suggestion}</p>

              {rec.estimatedTime && (
                <div className="flex items-center gap-1.5 ml-5 mt-2 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  Est. time: {rec.estimatedTime}
                </div>
              )}

              {rec.resources?.length > 0 && (
                <div className="ml-5 mt-3 space-y-1.5">
                  <p className="text-xs font-semibold text-on-surface-variant">Resources:</p>
                  {rec.resources.map((r, j) => (
                    <p key={j} className="text-xs flex items-start gap-2">
                      <span className="material-symbols-outlined text-xs text-primary mt-0.5">bookmark</span>
                      {r}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly Study Plan */}
      {current?.studyPlan && (
        <div className="glass-card rounded-2xl p-5 border border-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: '"FILL" 1' }}>calendar_month</span>
            <h2 className="font-semibold text-sm">AI-Generated Weekly Study Plan</h2>
          </div>
          <div className="bg-primary/5 rounded-xl p-4">
            <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">{current.studyPlan}</p>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <Link to="/student/chatbot"
          className="flex-1 py-3 primary-gradient text-white text-sm font-bold rounded-xl text-center flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-base">smart_toy</span>
          Ask AI Tutor
        </Link>
        <Link to="/student/courses"
          className="flex-1 py-3 bg-white border border-outline-variant text-on-surface text-sm font-semibold rounded-xl text-center hover:bg-surface-container">
          Browse Courses
        </Link>
      </div>
    </div>
  );
}