import { useNavigate } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";
import ProgressChart from "../../components/dashboard/ProgressChart";
import ProgressBar from "../../components/dashboard/ProgressBar";
import Badge from "../../components/dashboard/Badge";

// ---- TODO: replace with real data once backend endpoints are ready ----
// e.g. const { data } = useFetch("/api/teacher/dashboard-summary")
const STATS = [
  { id: "courses", label: "Courses", value: "12", valueClassName: "text-primary", path: "/teacher/courses" },
  { id: "students", label: "Students", value: "150", valueClassName: "text-green-600", path: "/teacher/students" },
  { id: "quizzes", label: "Quizzes", value: "35", valueClassName: "text-red-500", path: "/teacher/quiz/create" },
  { id: "completion", label: "Completion", value: "85%", valueClassName: "text-secondary", path: "/teacher/analytics" },
];

const PROGRESS_DATA = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 80 },
  { day: "Sat", value: 100 },
  { day: "Sun", value: 122 },
];

// Shows only the first 3 on the dashboard — full list lives on /teacher/courses
const RECENT_COURSES = [
  { id: "c1", title: "Web Dev Bootcamp", progress: 78, color: "#4648d4", status: "Active" },
  { id: "c2", title: "React Advanced Patterns", progress: 55, color: "#2563eb", status: "Active" },
  { id: "c3", title: "Data Structures & Algo", progress: 30, color: "#d97706", status: "Draft" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  // TODO: replace with teacher's real name from AuthContext
  const teacherName = "Teacher";

  return (
    <div className="max-w-container-max mx-auto space-y-6">
      {/* Welcome banner */}
      <div className="primary-gradient rounded-xl px-6 sm:px-8 py-7 sm:py-8 text-white">
        <p className="text-label-sm tracking-wider opacity-80 mb-2">WELCOME BACK</p>
        <h1 className="text-headline-lg-mobile sm:text-headline-lg font-bold mb-2">
          Hello, {teacherName}!
        </h1>
        <p className="text-body-md opacity-90 mb-4 whitespace-nowrap">
          Manage courses and track student performance.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate("/teacher/courses/create")}
            className="bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 text-label-sm font-bold hover:bg-white/30 transition-colors"
          >
            Create Course
          </button>
          <button
            onClick={() => navigate("/teacher/analytics")}
            className="bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 text-label-sm font-bold hover:bg-white/30 transition-colors"
          >
            View Analytics
          </button>
        </div>
      </div>

      {/* Stat cards */}
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

      {/* Learning progress chart */}
      <ProgressChart data={PROGRESS_DATA} title="Learning Progress" />

      {/* Recent courses */}
      <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-headline-md font-bold text-on-surface">Recent Courses</h2>
          <button
            onClick={() => navigate("/teacher/courses")}
            className="text-label-sm font-bold text-primary hover:text-primary-container transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="space-y-3">
          {RECENT_COURSES.map((course) => (
            <div
              key={course.id}
              className="flex items-center gap-3 py-2 border-b border-black/5 last:border-0"
            >
              <span className="text-label-md font-medium text-on-surface w-32 sm:w-40 flex-shrink-0 truncate">
                {course.title}
              </span>
              <ProgressBar value={course.progress} color={course.color} compact />
              <span
                className="text-label-sm font-bold w-10 text-right flex-shrink-0"
                style={{ color: course.color }}
              >
                {course.progress}%
              </span>
              <Badge status={course.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}