const preprocessingSteps = [
  { label: "Raw dataset input", sub: "CSV" },
  { label: "Text cleaning", sub: "lowercase, strip" },
  { label: "Missing label removal", sub: "drop nulls" },
  { label: "Category filtering", sub: "top classes" },
  { label: "Label encoding", sub: "string → int" },
  { label: "Sentence embedding", sub: "MiniLM-L6" },
  { label: "Save features", sub: ".pkl export" },
];

const pipelineSteps = {
  fe1: { label: "Upload CV", zone: "Frontend" },
  be: [
    { label: "PDF text extraction" },
    { label: "Text normalizing" },
    { label: "Generate semantic embeddings" },
  ],
  split: [
    { label: "XGBoost classifier" },
    { label: "Cosine similarity ranking" },
  ],
  merge: { label: "Results filtering & ranking" },
  api: { label: "API response (JSON)", zone: "Backend" },
  fe2: { label: "Render results", zone: "Frontend" },
};

function Arrow() {
  return (
    <div className="flex items-center justify-center shrink-0 text-[#7cb0f5]/40 text-sm select-none">
      →
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex items-center justify-center shrink-0 text-[#7cb0f5]/40 text-sm select-none">
      ↓
    </div>
  );
}

function StepBox({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="bg-[#2e2b3b]/80 border border-[#7cb0f5]/15 rounded-lg px-3 py-2 text-center min-w-[100px]">
      <p className="text-[11px] font-semibold text-white leading-tight">{label}</p>
      {sub && <p className="text-[9px] text-white/30 mt-0.5">{sub}</p>}
    </div>
  );
}

function ZoneBadge({ label }: { label: string }) {
  return (
    <span className="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#7cb0f5]/10 text-[#7cb0f5] border border-[#7cb0f5]/20">
      {label}
    </span>
  );
}

export default function UnderTheHood() {
  return (
    <section id="pipeline" className="w-full px-8 md:px-16 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-[11px] text-[#7cb0f5] font-semibold tracking-[0.25em] uppercase mb-3">
          Under the hood
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          How the system is built
        </h2>
        <p className="text-sm text-white/40 mt-3 max-w-lg mx-auto leading-relaxed">
          Two pipelines power the app: one that prepares the data, and one that serves your results.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* --- 1. Preprocessing Pipeline --- */}
        <div className="bg-[#322f47] border border-[#7cb0f5]/10 rounded-2xl p-7 md:p-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg">⚙️</span>
            <h3 className="text-base font-bold text-white">Data preprocessing pipeline</h3>
          </div>
          <p className="text-xs text-white/40 mb-6 leading-relaxed max-w-2xl">
            Before the model can make predictions, the raw job-listings dataset goes through a
            multi-step cleaning process. Text is lowercased and stripped of noise, rows with
            missing labels are dropped, and only the most representative categories are kept.
            Each job description is then encoded as a dense vector using a sentence-transformer
            model, and the resulting features are saved for training.
          </p>

          {/* Flow diagram - horizontal on desktop, vertical on mobile */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-2">
            {preprocessingSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <StepBox label={step.label} sub={step.sub} />
                {i < preprocessingSteps.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
          <div className="flex md:hidden flex-col items-center gap-2">
            {preprocessingSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-2">
                <StepBox label={step.label} sub={step.sub} />
                {i < preprocessingSteps.length - 1 && <ArrowDown />}
              </div>
            ))}
          </div>
        </div>

        {/* --- 2. End-to-end system pipeline --- */}
        <div className="bg-[#322f47] border border-[#7cb0f5]/10 rounded-2xl p-7 md:p-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg">🔄</span>
            <h3 className="text-base font-bold text-white">End-to-end system pipeline</h3>
          </div>
          <p className="text-xs text-white/40 mb-6 leading-relaxed max-w-2xl">
            Follow the path from uploading your CV to seeing your results. The backend extracts
            text, builds an embedding, then runs two parallel scoring methods that merge into a
            single ranked list before the frontend displays it.
          </p>

          {/* Pipeline flow */}
          <div className="flex flex-col items-center gap-3">
            {/* FE start */}
            <div className="flex items-center gap-2">
              <ZoneBadge label="Frontend" />
            </div>
            <StepBox label={pipelineSteps.fe1.label} />
            <ArrowDown />

            {/* BE zone */}
            <div className="flex items-center gap-2">
              <ZoneBadge label="Backend" />
            </div>

            {/* Sequential BE steps */}
            {pipelineSteps.be.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-3">
                <StepBox label={step.label} />
                {i < pipelineSteps.be.length - 1 && <ArrowDown />}
              </div>
            ))}

            {/* Split into two */}
            <div className="flex items-center gap-1 text-[#7cb0f5]/40 text-sm select-none">
              ↙ ↘
            </div>
            <div className="flex items-center gap-4">
              {pipelineSteps.split.map((step) => (
                <StepBox key={step.label} label={step.label} />
              ))}
            </div>

            {/* Merge back */}
            <div className="flex items-center gap-1 text-[#7cb0f5]/40 text-sm select-none">
              ↘ ↙
            </div>
            <StepBox label={pipelineSteps.merge.label} />
            <ArrowDown />
            <StepBox label={pipelineSteps.api.label} />
            <ArrowDown />

            {/* FE end */}
            <div className="flex items-center gap-2">
              <ZoneBadge label="Frontend" />
            </div>
            <StepBox label={pipelineSteps.fe2.label} />
          </div>
        </div>
      </div>
    </section>
  );
}
