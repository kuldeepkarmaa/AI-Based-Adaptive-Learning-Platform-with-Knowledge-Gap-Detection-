import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * Bar chart for "Course Average Scores" style widgets.
 *
 * Props:
 * - data: array of { name: string, value: number }
 * - title: heading text above the chart
 * - color: bar fill color
 */
export default function CourseBarChart({ data, title = "Course Average Scores", color = "#4648d4" }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
      <h2 className="text-headline-md font-bold text-on-surface mb-4">{title}</h2>
      <div className="w-full h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#464554" }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#464554" }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #c7c4d7", fontSize: 13 }}
            />
            <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}