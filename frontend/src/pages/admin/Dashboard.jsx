// src/pages/admin/Dashboard.jsx
// Matches teacher dashboard style exactly —
// same StatCard pattern, same ProgressBar, same surface tokens.

import { useNavigate } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";

// ─────────────────────────────────────────────────────────────
// MOCK DATA — replace with real API calls when backend is ready
// ─────────────────────────────────────────────────────────────
const STATS = [
  { id: "users",    label: "Total Users",   value: "1,284", valueClassName: "text-primary",     path: "/admin/users"    },
  { id: "courses",  label: "Active Courses",value: "86",    valueClassName: "text-green-600",   path: "/admin/courses"  },
  { id: "quizzes",  label: "Quiz Attempts", value: "9,471", valueClassName: "text-red-500",     path: "/admin/analytics"},
  { id: "ai",       label: "AI Cost",       value: "₹4,218",valueClassName: "text-secondary",   path: "/admin/reports"  },
];

const RECENT_USERS = [
  { name: "Priya Sharma",  email: "p.sharma@edu.in",   role: "student", status: "Active"  },
  { name: "Rahul Verma",   email: "rahul.v@cdac.in",   role: "teacher", status: "Active"  },
  { name: "Neha Kumar",    email: "n.kumar@iit.ac.in", role: "student", status: "Pending" },
  { name: "Arjun Mehta",   email: "arjun@bits.in",     role: "student", status: "Inactive"},
  { name: "Sanya Patel",   email: "s.patel@vit.in",    role: "teacher", status: "Active"  },
];

const TOP_COURSES = [
  { title: "Advanced Algorithms & DS",     enrollments: 318, progress: 85, color: "#4648d4" },
  { title: "Full Stack MERN Development",  enrollments: 272, progress: 72, color: "#2563eb" },
  { title: "Machine Learning Fundamentals",enrollments: 241, progress: 65, color: "#059669" },
];

const ALERTS = [
  { type: "warn",   text: "AI cost 18% over budget"        },
  { type: "danger", text: "7 accounts flagged suspicious"   },
  { type: "info",   text: "4 courses pending review"        },
];

const ROLE_COLORS = {
  student: "text-primary",
  teacher: "text-green-600",
  admin:   "text-secondary",
};

const STATUS_COLORS = {
  Active:   "text-green-600 bg-green-50",
  Pending:  "text-yellow-600 bg-yellow-50",
  Inactive: "text-red-500 bg-red-50",
};

const ALERT_COLORS = {
  warn:   "bg-yellow-50 border-yellow-200 text-yellow-800",
  danger: "bg-red-50 border-red-200 text-red-700",
  info:   "bg-blue-50 border-blue-200 text-blue-700",
};

const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto space-y-6">

      {/* Welcome banner — same as teacher */}
      <div className="primary-gradient rounded-xl px-6 sm:px-8 py-7 sm:py-8 text-white">
        <p className="text-label-sm tracking-wider opacity-80 mb-2">ADMIN CONSOLE</p>
        <h1 className="text-headline-lg font-bold mb-2">
          Platform Overview
        </h1>
        <p className="text-body-md opacity-90 mb-4">
          Monitor users, courses, and AI usage across Knowledge Guru.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate("/admin/users")}
            className="bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 text-label-sm font-bold hover:bg-white/30 transition-colors"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate("/admin/analytics")}
            className="bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 text-label-sm font-bold hover:bg-white/30 transition-colors"
          >
            View Analytics
          </button>
        </div>
      </div>

      {/* Stat cards — same as teacher */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ id, label, value, valueClassName, path }) => (
          <StatCard
            key={id}
            label={label}
            value={value}
            valueClassName={valueClassName}
            onClick={() => navigate(path)}
          />
        ))}
      </div>

      {/* Alerts */}
      <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
        <h2 className="text-headline-md font-bold text-on-surface mb-4">System Alerts</h2>
        <div className="space-y-2">
          {ALERTS.map((alert, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-label-md font-medium ${ALERT_COLORS[alert.type]}`}>
              <span>{alert.type === "warn" ? "⚠️" : alert.type === "danger" ? "🔴" : "ℹ️"}</span>
              {alert.text}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Users + Top Courses side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-headline-md font-bold text-on-surface">Recent Users</h2>
            <button
              onClick={() => navigate("/admin/users")}
              className="text-label-sm font-bold text-primary hover:text-primary-container transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {RECENT_USERS.map((user, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-black/5 last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-label-sm font-bold flex-shrink-0">
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-label-md font-medium text-on-surface truncate">{user.name}</p>
                  <p className="text-label-sm text-on-surface-variant truncate">{user.email}</p>
                </div>
                <span className={`text-label-sm font-bold capitalize ${ROLE_COLORS[user.role]}`}>
                  {user.role}
                </span>
                <span className={`text-label-sm font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[user.status]}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-headline-md font-bold text-on-surface">Top Courses</h2>
            <button
              onClick={() => navigate("/admin/courses")}
              className="text-label-sm font-bold text-primary hover:text-primary-container transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="space-y-4">
            {TOP_COURSES.map((course, i) => (
              <div key={i} className="py-2 border-b border-black/5 last:border-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-label-md font-medium text-on-surface truncate flex-1 mr-2">
                    {course.title}
                  </span>
                  <span className="text-label-sm text-on-surface-variant flex-shrink-0">
                    {course.enrollments} enrolled
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%`, background: course.color }}
                    />
                  </div>
                  <span className="text-label-sm font-bold flex-shrink-0" style={{ color: course.color }}>
                    {course.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Usage Summary */}
      <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-headline-md font-bold text-on-surface">AI Usage — June 2025</h2>
          <button
            onClick={() => navigate("/admin/reports")}
            className="text-label-sm font-bold text-primary hover:text-primary-container transition-colors"
          >
            Full report →
          </button>
        </div>
        <div className="space-y-3">
          {[
            { label: "Quiz generation",   cost: 1640, pct: 72, color: "#4648d4" },
            { label: "RAG / Chatbot",     cost: 1180, pct: 52, color: "#6b38d4" },
            { label: "Gap analysis",      cost: 880,  pct: 39, color: "#059669" },
            { label: "Course generation", cost: 518,  pct: 23, color: "#d97706" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 py-1">
              <span className="text-label-md text-on-surface-variant w-40 flex-shrink-0">{item.label}</span>
              <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.pct}%`, background: item.color }}
                />
              </div>
              <span className="text-label-sm font-bold text-on-surface w-16 text-right flex-shrink-0">
                ₹{item.cost.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="pt-3 border-t border-black/5 flex justify-between items-center">
            <span className="text-label-md text-on-surface-variant">Monthly total</span>
            <span className="text-headline-md font-bold text-red-500">₹4,218 <span className="text-label-sm font-normal text-on-surface-variant">/ ₹3,600 budget</span></span>
          </div>
        </div>
      </div>

    </div>
  );
}
