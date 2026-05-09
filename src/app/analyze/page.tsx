"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Navbar from "@/components/Navbar";

type Category = { name: string; score: number };
type Job = {
  title: string;
  company: string;
  category: string;
  source: string;
  similarity: number;
};
type AnalysisResult = {
  top_categories: Category[];
  recommended_jobs: Job[];
};

const CHART_COLORS = ["#7cb0f5", "#9d7cf5", "#f57cb0", "#7cf5c0", "#f5c07c"];

// Wraps a long job title across multiple SVG lines for the Y-axis
function YAxisTick({ x, y, payload }: { x: number; y: number; payload: { value: string } }) {
  const words = payload.value.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= 22) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  const lineH = 13;
  const totalH = lines.length * lineH;

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, i) => (
        <text
          key={i}
          x={0}
          y={i * lineH - totalH / 2 + lineH / 2}
          textAnchor="end"
          fill="rgba(255,255,255,0.65)"
          fontSize={11}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function AnalyzePage() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("analyzeResult");
    if (!stored) {
      router.replace("/");
      return;
    }
    setData(JSON.parse(stored));
  }, [router]);

  if (!data) return null;

  const topCategory = data.top_categories[0];

  const barData = data.recommended_jobs.map((j) => ({
    name: j.title,
    similarity: Math.round(j.similarity * 100),
  }));

  return (
    <div className="min-h-screen bg-[#1e1c2e] text-white">
      {/* Background glow orbs */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#7cb0f5]/8 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#7cb0f5]/5 blur-3xl pointer-events-none" />

      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-10 pb-24">
        {/* Page header */}
        <div className="mb-10">
          <button
            onClick={() => router.push("/")}
            className="text-xs text-white/40 hover:text-[#7cb0f5] transition-colors mb-5 flex items-center gap-1"
          >
            ← Back to upload
          </button>
          <div className="inline-flex items-center gap-2 mb-3 bg-[#7cb0f5]/10 border border-[#7cb0f5]/25 rounded-full px-4 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7cb0f5] animate-pulse" />
            <span className="text-[11px] text-[#7cb0f5] font-semibold tracking-widest uppercase">
              Analysis complete
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Your Career <span className="text-[#7cb0f5]">Insights</span>
          </h1>
          <p className="text-sm text-white/40 mt-2">
            Based on your CV, here&apos;s how the market sees your profile.
          </p>
        </div>

        {/* Row 1: Best match + Pie chart */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Best match card */}
          <div className="bg-[#3a3660]/80 border border-[#7cb0f5]/20 rounded-2xl p-7 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest mb-4">
                Your strongest match
              </p>
              <h2 className="text-4xl font-bold text-white">
                {topCategory.name}
              </h2>
              <p className="text-[#7cb0f5] text-6xl font-bold mt-4 leading-none">
                {topCategory.score.toFixed(1)}
                <span className="text-3xl">%</span>
              </p>
              <p className="text-xs text-white/30 mt-2">classifier confidence</p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/5">
              <p className="text-xs text-white/40 mb-3">Other relevant areas</p>
              <div className="flex flex-wrap gap-2">
                {data.top_categories.slice(1).map((cat, i) => (
                  <span
                    key={cat.name}
                    className="text-xs bg-[#2e2b3b] border border-white/10 rounded-full px-3 py-1 text-white/70"
                  >
                    {cat.name}{" "}
                    <span style={{ color: CHART_COLORS[(i + 1) % CHART_COLORS.length] }}>
                      {cat.score.toFixed(2)}%
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pie chart — category distribution */}
          <div className="bg-[#3a3660]/80 border border-[#7cb0f5]/20 rounded-2xl p-7 backdrop-blur-sm">
            <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">
              Profile distribution
            </p>
            <p className="text-sm font-semibold text-white mb-4">
              Category breakdown
            </p>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={data.top_categories}
                  dataKey="score"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {data.top_categories.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#2e2b3b",
                    border: "1px solid rgba(124,176,245,0.2)",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${Number(value).toFixed(2)}%`, "Score"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 justify-center">
              {data.top_categories.map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                  />
                  <span className="text-[11px] text-white/60">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Horizontal bar chart */}
        <div className="bg-[#3a3660]/80 border border-[#7cb0f5]/20 rounded-2xl p-7 backdrop-blur-sm mb-6">
          <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">
            Similarity scores
          </p>
          <p className="text-sm font-semibold text-white mb-6">
            Top job matches ranked by relevance
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ left: 8, right: 32, top: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis
                type="number"
                domain={[60, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={210}
                tick={YAxisTick as never}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#2e2b3b",
                  border: "1px solid rgba(124,176,245,0.2)",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${Number(value)}%`, "Similarity"]}
                labelFormatter={(label: string) => label}
                cursor={{ fill: "rgba(124,176,245,0.05)" }}
              />
              <Bar dataKey="similarity" radius={[0, 6, 6, 0]} fill="#7cb0f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Row 3: Job cards */}
        <div>
          <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">
            Recommended positions
          </p>
          <p className="text-sm font-semibold text-white mb-5">
            {data.recommended_jobs.length} jobs matched to your profile
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.recommended_jobs.map((job, i) => (
              <div
                key={i}
                className="bg-[#2e2b3b]/80 border border-white/5 hover:border-[#7cb0f5]/30 rounded-xl p-5 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white leading-snug group-hover:text-[#7cb0f5] transition-colors">
                      {job.title}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#7cb0f5] shrink-0">
                    {Math.round(job.similarity * 100)}%
                  </span>
                </div>

                {/* Similarity progress bar */}
                <div className="h-1 rounded-full bg-white/5 mb-4">
                  <div
                    className="h-full rounded-full bg-[#7cb0f5] transition-all"
                    style={{ width: `${Math.round(job.similarity * 100)}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] bg-[#7cb0f5]/10 text-[#7cb0f5] border border-[#7cb0f5]/20 rounded-full px-2.5 py-0.5">
                    {job.category}
                  </span>
                  <span className="text-[10px] bg-white/5 text-white/40 border border-white/10 rounded-full px-2.5 py-0.5 capitalize">
                    {job.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
