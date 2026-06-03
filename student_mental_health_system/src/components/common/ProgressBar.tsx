export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div>
      <div className="mb-2 text-sm text-slate-600">
        Step {current} of {total}
      </div>
      <div className="h-2 w-full rounded bg-slate-200">
        <div
          className="h-2 rounded bg-[var(--secondary)] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
