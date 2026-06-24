import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function SkillRadarChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="h-44 flex flex-col items-center justify-center text-on-surface-variant">
        <span className="material-symbols-outlined text-3xl">radar</span>
        <p className="text-xs mt-2">Complete quizzes to see skill map</p>
      </div>
    );
  }

  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e5e9ff" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "#767586" }} />
          <Tooltip
            contentStyle={{ background: "#fff", border: "1px solid #e5e9ff", borderRadius: 10, fontSize: 12 }}
            formatter={(v) => [`${v}%`, "Score"]}
          />
          <Radar name="Score" dataKey="A" stroke="#4648d4" fill="#4648d4" fillOpacity={0.2} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}