"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ScanResults from "@/components/ScanResults";
import { AuditResult } from "./actions";
import { BarChart3, ShieldCheck, Zap, Activity } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen pt-24 px-6 pb-24">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-12 animate-float">

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            SitePulse SEO
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Advanced HTML auditing to uncover hidden growth gaps and elevate your search authority.
          </p>
          <Link href="/guide" className="bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 backdrop-blur-md active:scale-95 mx-auto block w-fit">
            Guide for You
          </Link>
        </div>

        {/* Search Bar Component */}
        <SearchBar onResult={setResult} onLoading={setLoading} />

        {/* Features Row - Only show if no results yet */}
        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 w-full animate-in fade-in zoom-in duration-1000 delay-300">
            {[
              { icon: Zap, label: "Fast Crawl", desc: "Edge parsing" },
              { icon: BarChart3, label: "Analytics", desc: "Data insights" },
              { icon: ShieldCheck, label: "SEO Guard", desc: "Meta health" },
              { icon: Activity, label: "Realtime", desc: "Live audits" }
            ].map((f, i) => (
              <div key={i} className="glass p-6 text-center hover:scale-105 transition-transform duration-300 cursor-default">
                <f.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3 icon-glow" />
                <h3 className="font-bold text-sm mb-1">{f.label}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-tighter">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-32 flex flex-col items-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-8 text-indigo-400 font-mono animate-pulse tracking-[0.2em] uppercase text-sm">
              Analyzing HTML Metadata...
            </p>
          </div>
        )}

        {/* Results Section */}
        {!loading && result && <ScanResults result={result} />}
      </div>

      {/* Footer Decoration */}
      <div className="fixed bottom-12 left-12 flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">System Online</span>
      </div>
    </main>
  );
}
