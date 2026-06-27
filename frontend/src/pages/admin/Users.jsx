// src/pages/admin/Users.jsx

import { useState } from "react";
import { Search, UserPlus, MoreVertical } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";

const MOCK_USERS = [
  { id: 1,  name: "Priya Sharma",  email: "p.sharma@edu.in",   role: "student", status: "Active",   joined: "Jun 22, 2025", courses: 4 },
  { id: 2,  name: "Rahul Verma",   email: "rahul.v@cdac.in",   role: "teacher", status: "Active",   joined: "Jun 21, 2025", courses: 6 },
  { id: 3,  name: "Neha Kumar",    email: "n.kumar@iit.ac.in", role: "student", status: "Pending",  joined: "Jun 20, 2025", courses: 2 },
  { id: 4,  name: "Arjun Mehta",   email: "arjun@bits.in",     role: "student", status: "Inactive", joined: "Jun 19, 2025", courses: 1 },
  { id: 5,  name: "Sanya Patel",   email: "s.patel@vit.in",    role: "teacher", status: "Active",   joined: "Jun 18, 2025", courses: 3 },
  { id: 6,  name: "Vikram Singh",  email: "v.singh@nit.ac.in", role: "student", status: "Active",   joined: "Jun 17, 2025", courses: 5 },
  { id: 7,  name: "Anjali Gupta",  email: "anjali.g@du.ac.in", role: "student", status: "Active",   joined: "Jun 16, 2025", courses: 3 },
  { id: 8,  name: "Rohan Das",     email: "rohan.d@iit.ac.in", role: "student", status: "Pending",  joined: "Jun 15, 2025", courses: 0 },
];

const STATS = [
  { id: "total",    label: "Total Users",  value: "1,284", valueClassName: "text-primary"   },
  { id: "active",   label: "Active",       value: "1,102", valueClassName: "text-green-600" },
  { id: "pending",  label: "Pending",      value: "48",    valueClassName: "text-yellow-500"},
  { id: "inactive", label: "Inactive",     value: "134",   valueClassName: "text-red-500"   },
];

const ROLE_COLORS = {
  student: "text-primary",
  teacher: "text-green-600",
  admin:   "text-secondary",
};

const STATUS_STYLES = {
  Active:   "bg-green-50 text-green-700",
  Pending:  "bg-yellow-50 text-yellow-700",
  Inactive: "bg-red-50 text-red-500",
};

const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

export default function AdminUsers() {
  const [search, setSearch]   = useState("");
  const [role, setRole]       = useState("all");
  const [status, setStatus]   = useState("all");
  const [openMenu, setMenu]   = useState(null);

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = role === "all"   || u.role === role;
    const matchStatus = status === "all" || u.status === status;
    return matchSearch && matchRole && matchStatus;
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
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-label-md text-on-surface w-full placeholder:text-on-surface-variant"
            />
          </div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-label-md border border-black/10 rounded-xl px-3 py-2 text-on-surface-variant bg-background outline-none cursor-pointer"
          >
            <option value="all">All roles</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-label-md border border-black/10 rounded-xl px-3 py-2 text-on-surface-variant bg-background outline-none cursor-pointer"
          >
            <option value="all">All status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
          <span className="text-label-sm text-on-surface-variant ml-auto">
            {filtered.length} users found
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 bg-surface-container">
                <th className="text-left text-label-sm text-on-surface-variant font-semibold px-5 py-3">User</th>
                <th className="text-left text-label-sm text-on-surface-variant font-semibold px-5 py-3">Role</th>
                <th className="text-left text-label-sm text-on-surface-variant font-semibold px-5 py-3">Status</th>
                <th className="text-left text-label-sm text-on-surface-variant font-semibold px-5 py-3">Courses</th>
                <th className="text-left text-label-sm text-on-surface-variant font-semibold px-5 py-3">Joined</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-on-surface-variant text-label-md">
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => (
                  <tr key={user.id} className="border-b border-black/5 last:border-0 hover:bg-surface-container transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-label-sm font-bold flex-shrink-0">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="text-label-md font-medium text-on-surface">{user.name}</p>
                          <p className="text-label-sm text-on-surface-variant">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-label-sm font-semibold capitalize ${ROLE_COLORS[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-label-sm font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-label-md text-on-surface">{user.courses}</td>
                    <td className="px-5 py-3.5 text-label-sm text-on-surface-variant">{user.joined}</td>
                    <td className="px-5 py-3.5">
                      <div className="relative">
                        <button
                          onClick={() => setMenu(openMenu === user.id ? null : user.id)}
                          className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenu === user.id && (
                          <div className="absolute right-0 top-9 bg-surface-container-lowest border border-black/10 rounded-xl shadow-lg z-10 min-w-[140px] overflow-hidden">
                            <button className="w-full text-left px-4 py-2.5 text-label-md text-on-surface hover:bg-surface-container transition-colors">View profile</button>
                            <button className="w-full text-left px-4 py-2.5 text-label-md text-on-surface hover:bg-surface-container transition-colors">Edit user</button>
                            <button className="w-full text-left px-4 py-2.5 text-label-md text-error hover:bg-error-container/40 transition-colors">Deactivate</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-black/5">
          <p className="text-label-sm text-on-surface-variant">Showing {filtered.length} of 1,284 users</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-8 h-8 rounded-lg text-label-sm font-medium transition-colors
                ${p === 1 ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
