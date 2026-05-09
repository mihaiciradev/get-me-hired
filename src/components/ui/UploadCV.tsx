"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { recommendJobs } from "@/lib/api";

export default function UploadCV() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await recommendJobs(file);
      sessionStorage.setItem("analyzeResult", JSON.stringify(result));
      router.push("/analyze");
    } catch (err) {
      console.error("Upload failed:", err);
      setLoading(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        className="bg-[#7cb0f5] text-[#0d1b3e] font-bold text-sm hover:bg-[#9cc5f7] px-7 py-5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={() => !loading && inputRef.current?.click()}
        disabled={loading}
      >
        {loading ? "Analyzing…" : "Upload your CV"}
      </Button>
    </>
  );
}
