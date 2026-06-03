export default function ScoreSummary({ confidence }: { confidence: number | null }) {
  return (
    <div className="text-slate-700">
      Confidence: {confidence === null ? "N/A" : `${Math.round(confidence * 100)}%`}
    </div>
  );
}
