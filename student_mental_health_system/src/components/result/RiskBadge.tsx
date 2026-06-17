export default function RiskBadge({ label }: { label: "High Risk" | "Low Risk" }) {
  const color =
    label === "High Risk" ? "bg-orange-500 text-white" : "bg-emerald-600 text-white";
  return (
    <span className={`inline-flex items-center rounded-full px-5 py-2 text-2xl font-semibold ${color}`}>
      {label}
    </span>
  );
}
