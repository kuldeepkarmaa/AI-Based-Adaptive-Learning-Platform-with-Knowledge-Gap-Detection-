import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import Badge from "../../components/dashboard/Badge";
import ProgressBar from "../../components/dashboard/ProgressBar";

// TODO: replace with GET /api/teacher/courses


export default function ManageCourses() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const [courses, setCourses] = useState([]);

useEffect(() => {

  const fetchCourses = async () => {

    try {

      const res = await API.get("/teacher/courses");

      setCourses(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  fetchCourses();

}, []);

  const filtered = courses.filter((c) =>
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
            className="w-full pl-39 pr-3 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={() => navigate("/teacher/courses/${course._id}")}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-label-md font-label-md flex items-center gap-2 justify-center hover:bg-primary-container transition-colors"
        >
          <Plus size={18} />
          New Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course) => (
          <div
            key={course._id}
            onClick={() => navigate(`/teacher/courses/${course._id}`)}
            className="bg-surface-container-lowest rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-body-md font-bold text-on-surface">{course.title}</h3>
                <p className="text-label-sm text-on-surface-variant">{course.students} students</p>
              </div>
              <Badge status="Active" />
            </div>
            <ProgressBar value={100} color="#7c3aed" />
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
