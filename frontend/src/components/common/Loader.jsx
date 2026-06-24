export default function Loader({ fullScreen = true, text = "Loading..." }) {
  const wrap = fullScreen
    ? "fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center py-16";

  return (
    <div className={wrap}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
      </div>
      <p className="mt-4 text-sm text-on-surface-variant font-medium">{text}</p>
    </div>
  );
}