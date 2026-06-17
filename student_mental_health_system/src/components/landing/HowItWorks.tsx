import Card from "@/components/common/Card";

const steps = [
  {
    step: "1",
    title: "Give Consent",
    description: "Read the privacy and disclaimer notice before starting the self-check.",
  },
  {
    step: "2",
    title: "Complete Survey",
    description:
      "Answer mood, anxiety, lifestyle, academic stress, and support-related questions.",
  },
  {
    step: "3",
    title: "View Result",
    description:
      "Receive your risk result, contributing factors, and practical suggestions to support your wellbeing.",
  },
];

export default function HowItWorks() {
  return (
    <section className="container-page py-6">
      <div className="landing-section-heading">
        <span className="landing-section-line" />
        <h2 className="text-3xl font-semibold text-slate-900">How it works</h2>
        <span className="landing-section-line" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.step} className="landing-card px-6 py-6">
            <div className="flex items-start gap-4">
              <div className="landing-step-badge">{step.step}</div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-slate-900">{step.title}</h3>
                <p className="text-base leading-7 text-slate-700">{step.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
