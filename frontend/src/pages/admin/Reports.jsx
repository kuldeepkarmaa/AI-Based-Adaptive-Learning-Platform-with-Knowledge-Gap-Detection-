// src/pages/admin/Reports.jsx

import { useState } from "react";
import { Download, FileText, Users, BookOpen, Bot, ClipboardList } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";

const STATS = [
  { id: "total",  label: "Total Reports",     value: "48",   valueClassName: "text-primary"   },
  { id: "month",  label: "This Month",         value: "12",   valueClassName: "text-green-600" },
  { id: "ready",  label: "Ready to Download",  value: "4",    valueClassName: "text-secondary" },
  { id: "size",   label: "Total Size",         value: "8.2MB",valueClassName: "text-red-500"   },
];

const REPORTS = [
  { id: 1, title: "Monthly User Activity Report",  description: "Logins, active users, new registrations for June 2025.", type: "Users",    generated: "Jun 25, 2025", size: "2.4 MB", status: "ready",      Icon: Users        },
  { id: 2, title: "Course Enrollment Summary",     description: "Enrollment trends, completion rates, dropout analysis.",  type: "Courses",  generated: "Jun 24, 2025", size: "1.8 MB", status: "ready",      Icon: BookOpen     },
  { id: 3, title: "AI API Cost Breakdown",         description: "Gemini API usage by module — quiz, RAG, gap, course.",   type: "AI Usage", generated: "Jun 23, 2025", size: "0.9 MB", status: "ready",      Icon: Bot          },
  { id: 4, title: "Quiz Performance Analysis",     description: "Subject-wise scores, pass rates, knowledge gap results.", type: "Quizzes",  generated: "Jun 22, 2025", size: "3.1 MB", status: "ready",      Icon: ClipboardList},
  { id: 5, title: "Weekly Platform Health Report", description: "Uptime, error rates, response times for this week.",     type: "System",   generated: "Generating…",  size: "—",      status: "generating", Icon: FileText     },
];

const STATUS_STYLES = {
  ready:      "bg-green-50 text-green-700",
  generating: "bg-yellow-50 text-yellow-700",
};

export default function AdminReports() {
  const [generating, setGenerating] = useState(null);

  const handleGenerate = () => {
    setGenerating("new");
    setTimeout(() => setGenerating(null), 2000);
  };

  return (
    <div className="max-w-container-max mx-auto space-y-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatCard key={s.id} label={s.label} value={s.value} valueClassName={s.valueClassName} />
        ))}
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="text-headline-md font-bold text-on-surface">Available Reports</h2>
        <button
          onClick={handleGenerate}
          className="primary-gradient text-white rounded-xl px-4 py-2 text-label-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <FileText size={16} />
          {generating === "new" ? "Generating…" : "Generate Report"}
        </button>
      </div>

      {/* Reports list */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
        <div className="divide-y divide-black/5">
          {REPORTS.map((report) => (
            <div key={report.id} className="flex items-start gap-4 p-5 hover:bg-surface-container transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center flex-shrink-0">
                <report.Icon size={19} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-label-md font-bold text-on-surface">{report.title}</p>
                  <span className={`text-label-sm font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_STYLES[report.status]}`}>
                    {report.status === "ready" ? "Ready" : "Generating"}
                  </span>
                </div>
                <p className="text-label-sm text-on-surface-variant mb-2">{report.description}</p>
                <div className="flex items-center gap-4 text-label-sm text-on-surface-variant">
                  <span>Type: <span className="text-on-surface font-medium">{report.type}</span></span>
                  <span>Generated: <span className="text-on-surface font-medium">{report.generated}</span></span>
                  {report.size !== "—" && <span>Size: <span className="text-on-surface font-medium">{report.size}</span></span>}
                </div>
              </div>
              <button
                disabled={report.status !== "ready"}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-label-sm font-bold transition-all flex-shrink-0
                  ${report.status === "ready"
                    ? "bg-primary-fixed text-primary hover:bg-primary-container hover:text-on-primary-container"
                    : "bg-surface-container text-on-surface-variant cursor-not-allowed"}`}
              >
                <Download size={15} />
                {report.status === "ready" ? "Download" : "Pending"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
