import Card from "@/components/common/Card";

const categories = [
  {
    icon: "MO",
    title: "Mood",
    description: "How you've been feeling emotionally.",
  },
  {
    icon: "AN",
    title: "Anxiety",
    description: "Worry, tension, and nervousness.",
  },
  {
    icon: "SL",
    title: "Sleep & Lifestyle",
    description: "Sleep quality, energy, and daily habits.",
  },
  {
    icon: "AS",
    title: "Academic Stress",
    description: "Study load, exams, and performance pressure.",
  },
  {
    icon: "SF",
    title: "Support Factors",
    description: "Social connections and help-seeking.",
  },
];

export default function SurveyIncludes() {
  return (
    <section className="container-page py-6">
      <div className="landing-section-heading">
        <span className="landing-section-line" />
        <h2 className="text-3xl font-semibold text-slate-900">What the self-check includes</h2>
        <span className="landing-section-line" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <Card key={category.title} className="landing-card p-5">
            <div className="flex items-start gap-4">
              <div className="landing-icon-badge landing-icon-badge--small">{category.icon}</div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
                <p className="text-sm leading-6 text-slate-700">{category.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
