import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell,
} from "recharts";
import API from "../../services/api";
import Loader from "../../components/common/Loader";

const BarTooltip = ({ active, payload, label }) => active && payload?.length ? (
  <div className="bg-white border border-black/10 rounded-xl px-3 py-2 shadow-lg text-xs">
    <p className="text-on-surface-variant mb-1">{label}</p>
    <p className="font-bold text-primary">{payload[0].value}%</p>
  </div>
) : null;

export default function Reports() {
  const [report,  setReport]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/reports/student")
      .then(r => setReport(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen={false} />;

  if (!report) return (
    <div className="p-5 text-center py-16">
      <span className="material-symbols-outlined text-5xl text-outline">bar_chart</span>
      <p className="text-on-surface-variant text-sm mt-2">No report data available yet</p>
    </div>
  );

  const {
    totalAttempts, avgScore, enrolledCourses, knowledgeGaps,
    quizHistory, topicPerformance, weakTopics, recentAttempts
  } = report;

  const topPerf = [...(topicPerformance || [])].sort((a, b) => b.avgScore - a.avgScore);
  const weakPerf = [...(topicPerformance || [])].sort((a, b) => a.avgScore - b.avgScore);

  return (
    <div className="p-5 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold">Performance Reports</h1>
        <p className="text-sm text-on-surface-variant">Your complete learning analytics</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Quizzes", val: totalAttempts, icon: "quiz",           color: "text-violet-600 bg-violet-50" },
          { label: "Avg Score",     val: `${avgScore}%`, icon: "bar_chart",     color: "text-primary bg-primary/10" },
          { label: "Courses",       val: enrolledCourses, icon: "library_books", color: "text-blue-600 bg-blue-50" },
          { label: "Gaps Found",    val: knowledgeGaps, icon: "psychology",      color: "text-red-500 bg-red-50" },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-2xl p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color.split(" ")[1]}`}>
              <span className={`material-symbols-outlined ${s.color.split(" ")[0]}`}
                style={{ fontVariationSettings: '"FILL" 1' }}>{s.icon}</span>
            </div>
            <p className="text-2xl font-black text-on-surface">{s.val}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quiz Score History */}
      {quizHistory?.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4">Quiz Score History</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quizHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#4648d4" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4648d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e9ff" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#767586" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#767586" }} axisLine={false} tickLine={false} />
                <Tooltip content={<BarTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#4648d4" strokeWidth={2.5}
                  fill="url(#repGrad)" dot={{ r: 3, fill: "#4648d4", strokeWidth: 0 }}
                  activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Topic performance bar chart */}
      {topicPerformance?.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4">Topic Performance Breakdown</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicPerformance} margin={{ top: 5, right: 5, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e9ff" vertical={false} />
                <XAxis dataKey="topic" tick={{ fontSize: 9, fill: "#767586" }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#767586" }} axisLine={false} tickLine={false} />
                <Tooltip content={<BarTooltip />} />
                <Bar dataKey="avgScore" radius={[6, 6, 0, 0]}>
                  {topicPerformance.map((entry, i) => (
                    <Cell key={i} fill={entry.avgScore >= 75 ? "#4648d4" : entry.avgScore >= 50 ? "#f59e0b" : "#ef4444"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant justify-center">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary" />Strong (≥75%)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400" />Fair (50-74%)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400" />Weak (&lt;50%)</span>
          </div>
        </div>
      )}

      {/* Strong vs Weak topics */}
      {topicPerformance?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="glass-card rounded-2xl p-5">
            <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 text-base"
                style={{ fontVariationSettings: '"FILL" 1' }}>trending_up</span>
              Strong Topics
            </h2>
            {topPerf.slice(0, 4).map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-outline-variant/20 last:border-0">
                <span className="text-xs text-on-surface-variant w-4">{i + 1}</span>
                <span className="flex-1 text-sm font-medium truncate">{t.topic}</span>
                <span className="text-sm font-bold text-green-600">{t.avgScore}%</span>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 text-base"
                style={{ fontVariationSettings: '"FILL" 1' }}>trending_down</span>
              Needs Improvement
            </h2>
            {weakPerf.slice(0, 4).map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-outline-variant/20 last:border-0">
                <span className="text-xs text-on-surface-variant w-4">{i + 1}</span>
                <span className="flex-1 text-sm font-medium truncate">{t.topic}</span>
                <span className="text-sm font-bold text-red-500">{t.avgScore}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent attempts */}
      {recentAttempts?.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">Recent Attempts</h2>
            <Link to="/student/results" className="text-xs text-primary font-semibold">See all →</Link>
          </div>
          <div className="space-y-2.5">
            {recentAttempts.map(a => {
              const col = a.score >= 75 ? "text-green-600" : a.score >= 50 ? "text-amber-600" : "text-red-500";
              return (
                <Link key={a._id} to={`/student/results/${a._id}`}
                  className="flex items-center gap-3 p-3 bg-surface-container rounded-xl hover:bg-primary/5 transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-surface-dim flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-sm font-black ${col}`}>{a.score}%</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.quizTitle}</p>
                    <p className="text-xs text-on-surface-variant">{a.courseTitle}</p>
                  </div>
                  <p className="text-xs text-on-surface-variant flex-shrink-0">
                    {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      <Link to="/student/recommendations"
        className="flex items-center justify-center gap-2 w-full py-3.5 primary-gradient text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
        <span className="material-symbols-outlined text-base"
          style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
        View AI Recommendations Based on This Report
      </Link>
    </div>
  );
}