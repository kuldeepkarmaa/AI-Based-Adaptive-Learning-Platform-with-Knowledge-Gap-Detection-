// ─────────────────────────────────────────────────────────────
// src/pages/admin/Analytics.jsx
// ─────────────────────────────────────────────────────────────
import StatCard from "../../components/dashboard/StatCard";

const STATS = [
  { id: "users",      label: "New Users",         value: "+264",  valueClassName: "text-primary"   },
  { id: "completions",label: "Completions",        value: "1,847", valueClassName: "text-green-600" },
  { id: "passrate",   label: "Quiz Pass Rate",     value: "73.4%", valueClassName: "text-secondary" },
  { id: "ai",         label: "AI Interactions",    value: "14,280",valueClassName: "text-red-500"   },
];

const MONTHLY_USERS = [
  { month: "Jan", users: 620  },
  { month: "Feb", users: 740  },
  { month: "Mar", users: 810  },
  { month: "Apr", users: 890  },
  { month: "May", users: 1020 },
  { month: "Jun", users: 1284 },
];

const QUIZ_STATS = [
  { subject: "Algorithms", attempts: 2840, avgScore: 74, color: "#4648d4" },
  { subject: "MERN Stack", attempts: 2210, avgScore: 81, color: "#2563eb" },
  { subject: "ML Basics",  attempts: 1980, avgScore: 68, color: "#059669" },
  { subject: "SQL & DB",   attempts: 1560, avgScore: 77, color: "#d97706" },
  { subject: "Cloud AWS",  attempts: 881,  avgScore: 72, color: "#0891b2" },
];

const TOP_STUDENTS = [
  { name: "Priya Sharma", score: 98, courses: 6, badge: "🥇" },
  { name: "Vikram Singh", score: 95, courses: 5, badge: "🥈" },
  { name: "Anjali Gupta", score: 92, courses: 4, badge: "🥉" },
  { name: "Rohan Das",    score: 89, courses: 4, badge: "⭐" },
  { name: "Kabir Khan",   score: 86, courses: 3, badge: "⭐" },
];

const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

export function AdminAnalytics() {
  const max = Math.max(...MONTHLY_USERS.map((d) => d.users));

  return (
    <div className="max-w-container-max mx-auto space-y-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatCard key={s.id} label={s.label} value={s.value} valueClassName={s.valueClassName} />
        ))}
      </div>

      {/* User Growth + Top Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
          <h2 className="text-headline-md font-bold text-on-surface mb-1">User Growth</h2>
          <p className="text-label-sm text-on-surface-variant mb-4">Jan – Jun 2025</p>
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_USERS.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-label-sm text-on-surface-variant">{d.users}</span>
                <div
                  className="w-full rounded-t-lg primary-gradient transition-all duration-500"
                  style={{ height: `${(d.users / max) * 100}%` }}
                />
                <span className="text-label-sm text-on-surface-variant">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Students */}
        <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
          <h2 className="text-headline-md font-bold text-on-surface mb-1">Top Students</h2>
          <p className="text-label-sm text-on-surface-variant mb-4">By knowledge score this month</p>
          <div className="space-y-1">
            {TOP_STUDENTS.map((s, idx) => (
              <div key={s.name} className="flex items-center gap-3 py-2.5 border-b border-black/5 last:border-0">
                <span className="text-xl w-6 text-center">{s.badge}</span>
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-label-sm font-bold flex-shrink-0">
                  {getInitials(s.name)}
                </div>
                <div className="flex-1">
                  <p className="text-label-md font-medium text-on-surface">{s.name}</p>
                  <p className="text-label-sm text-on-surface-variant">{s.courses} courses</p>
                </div>
                <div className="text-right">
                  <p className="text-label-md font-bold text-primary">{s.score}</p>
                  <p className="text-label-sm text-on-surface-variant">score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Performance */}
      <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
        <h2 className="text-headline-md font-bold text-on-surface mb-1">Quiz Performance by Subject</h2>
        <p className="text-label-sm text-on-surface-variant mb-5">Attempts and average scores</p>
        <div className="space-y-4">
          {QUIZ_STATS.map((q) => (
            <div key={q.subject}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-label-md font-medium text-on-surface">{q.subject}</span>
                <div className="flex items-center gap-4">
                  <span className="text-label-sm text-on-surface-variant">{q.attempts.toLocaleString()} attempts</span>
                  <span className="text-label-sm font-bold" style={{ color: q.color }}>Avg {q.avgScore}%</span>
                </div>
              </div>
              <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${q.avgScore}%`, background: q.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;


// ─────────────────────────────────────────────────────────────
// NOTE: Copy the exports below into their own files
// ─────────────────────────────────────────────────────────────
