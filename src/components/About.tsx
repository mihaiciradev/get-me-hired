export default function About() {
  return (
    <section id="about" className="w-full px-8 md:px-16 py-20 max-w-6xl mx-auto">
      <div className="bg-[#322f47] border border-[#7cb0f5]/10 rounded-3xl p-10 md:p-14 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-[#7cb0f5]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <p className="text-[11px] text-[#7cb0f5] font-semibold tracking-[0.25em] uppercase mb-3">
              About this project
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Built with purpose,<br />
              <span className="text-[#7cb0f5]">backed by research.</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Get Me Hired is a dissertation project developed at the{" "}
              <span className="text-white/80 font-medium">West University of Timișoara</span>,
              within the Big Data – Data Science, Analytics &amp; Technologies programme.
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              The goal was to build something genuinely useful: a tool that takes your CV
              and - using the same kind of AI that powers modern search engines - finds the
              jobs most likely to be a great fit for you, without you having to do anything
              more than upload a file.
            </p>
          </div>

          {/* Right: simple explainer cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: "📖",
                title: "It reads your CV",
                body: "The app extracts the text from your document and understands what kind of professional you are.",
              },
              {
                icon: "🧠",
                title: "It thinks like a recruiter",
                body: "A trained AI model compares your profile against thousands of real job listings to find the best fits.",
              },
              {
                icon: "📊",
                title: "It shows you the full picture",
                body: "You get a ranked list of matching jobs plus a visual breakdown of where your skills are strongest.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-[#2e2b3b]/60 border border-white/5 rounded-xl px-5 py-4"
              >
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">{item.title}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
