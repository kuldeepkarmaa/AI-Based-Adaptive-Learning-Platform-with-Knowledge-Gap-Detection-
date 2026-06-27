import { useEffect, useState } from "react";
import API from "../../services/api";
import StatCard from "../../components/dashboard/StatCard";
import ProgressChart from "../../components/dashboard/ProgressChart";
import CourseBarChart from "../../components/dashboard/CourseBarChart";

export default function Analytics() {
  const [summary, setSummary] = useState({
    avgScore: 0,
    completion: 0,
    dropouts: 0,
    certificates: 0,
  });

  const [courseScores, setCourseScores] = useState([]);
  const [weeklyStudents, setWeeklyStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/teacher/analytics");

      setSummary(
        res.data.summary || {
          avgScore: 0,
          completion: 0,
          dropouts: 0,
          certificates: 0,
        }
      );

      setCourseScores(res.data.courseScores || []);
      setWeeklyStudents(res.data.weeklyStudents || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const SUMMARY = [
    {
      id: "avg",
      label: "Avg Score",
      value: `${summary.avgScore}%`,
      valueClassName: "text-primary",
    },
    {
      id: "completion",
      label: "Completion",
      value: `${summary.completion}%`,
      valueClassName: "text-green-600",
    },
    {
      id: "dropouts",
      label: "Dropouts",
      value: `${summary.dropouts}%`,
      valueClassName: "text-red-500",
    },
    {
      id: "certs",
      label: "Certificates",
      value: summary.certificates,
      valueClassName: "text-secondary",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY.map(({ id, label, value, valueClassName }) => (
          <StatCard
            key={id}
            label={label}
            value={value}
            valueClassName={valueClassName}
          />
        ))}
      </div>

      {/* Course Analytics */}
      {courseScores.length > 0 ? (
        <CourseBarChart
          data={courseScores}
          title="Course Average Scores"
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Course Analytics
          </h2>

          <p className="text-gray-500 mt-3">
            No course analytics available yet.
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Once students start learning and attempting quizzes,
            course performance will appear here.
          </p>
        </div>
      )}

      {/* Weekly Students */}
      {weeklyStudents.length > 0 ? (
        <ProgressChart
          data={weeklyStudents}
          title="Weekly Active Students"
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Student Activity
          </h2>

          <p className="text-gray-500 mt-3">
            No student activity available.
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Student activity graph will automatically appear once
            students enroll and access courses.
          </p>
        </div>
      )}
    </div>
  );
}