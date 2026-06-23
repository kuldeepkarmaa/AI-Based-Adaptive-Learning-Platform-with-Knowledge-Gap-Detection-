const STATUS_STYLES = {
  Active: "bg-green-100 text-green-700",
  Draft: "bg-yellow-100 text-yellow-700",
  "At Risk": "bg-red-100 text-red-700",
};
 
export default function Badge({ status }) {
  const styles = STATUS_STYLES[status] || "bg-surface-container text-on-surface-variant";
 
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${styles}`}>
      {status}
    </span>
  );
}