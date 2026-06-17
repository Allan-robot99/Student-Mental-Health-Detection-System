import Card from "@/components/common/Card";

const features = [
  {
    icon: "PS",
    title: "Private Self-Check",
    description:
      "No account is required. Use your name or nickname to complete the self-check.",
  },
  {
    icon: "ML",
    title: "ML-Based Result",
    description:
      "Receive a Low Risk or High Risk early-awareness result based on your survey responses.",
  },
  {
    icon: "SG",
    title: "Supportive Suggestions",
    description:
      "Get practical guidance based on your result and possible contributing factors.",
  },
];

export default function FeatureSection() {
  return (
    <section className="container-page py-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="landing-card p-6">
            <div className="flex items-start gap-4">
              <div className="landing-icon-badge">{feature.icon}</div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-900">{feature.title}</h2>
                <p className="text-base leading-7 text-slate-700">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
