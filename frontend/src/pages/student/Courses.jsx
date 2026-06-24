import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/common/Loader";

export default function Courses() {
  const [courses,    setCourses]    = useState([]);
  const [enrolled,   setEnrolled]   = useState(new Set());
  const [loading,    setLoading]    = useState(true);
  const [enrolling,  setEnrolling]  = useState(null);
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState("all");

  useEffect(() => {
    Promise.all([
      API.get("/courses"),
      API.get("/student/enrolled-courses"),
    ]).then(([allRes, enrolledRes]) => {
      setCourses(allRes.data.data || []);
      const ids = (enrolledRes.data.data || []).map(e => String(e.course?._id || e._id));
      setEnrolled(new Set(ids));
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await API.post(`/courses/${courseId}/enroll`);
      setEnrolled(prev => new Set([...prev, courseId]));
    } catch (e) {
      alert(e.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrolling(null);
    }
  };

  const filtered = courses.filter(c => {
    const q = search.toLowerCase();
    const match = c.title?.toLowerCase().includes(q) || c.subject?.toLowerCase().includes(q);
    if (filter === "enrolled")  return match && enrolled.has(String(c._id));
    if (filter === "available") return match && !enrolled.has(String(c._id));
    return match;
  });

  if (loading) return <Loader fullScreen={false} />;

  const filters = [
    { id: "all",       label: "All Courses" },
    { id: "enrolled",  label: "Enrolled" },
    { id: "available", label: "Available" },
  ];

  return (
    <div className="p-5 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold">Courses</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Explore and enroll in available courses</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search courses or subjects…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="flex gap-2">
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === f.id ? "bg-primary text-white" : "bg-white border border-outline-variant text-on-surface-variant hover:border-primary/50"
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-on-surface-variant">{filtered.length} course{filtered.length !== 1 ? "s" : ""} found</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
          <p className="mt-2 text-on-surface-variant text-sm">No courses match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(course => {
            const isEnrolled = enrolled.has(String(course._id));
            return (
              <div key={course._id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                {/* Thumbnail */}
                <div className="h-36 primary-gradient relative flex items-center justify-center overflow-hidden">
                  <div className="blob-animation" style={{ width: 150, height: 150, top: -30, right: -30, opacity: 0.2 }} />
                  {course.thumbnail
                    ? <img src={course.thumbnail} className="absolute inset-0 w-full h-full object-cover" alt="" />
                    : <span className="material-symbols-outlined text-white/50 text-6xl"
                        style={{ fontVariationSettings: '"FILL" 1' }}>school</span>
                  }
                  {isEnrolled && (
                    <span className="absolute top-3 right-3 bg-white text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ENROLLED
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit">
                    {course.subject || "General"}
                  </span>
                  <h3 className="font-semibold text-sm mt-2 leading-snug">{course.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 flex-1">{course.description}</p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">person</span>
                      {course.teacher?.fullName || "Instructor"}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">layers</span>
                      {course.topics?.length || 0} topics
                    </span>
                  </div>

                  <div className="mt-4">
                    {isEnrolled ? (
                      <Link to={`/student/courses/${course._id}`}
                        className="block w-full text-center py-2.5 primary-gradient text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
                        Continue Learning
                      </Link>
                    ) : (
                      <button onClick={() => handleEnroll(course._id)} disabled={enrolling === course._id}
                        className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-60 transition-colors">
                        {enrolling === course._id ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Enrolling…
                          </span>
                        ) : "Enroll Now"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}