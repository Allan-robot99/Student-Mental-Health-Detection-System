import Button from "@/components/common/Button";
import Link from "next/link";

export default function ResultActionButtons() {
  function downloadResult() {
    window.print();
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Link
        href="/survey"
        className="inline-flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Retake Survey
      </Link>
      <Button type="button" variant="outline" onClick={downloadResult} className="w-full">
        Download Result
      </Button>
    </div>
  );
}
