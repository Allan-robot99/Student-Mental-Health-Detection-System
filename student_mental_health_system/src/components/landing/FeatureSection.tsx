import Card from "@/components/common/Card";

const features = [
  "Private self-check with no account required",
  "ML-based high/low risk early-awareness result",
  "Safe supportive recommendations for students",
];

export default function FeatureSection() {
  return (
    <section className="container-page py-6">
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature}>
            <p className="text-slate-700">{feature}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
