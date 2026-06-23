import { Menu, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Top bar shown above every teacher page.
 * `title` is page-specific (e.g. "Teacher Dashboard", "Manage Courses").
 * `onMenuClick` opens the mobile sidebar drawer (passed from TeacherLayout).
 */
export default function DashboardNavbar({ title, onMenuClick }) {
  const navigate = useNavigate();

  // TODO: replace with logged-in teacher's avatar/name from AuthContext
  const teacher = { name: "Teacher", avatarUrl: "" };

  return (
    <header className="h-16 bg-surface-container-lowest border-b border-black/5 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-on-surface-variant p-1 -ml-1"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-headline-md font-bold text-on-surface truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <button
          onClick={() => navigate("/teacher/notifications")}
          className="relative p-2 rounded-full hover:bg-surface-container text-on-surface-variant"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </button>
        <button
          onClick={() => navigate("/teacher/profile")}
          className="w-9 h-9 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-label-md overflow-hidden"
          aria-label="Profile"
        >
          {teacher.avatarUrl ? (
            <img src={teacher.avatarUrl} alt={teacher.name} className="w-full h-full object-cover" />
          ) : (
            teacher.name.charAt(0)
          )}
        </button>
      </div>
    </header>
  );
}
