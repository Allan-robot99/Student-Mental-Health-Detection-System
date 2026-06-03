export default function KeyFactors({ factors }: { factors: string[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Possible contributing factors</h3>
      <ul className="list-disc list-inside text-slate-700">
        {factors.map((factor) => (
          <li key={factor}>{factor}</li>
        ))}
      </ul>
    </div>
  );
}
