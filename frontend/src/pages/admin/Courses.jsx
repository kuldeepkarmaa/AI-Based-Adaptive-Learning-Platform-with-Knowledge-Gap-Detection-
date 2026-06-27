// src/pages/admin/Courses.jsx

import { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";

const MOCK_COURSES = [
  { id: 1, title: "Advanced Algorithms & DS",     teacher: "Dr. Rahul Verma",   category: "CS",      enrollments: 318, progress: 85, status: "Active", color: "#4648d4", created: "May 10, 2025" },
  { id: 2, title: "Full Stack MERN Development",  teacher: "Dr. Sanya Patel",   category: "Web Dev", enrollments: 272, progress: 72, status: "Active", color: "#2563eb", created: "May 14, 2025" },
  { id: 3, title: "Machine Learning Fundamentals",teacher: "Dr. Neha Kumar",    category: "AI & ML", enrollments: 241, progress: 65, status: "Active", color: "#059669", created: "Apr 28, 2025" },
  { id: 4, title: "Database Systems & SQL",       teacher: "Prof. Arjun Mehta", category: "DB",      enrollments: 0,   progress: 0,  status: "Draft",  color: "#d97706", created: "Jun 18, 2025" },
  { id: 5, title: "Cloud Computing with AWS",     teacher: "Dr. Vikram Singh",  category: "Cloud",   enrollments: 189, progress: 58, status: "Active", color: "#0891b2", created: "Mar 05, 2025" },
  { id: 6, title: "Cybersecurity Fundamentals",   teacher: "Prof. Meera Nair",  category: "Security",enrollments: 0,   progress: 0,  status: "Draft",  color: "#e11d48", created: "Jun 20, 2025" },
];

const STATS = [
  { id: "total",  label: "Total Courses", value: "86",  valueClassName: "text-primary"   },
  { id: "live",   label: "Live",          value: "71",  valueClassName: "text-green-600" },
  { id: "draft",  label: "Draft",         value: "15",  valueClassName: "text-yellow-500"},
  { id: "enroll", label: "Enrollments",   value: "9.4k",valueClassName: "text-secondary" },
];

const STATUS_STYLES = {
  Active: "bg-green-50 text-green-700",
  Draft:  "bg-yellow-50 text-yellow-700",
};

export default function AdminCourses() {
  const [search, setSearch]   = useState("");
  const [status, setStatus]   = useState("all");
  const [openMenu, setMenu]   = useState(null);

  const filtered = MOCK_COURSES.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.teacher.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" || c.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-container-max mx-auto space-y-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatCard key={s.id} label={s.label} value={s.value} valueClassName={s.valueClassName} />
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden">

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-5 border-b border-black/5">
          <div className="flex items-center gap-2 bg-background border border-black/10 rounded-xl px-3 py-2 flex-1 min-w-[180px] max-w-xs">
            <Search size={15} className="text-on-surface-variant flex-shrink-0" />
            <input
              type="text"
              placeholder="Search title or teacher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-label-md text-on-surface w-full placeholder:text-on-surface-variant"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-label-md border border-black/10 rounded-xl px-3 py-2 text-on-surface-variant bg-background outline-none cursor-pointer"
          >
            <option value="all">All status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>
          <span className="text-label-sm text-on-surface-variant ml-auto">
            {filtered.length} courses found
          </span>
        </div>

        {/* Course list — card style like teacher's course cards */}
        <div className="p-5 space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center py-10 text-on-surface-variant text-label-md">No courses found</p>
          ) : (
            filtered.map((course) => (
              <div key={course.id} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-black/5 hover:shadow-sm transition-shadow">
                {/* Course info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-label-md font-bold text-on-surface truncate">{course.title}</p>
                    <span className={`text-label-sm font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_STYLES[course.status]}`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-label-sm text-on-surface-variant mb-2">{course.teacher} · {course.category}</p>
                  {/* Progress bar */}
                  {course.enrollments > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%`, background: course.color }}
                        />
                      </div>
                      <span className="text-label-sm font-bold flex-shrink-0" style={{ color: course.color }}>
                        {course.progress}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Enrollment count */}
                <div className="text-right flex-shrink-0">
                  <p className="text-headline-md font-bold text-on-surface">
                    {course.enrollments > 0 ? course.enrollments : "—"}
                  </p>
                  <p className="text-label-sm text-on-surface-variant">
                    {course.enrollments > 0 ? "students" : "pending"}
                  </p>
                </div>

                {/* Menu */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setMenu(openMenu === course.id ? null : course.id)}
                    className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {openMenu === course.id && (
                    <div className="absolute right-0 top-9 bg-surface-container-lowest border border-black/10 rounded-xl shadow-lg z-10 min-w-[140px] overflow-hidden">
                      <button className="w-full text-left px-4 py-2.5 text-label-md text-on-surface hover:bg-surface-container transition-colors">View course</button>
                      <button className="w-full text-left px-4 py-2.5 text-label-md text-on-surface hover:bg-surface-container transition-colors">Edit</button>
                      <button className="w-full text-left px-4 py-2.5 text-label-md text-error hover:bg-error-container/40 transition-colors">Unpublish</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
