/**
 * Thin progress bar.
 *
 * Props:
 * - value: number 0-100
 * - color: hex/tailwind-safe CSS color for the fill (default brand purple)
 * - label: text shown on the left of the percentage (default "Progress").
 *   Ignored when compact is true.
 * - compact: if true, renders ONLY the bar track (no label/percentage row
 *   above it) — use this when the title/percentage are already shown
 *   inline next to the bar, like in a table row.
 */
export default function ProgressBar({ value, color = "#4648d4", label = "Progress", compact = false }) {
  const track = (
    <div className="h-1.5 rounded-full bg-surface-container w-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
 
  if (compact) return track;
 
  return (
    <div>
      <div className="flex justify-between text-[11px] text-on-surface-variant mb-1">
        <span>{label}</span>
        <span className="font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      {track}
    </div>
  );
}
 