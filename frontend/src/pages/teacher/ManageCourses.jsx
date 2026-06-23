import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import Badge from "../../components/dashboard/Badge";
import ProgressBar from "../../components/dashboard/ProgressBar";

// TODO: replace with GET /api/teacher/courses
const COURSES = [
  { id: "c1", title: "Web Dev Bootcamp", students: 42, status: "Active", progress: 78, color: "#7c3aed" },
  { id: "c2", title: "React Advanced Patterns", students: 31, status: "Active", progress: 55, color: "#2563eb" },
  { id: "c3", title: "Data Structures & Algo", students: 28, status: "Draft", progress: 30, color: "#d97706" },
  { id: "c4", title: "UI/UX Design", students: 49, status: "Active", progress: 90, color: "#16a34a" },
];

export default function ManageCourses() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = COURSES.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-container-max mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={() => navigate("/teacher/courses/create")}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-label-md font-label-md flex items-center gap-2 justify-center hover:bg-primary-container transition-colors"
        >
          <Plus size={18} />
          New Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/teacher/courses/${course.id}`)}
            className="bg-surface-container-lowest rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-body-md font-bold text-on-surface">{course.title}</h3>
                <p className="text-label-sm text-on-surface-variant">{course.students} students</p>
              </div>
              <Badge status={course.status} />
            </div>
            <ProgressBar value={course.progress} color={course.color} />
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-body-md text-on-surface-variant py-10">
            No courses match "{query}".
          </p>
        )}
      </div>
    </div>
  );
}
