const steps = [
  {
    num: "01",
    icon: "📄",
    title: "Upload your CV",
    desc: "Just pick your CV file - that's it. No account, no forms, no extra steps. The app accepts standard PDF files.",
  },
  {
    num: "02",
    icon: "🔍",
    title: "We read between the lines",
    desc: "The app goes through your CV and figures out what you're good at - your skills, experience, and the type of work you've done - automatically.",
  },
  {
    num: "03",
    icon: "🎯",
    title: "You get your matches",
    desc: "In seconds, you'll see real job openings ranked by how well they fit your profile, along with a breakdown of where your strengths lie.",
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
          Simple as one, two, three
        </h2>
        <p className="text-sm text-white/40 mt-3 max-w-md mx-auto leading-relaxed">
          No technical knowledge needed. If you have a CV, you&apos;re ready to go.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={step.num} className="flex flex-col items-start gap-6 md:flex-row md:items-start">
            {/* Step card */}
            <div className="relative w-full bg-[#322f47] border border-[#7cb0f5]/10 rounded-2xl p-7 hover:border-[#7cb0f5]/30 transition-all group">
              <div className="absolute top-6 right-6 text-4xl font-black text-white/5 group-hover:text-white/10 transition-all select-none">
                {step.num}
              </div>
              <div className="text-2xl mb-5">{step.icon}</div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
            </div>

            {/* Arrow between steps (not after last) */}
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center self-center shrink-0 text-white/15 text-xl -mx-3">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
