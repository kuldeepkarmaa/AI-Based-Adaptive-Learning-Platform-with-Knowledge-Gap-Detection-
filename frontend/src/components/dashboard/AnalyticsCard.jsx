export default function AnalyticsCard({ icon, label, value, color = "bg-primary/10", iconColor = "text-primary", trend }) {
  return (
    <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        <span className={`material-symbols-outlined text-2xl ${iconColor}`}
          style={{ fontVariationSettings: '"FILL" 1' }}>
          {icon}
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-on-surface leading-none">{value}</p>
        <p className="text-xs text-on-surface-variant mt-0.5">{label}</p>
        {trend !== undefined && (
          <p className={`text-xs font-medium mt-1 ${trend >= 0 ? "text-green-600" : "text-red-500"}`}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% this week
          </p>
        )}
      </div>
    </div>
  );
}