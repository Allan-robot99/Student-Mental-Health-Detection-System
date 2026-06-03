export default function RiskBadge({ label }: { label: "High Risk" | "Low Risk" }) {
  const color = label === "High Risk" ? "bg-[var(--high-risk)]" : "bg-[var(--low-risk)]";
  return <span className={`inline-block rounded px-3 py-1 text-white ${color}`}>{label}</span>;
}
