import StatCard from "../../components/dashboard/StatCard";
import ProgressChart from "../../components/dashboard/ProgressChart";
import CourseBarChart from "../../components/dashboard/CourseBarChart";

// TODO: replace with GET /api/teacher/analytics
const SUMMARY = [
  { id: "avg", label: "Avg Score", value: "74%", valueClassName: "text-primary" },
  { id: "completion", label: "Completion", value: "85%", valueClassName: "text-green-600" },
  { id: "dropouts", label: "Dropouts", value: "3%", valueClassName: "text-error" },
  { id: "certs", label: "Certs Issued", value: "89", valueClassName: "text-secondary" },
];

const COURSE_SCORES = [
  { name: "Web Dev", value: 72 },
  { name: "React", value: 85 },
  { name: "DSA", value: 61 },
  { name: "UI/UX", value: 90 },
  { name: "Node.js", value: 68 },
];

const WEEKLY_ACTIVE_STUDENTS = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 80 },
  { day: "Sat", value: 100 },
  { day: "Sun", value: 120 },
];

export default function Analytics() {
  return (
    <div className="max-w-container-max mx-auto space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY.map(({ id, label, value, valueClassName }) => (
          <StatCard key={id} label={label} value={value} valueClassName={valueClassName} />
        ))}
      </div>

      <CourseBarChart data={COURSE_SCORES} title="Course Average Scores" />
      <ProgressChart data={WEEKLY_ACTIVE_STUDENTS} title="Weekly Active Students" />
    </div>
  );
}
