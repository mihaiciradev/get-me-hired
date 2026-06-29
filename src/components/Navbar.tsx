"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAnalyzePage = pathname === "/analyze";
  const [showWarning, setShowWarning] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnalyzePage) {
      e.preventDefault();
      setShowWarning(true);
    }
  };

  const handleLeave = () => {
    setShowWarning(false);
    router.push("/");
  };

  return (
    <nav className="relative flex justify-between items-center px-8 py-5 w-full">
      <span className="text-[#7cb0f5] font-bold text-base tracking-widest uppercase">
        Get Me Hired
      </span>

      <div className="flex gap-6 md:gap-10">
        <a
          href="#how"
          onClick={handleNavClick}
          className="text-xs text-white/60 hover:text-[#7cb0f5] transition-all"
        >
          How it works
        </a>
        <a
          href="#pipeline"
          onClick={handleNavClick}
          className="text-xs text-white/60 hover:text-[#7cb0f5] transition-all hidden sm:block"
        >
          Under the hood
        </a>
        <a
          href="#about"
          onClick={handleNavClick}
          className="text-xs text-white/60 hover:text-[#7cb0f5] transition-all hidden sm:block"
        >
          About
        </a>
      </div>

      {/* Leave-page confirmation popover */}
      {showWarning && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowWarning(false)}
          />

          {/* Popover card */}
          <div
            className="absolute top-[calc(100%+8px)] right-8 z-50 w-72
                        bg-[#2e2b3b] border border-[#7cb0f5]/20 rounded-2xl
                        shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-5
                        animate-in fade-in slide-in-from-top-2 duration-150"
          >
            {/* Arrow */}
            <div className="absolute -top-[7px] right-10 w-3 h-3 rotate-45 bg-[#2e2b3b] border-l border-t border-[#7cb0f5]/20" />

            <div className="flex items-start gap-3 mb-4">
              <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-[#7cb0f5]/10 border border-[#7cb0f5]/25 flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7cb0f5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-snug">
                  Leave your insights?
                </p>
                <p className="text-xs text-white/45 mt-1 leading-relaxed">
                  You&apos;ll be taken back to the home page. Your results will still be here if you upload the same CV again.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleLeave}
                className="flex-1 text-xs font-semibold bg-[#7cb0f5] text-[#0d1b3e] rounded-lg py-2 hover:bg-[#9cc5f7] transition-colors"
              >
                Return home
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 text-xs font-medium text-white/60 bg-white/5 border border-white/10 rounded-lg py-2 hover:bg-white/10 hover:text-white transition-colors"
              >
                Stay here
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
