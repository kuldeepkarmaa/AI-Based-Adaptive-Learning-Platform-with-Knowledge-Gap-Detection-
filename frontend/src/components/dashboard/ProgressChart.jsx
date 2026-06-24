import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-black/10 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="text-on-surface-variant mb-1">{label}</p>
        <p className="font-bold text-primary">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ProgressChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="h-44 flex flex-col items-center justify-center text-on-surface-variant">
        <span className="material-symbols-outlined text-3xl">show_chart</span>
        <p className="text-xs mt-2">No quiz data yet</p>
      </div>
    );
  }

  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#4648d4" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4648d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e9ff" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#767586" }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#767586" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#4648d4" strokeWidth={2.5}
            fill="url(#colorScore)" dot={{ r: 3, fill: "#4648d4", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#4648d4" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}