import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UploadCV from "./ui/UploadCV";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-8 md:px-16 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#7cb0f5]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#7cb0f5]/5 blur-3xl pointer-events-none" />

      {/* Floating grid dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(124,176,245,0.08) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full max-w-6xl mx-auto">
        {/* Left: Text */}
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 mb-6 bg-[#7cb0f5]/10 border border-[#7cb0f5]/25 rounded-full px-4 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7cb0f5] animate-pulse" />
            <span className="text-[11px] text-[#7cb0f5] font-semibold tracking-widest uppercase">
              Powered by AI
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
            Land your
            <br />
            <span className="text-[#7cb0f5]">dream job</span>
            <br />
            with AI.
          </h1>

          <p className="text-sm md:text-base text-white/50 leading-relaxed mb-10 max-w-md">
            Upload your CV and let AI do the heavy lifting — real job matches,
            salary insights, and career feedback powered by live market data.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <UploadCV />
            <Button
              variant="ghost"
              className="text-sm text-white/60 hover:text-white hover:bg-white/5 px-5 py-5"
            >
              See how it works →
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-10">
            <div className="text-center">
              <p className="text-xl font-bold text-white">10k+</p>
              <p className="text-[11px] text-white/40">Job listings</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-xl font-bold text-white">92%</p>
              <p className="text-[11px] text-white/40">Match accuracy</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-xl font-bold text-white">3min</p>
              <p className="text-[11px] text-white/40">To your matches</p>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="flex-shrink-0 w-full md:w-[380px] relative">
          {/* Main card */}
          <div className="bg-[#3a3660]/80 border border-[#7cb0f5]/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Your CV
              </p>
              <span className="text-[10px] bg-[#7cb0f5]/15 text-[#7cb0f5] px-2 py-0.5 rounded-full border border-[#7cb0f5]/20">
                Analyzing...
              </span>
            </div>
            <div className="space-y-2 mb-5">
              <div className="h-2 rounded-full bg-white/10 w-full" />
              <div className="h-2 rounded-full bg-white/10 w-4/5" />
              <div className="h-2 rounded-full bg-white/10 w-3/5" />
            </div>
            <div className="h-px bg-white/5 mb-5" />
            <p className="text-[11px] text-white/40 mb-3 uppercase tracking-widest">
              Top matches
            </p>
            <div className="space-y-2.5">
              {[
                {
                  title: "Senior Frontend Dev",
                  company: "Stripe",
                  match: "96%",
                },
                { title: "UI Engineer", company: "Vercel", match: "91%" },
                { title: "Product Designer", company: "Linear", match: "87%" },
              ].map((job) => (
                <div
                  key={job.title}
                  className="flex items-center justify-between bg-[#2e2b3b]/60 rounded-xl px-4 py-3 border border-white/5"
                >
                  <div>
                    <p className="text-xs font-semibold text-white">
                      {job.title}
                    </p>
                    <p className="text-[10px] text-white/40">{job.company}</p>
                  </div>
                  <span className="text-xs font-bold text-[#7cb0f5]">
                    {job.match}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 bg-[#7cb0f5] text-[#0d1b3e] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
            92% match found!
          </div>
        </div>
      </div>
    </section>
  );
}
