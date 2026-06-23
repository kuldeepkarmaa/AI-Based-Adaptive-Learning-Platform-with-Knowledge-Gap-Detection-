import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  UserCircle,
  LogOut,
  X,
} from "lucide-react";
import banner from "../../assests/images/banner.png";

// Update "to" paths here if your route names ever change.
const NAV_ITEMS = [
  { label: "Dashboard", to: "/teacher/dashboard", icon: LayoutDashboard },
  { label: "Courses", to: "/teacher/courses", icon: BookOpen },
  { label: "Students", to: "/teacher/students", icon: Users },
  { label: "Analytics", to: "/teacher/analytics", icon: BarChart3 },
  { label: "Profile", to: "/teacher/profile", icon: UserCircle },
];

/**
 * Shared sidebar for the teacher area.
 * - Desktop: fixed column on the left.
 * - Mobile: slide-in drawer controlled by `isOpen` / `onClose`.
 */
export default function Sidebar({ isOpen = false, onClose = () => {}, onLogout = () => {} }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-container-lowest border-r border-black/5 flex flex-col transition-transform duration-200
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo + close (mobile) */}
        <div className="flex items-center justify-between px-5 py-5">
          <img src={banner} alt="Knowledge Guru logo" className="w-36 object-contain" />
          <button
            onClick={onClose}
            className="lg:hidden text-on-surface-variant"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <p className="px-6 text-label-sm text-on-surface-variant -mt-2 mb-4">
          Teacher Panel
        </p>

        {/* Nav links */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-label-md font-label-md transition-colors ${
                  isActive
                    ? "bg-primary-fixed text-primary"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-black/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-label-md font-label-md text-error hover:bg-error-container/40 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}