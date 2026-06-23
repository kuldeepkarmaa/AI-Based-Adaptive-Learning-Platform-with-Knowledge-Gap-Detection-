import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * Line chart for "Learning Progress" style widgets.
 *
 * Props:
 * - data: array of { day: string, value: number }
 * - title: heading text above the chart
 * - dataKey: which field in `data` to plot (default "value")
 */
export default function ProgressChart({ data, title = "Learning Progress", dataKey = "value" }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
      <h2 className="text-headline-md font-bold text-on-surface mb-4">{title}</h2>
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#464554" }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#464554" }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #c7c4d7", fontSize: 13 }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#4648d4"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#4648d4", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}