import Card from "@/components/common/Card";

export default function PrivacySafetyNotice() {
  return (
    <section id="support" className="container-page py-4">
      <Card className="landing-card px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.7fr] lg:items-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-slate-900">Your privacy matters</h2>
            <p className="text-base leading-7 text-slate-700">
              No login is required and your responses are private. Your result is for personal
              reflection and early awareness only.
            </p>
            <p className="text-base leading-7 text-slate-700">
              If you feel overwhelmed or unsafe, please contact a university counsellor, a trusted
              person, or emergency support.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-5">
            <h3 className="text-xl font-semibold text-slate-900">Need immediate help?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Contact your campus counselling center or call local emergency services.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
