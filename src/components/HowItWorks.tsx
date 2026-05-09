const steps = [
  {
    num: "01",
    title: "Upload your CV",
    desc: "Drop your CV in PDF or Word format. Our parser extracts your skills, experience, and education instantly.",
    icon: "📄",
  },
  {
    num: "02",
    title: "AI analysis",
    desc: "Cross-referenced against thousands of live job listings and real salary data from across the market.",
    icon: "🤖",
  },
  {
    num: "03",
    title: "Get real insights",
    desc: "Personalized job matches, salary ranges, and actionable feedback to land your next role faster.",
    icon: "🎯",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="w-full px-8 md:px-16 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-[11px] text-[#7cb0f5] font-semibold tracking-[0.25em] uppercase mb-3">
          How it works
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Three steps to your next role
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="relative bg-[#322f47] border border-[#7cb0f5]/10 rounded-2xl p-7 hover:border-[#7cb0f5]/30 transition-all group"
          >
            <div className="absolute top-6 right-6 text-4xl font-black text-white/5 group-hover:text-white/10 transition-all">
              {step.num}
            </div>
            <div className="text-2xl mb-5">{step.icon}</div>
            <h3 className="text-base font-bold text-white mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
