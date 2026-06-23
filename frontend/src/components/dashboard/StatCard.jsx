/**
 * Reusable stat card for dashboard grids.
 *
 * Props:
 * - label: small caption text (e.g. "Students")
 * - value: big number/text (e.g. "150", "85%")
 * - valueClassName: tailwind color class for the value (matches screenshot's
 *   per-stat colors — purple/green/red/etc.)
 * - onClick: optional — if provided, card becomes a clickable button
 */
export default function StatCard({ label, value, valueClassName = "text-primary", onClick }) {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={`bg-surface-container-lowest rounded-xl p-5 text-left w-full ${
        onClick ? "hover:shadow-md transition-shadow cursor-pointer" : ""
      }`}
    >
      <p className="text-label-md text-on-surface-variant mb-1">{label}</p>
      <p className={`text-headline-lg font-bold ${valueClassName}`}>{value}</p>
    </Wrapper>
  );
}
