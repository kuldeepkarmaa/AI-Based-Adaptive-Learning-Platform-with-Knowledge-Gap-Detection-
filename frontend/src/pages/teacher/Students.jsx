import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Badge from "../../components/dashboard/Badge";
import ProgressBar from "../../components/dashboard/ProgressBar";

// TODO: replace with GET /api/teacher/students
const STUDENTS = [
  { id: "s1", name: "Aarav Sharma", course: "Web Dev", progress: 82, init: "AS", color: "#7c3aed", status: "Active" },
  { id: "s2", name: "Priya Patel", course: "React Advanced", progress: 67, init: "PP", color: "#2563eb", status: "Active" },
  { id: "s3", name: "Rohan Verma", course: "DSA", progress: 41, init: "RV", color: "#d97706", status: "At Risk" },
  { id: "s4", name: "Sneha Iyer", course: "UI/UX Design", progress: 95, init: "SI", color: "#16a34a", status: "Active" },
  { id: "s5", name: "Kiran Mehta", course: "Web Dev", progress: 58, init: "KM", color: "#0891b2", status: "Active" },
  { id: "s6", name: "Diya Nair", course: "React Advanced", progress: 73, init: "DN", color: "#a855f7", status: "Active" },
];

export default function Students() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-container-max mx-auto space-y-5">
      <div className="relative w-full sm:max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search students…"
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((student) => (
          <div
            key={student.id}
            onClick={() => navigate(`/teacher/students/${student.id}`)}
            className="bg-surface-container-lowest rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow space-y-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-label-sm font-bold text-white flex-shrink-0"
                style={{ backgroundColor: student.color }}
              >
                {student.init}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body-md font-bold text-on-surface truncate">{student.name}</p>
                <p className="text-label-sm text-on-surface-variant truncate">{student.course}</p>
              </div>
              <Badge status={student.status} />
            </div>
            <ProgressBar
              value={student.progress}
              color={student.progress < 50 ? "#ef4444" : "#4648d4"}
            />
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-body-md text-on-surface-variant py-10">
            No students match "{query}".
          </p>
        )}
      </div>
    </div>
  );
}
