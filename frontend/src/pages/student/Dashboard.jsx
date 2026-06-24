// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// // import { useAuth } from "../../hooks/useAuth";
// import API from "../../services/api";
// import ProgressChart from "../../components/dashboard/ProgressChart";
// import SkillRadarChart from "../../components/dashboard/SkillRadarChart";
// import AnalyticsCard from "../../components/dashboard/AnalyticsCard";
// import Loader from "../../components/common/Loader";

// export default function Dashboard() {
//   const { user } = { name: "Sarthak" };
//   const [data,    setData]    = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState(null);

//   useEffect(() => {
//     API.get("/student/dashboard")
//       .then(r  => setData(r.data.data))
//       .catch(e => setError(e.response?.data?.message || "Failed to load dashboard"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <Loader fullScreen={false} />;
//   if (error)   return (
//     <div className="flex flex-col items-center justify-center min-h-96 gap-3">
//       <span className="material-symbols-outlined text-5xl text-red-400">error_outline</span>
//       <p className="text-red-500 text-sm">{error}</p>
//       <button onClick={() => window.location.reload()}
//         className="px-4 py-2 bg-primary text-white text-sm rounded-xl">Retry</button>
//     </div>
//   );

//   const { stats, enrolledCourses, recentQuizzes, recommendations, notifications } = data || {};

//   return (
//     <div className="p-5 md:p-6 space-y-5">

//       {/* Welcome banner */}
//       <div className="relative overflow-hidden primary-gradient rounded-2xl p-6 text-white">
//         <div className="blob-animation" style={{ width: 250, height: 250, top: -60, right: -60, opacity: 0.15 }} />
//         <div className="flex items-start justify-between relative z-10">
//           <div>
//             <p className="text-white/70 text-sm">Welcome back 👋</p>
//             <h1 className="text-2xl font-bold mt-0.5">{user?.fullName?.split(" ")[0]}</h1>
//             <p className="text-white/70 text-sm mt-1">Continue your AI-powered learning journey</p>
//           </div>
//           <div className="hidden sm:flex flex-col items-center bg-white/15 rounded-xl px-5 py-3 backdrop-blur-sm">
//             <span className="text-3xl font-black">{stats?.avgScore ?? 0}%</span>
//             <span className="text-white/70 text-xs mt-0.5">Avg Score</span>
//           </div>
//         </div>
//         {/* Progress bar */}
//         <div className="mt-5 relative z-10">
//           <div className="flex justify-between text-xs text-white/70 mb-1.5">
//             <span>Overall Progress</span>
//             <span>{stats?.overallProgress ?? stats?.avgScore ?? 0}%</span>
//           </div>
//           <div className="h-2 bg-white/20 rounded-full overflow-hidden">
//             <div className="h-full bg-white rounded-full transition-all duration-700"
//               style={{ width: `${stats?.overallProgress ?? stats?.avgScore ?? 0}%` }} />
//           </div>
//         </div>
//       </div>

//       {/* Stat cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//         <AnalyticsCard icon="menu_book"    label="Enrolled Courses"  value={stats?.enrolledCourses ?? 0}  color="bg-blue-50"   iconColor="text-blue-600" />
//         <AnalyticsCard icon="quiz"         label="Quizzes Taken"     value={stats?.quizzesTaken    ?? 0}  color="bg-violet-50" iconColor="text-violet-600" />
//         <AnalyticsCard icon="emoji_events" label="Average Score"     value={`${stats?.avgScore ?? 0}%`}   color="bg-amber-50"  iconColor="text-amber-500" />
//         <AnalyticsCard icon="psychology"   label="Knowledge Gaps"    value={stats?.knowledgeGaps   ?? 0}  color="bg-red-50"    iconColor="text-red-500" />
//       </div>

//       {/* Alerts */}
//       {notifications?.length > 0 && (
//         <div className="glass-card rounded-2xl p-4 space-y-2">
//           <p className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
//             <span className="material-symbols-outlined text-base text-amber-500">notifications_active</span>
//             AI Alerts
//           </p>
//           {notifications.slice(0, 3).map(n => (
//             <div key={n._id} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
//               <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">warning</span>
//               <div>
//                 <p className="text-sm font-medium text-on-surface">{n.title}</p>
//                 <p className="text-xs text-on-surface-variant">{n.message}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         <div className="glass-card rounded-2xl p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-semibold text-sm">Quiz Score Trend</h2>
//             <span className="material-symbols-outlined text-primary">show_chart</span>
//           </div>
//           <ProgressChart data={stats?.quizHistory ?? []} />
//         </div>
//         <div className="glass-card rounded-2xl p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-semibold text-sm">Topic Skill Map</h2>
//             <span className="material-symbols-outlined text-primary">radar</span>
//           </div>
//           <SkillRadarChart data={stats?.topicScores ?? []} />
//         </div>
//       </div>

//       {/* Enrolled courses */}
//       <div className="glass-card rounded-2xl p-5">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="font-semibold text-sm">My Courses</h2>
//           <Link to="/student/courses" className="text-xs text-primary font-semibold">View all →</Link>
//         </div>
//         {!enrolledCourses?.length ? (
//           <div className="text-center py-8">
//             <span className="material-symbols-outlined text-4xl text-outline">library_books</span>
//             <p className="text-sm text-on-surface-variant mt-2">Not enrolled in any courses yet</p>
//             <Link to="/student/courses" className="inline-block mt-3 px-4 py-2 bg-primary text-white text-sm rounded-xl font-medium">
//               Browse Courses
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {enrolledCourses.slice(0, 3).map(c => (
//               <Link key={c._id} to={`/student/courses/${c._id}`}
//                 className="group p-4 bg-surface-container rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
//                     <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>school</span>
//                   </div>
//                   <div className="min-w-0">
//                     <p className="font-semibold text-sm truncate">{c.title}</p>
//                     <p className="text-xs text-on-surface-variant">{c.subject}</p>
//                   </div>
//                 </div>
//                 <div className="flex justify-between text-xs text-on-surface-variant mb-1.5">
//                   <span>Progress</span><span className="font-medium text-primary">{c.progress ?? 0}%</span>
//                 </div>
//                 <div className="h-1.5 bg-surface-dim rounded-full overflow-hidden">
//                   <div className="h-full primary-gradient rounded-full" style={{ width: `${c.progress ?? 0}%` }} />
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Recent quizzes */}
//       <div className="glass-card rounded-2xl p-5">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="font-semibold text-sm">Recent Quiz Results</h2>
//           <Link to="/student/results" className="text-xs text-primary font-semibold">View all →</Link>
//         </div>
//         {!recentQuizzes?.length ? (
//           <p className="text-center text-sm text-on-surface-variant py-8">No quizzes taken yet</p>
//         ) : (
//           <div className="space-y-2.5">
//             {recentQuizzes.slice(0, 4).map(a => {
//               const color = a.score >= 75 ? "text-green-600 bg-green-50" : a.score >= 50 ? "text-amber-600 bg-amber-50" : "text-red-500 bg-red-50";
//               const icon  = a.score >= 75 ? "check_circle" : a.score >= 50 ? "pending" : "cancel";
//               return (
//                 <div key={a._id} className="flex items-center justify-between p-3.5 bg-surface-container rounded-xl">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color.split(" ")[1]}`}>
//                       <span className={`material-symbols-outlined text-lg ${color.split(" ")[0]}`}
//                         style={{ fontVariationSettings: '"FILL" 1' }}>{icon}</span>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium">{a.quizTitle}</p>
//                       <p className="text-xs text-on-surface-variant">{new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className={`text-base font-bold ${color.split(" ")[0]}`}>{a.score}%</span>
//                     <Link to={`/student/results/${a._id}`}
//                       className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-lg">Details</Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* AI Recommendations preview */}
//       {recommendations?.length > 0 && (
//         <div className="glass-card rounded-2xl p-5">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
//               <h2 className="font-semibold text-sm">AI Recommendations</h2>
//             </div>
//             <Link to="/student/recommendations" className="text-xs text-primary font-semibold">See all →</Link>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             {recommendations.slice(0, 2).map((r, i) => (
//               <div key={i} className="p-4 bg-primary/5 rounded-xl border border-primary/10">
//                 <div className="flex items-start gap-3">
//                   <span className="material-symbols-outlined text-primary text-lg mt-0.5"
//                     style={{ fontVariationSettings: '"FILL" 1' }}>lightbulb</span>
//                   <div>
//                     <p className="text-sm font-semibold">{r.topic}</p>
//                     <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{r.suggestion}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import StudentSidebar from "../../components/common/StudentSidebar";

// ORIGINAL
// import { useAuth } from "../../hooks/useAuth";

// ORIGINAL
// import API from "../../services/api";

import { useEffect, useRef } from "react";

const ROUTE_LABELS = {
  "/student/dashboard": "Dashboard",
  "/student/courses": "My Courses",
  "/student/quiz": "Quizzes",
  "/student/recommendations": "AI Recommendations",
  "/student/reports": "Performance Reports",
  "/student/chatbot": "AI Chatbot",
  "/student/profile": "My Profile",
};

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [unread, setUnread] = useState(0);

  // ORIGINAL
  // const { user } = useAuth();

  // DUMMY USER
  const user = {
    _id: "1",
    fullName: "Sarthak Gaurkhede",
    email: "sarthak@gmail.com",
    role: "Student",
    avatar: null,
  };

  const location = useLocation();
  const notifRef = useRef(null);

  const pageTitle =
    Object.entries(ROUTE_LABELS).find(([k]) =>
      location.pathname.startsWith(k)
    )?.[1] || "Student";

  // ORIGINAL API CALL
  /*
  useEffect(() => {
    API.get("/student/notifications")
      .then(r => {
        setNotifs(r.data.data || []);
        setUnread((r.data.data || []).filter(n => !n.isRead).length);
      })
      .catch(() => {});
  }, [location.pathname]);
  */

  // DUMMY NOTIFICATIONS
  useEffect(() => {
    const dummyNotifications = [
      {
        _id: "1",
        title: "Welcome to Knowledge Guru",
        message: "Start your first course today.",
        isRead: false,
      },
      {
        _id: "2",
        title: "New Quiz Available",
        message: "React Fundamentals Quiz is now available.",
        isRead: false,
      },
      {
        _id: "3",
        title: "Course Completed",
        message: "Congratulations on completing Java Basics.",
        isRead: true,
      },
    ];

    setNotifs(dummyNotifications);
    setUnread(
      dummyNotifications.filter((n) => !n.isRead).length
    );
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target)
      ) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // ORIGINAL
  /*
  const markAllRead = async () => {
    await API.put("/student/notifications/read-all").catch(() => {});
    setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnread(0);
  };
  */

  // DUMMY
  const markAllRead = () => {
    setNotifs((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      }))
    );
    setUnread(0);
  };

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <StudentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between px-4 md:px-6 py-3.5 bg-white border-b border-black/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container text-on-surface-variant"
            >
              <span className="material-symbols-outlined">
                menu
              </span>
            </button>

            <h1 className="text-base font-semibold text-on-surface">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((o) => !o)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container text-on-surface-variant relative"
              >
                <span className="material-symbols-outlined text-xl">
                  notifications
                </span>

                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-black/5 z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                    <span className="font-semibold text-sm">
                      Notifications
                    </span>

                    {unread > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-primary font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-black/5">
                    {notifs.map((n) => (
                      <div
                        key={n._id}
                        className={`px-4 py-3 text-sm ${
                          !n.isRead ? "bg-primary/5" : ""
                        }`}
                      >
                        <p className="font-medium">
                          {n.title}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/student/profile"
              className="w-9 h-9 rounded-xl primary-gradient flex items-center justify-center text-white font-bold text-sm overflow-hidden"
            >
              {user.fullName.charAt(0)}
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}