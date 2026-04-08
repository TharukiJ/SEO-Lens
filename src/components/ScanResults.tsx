"use client";

import { AuditResult } from "@/app/actions";
import { CheckCircle2, AlertCircle, XCircle, Globe } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScanResultsProps {
  result: AuditResult;
}

export default function ScanResults({ result }: ScanResultsProps) {
  if (!result.success || !result.data) {
    return (
      <div className="glass p-8 mt-12 bg-red-500/10 border-red-500/20 max-w-2xl w-full text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4 icon-glow" />
        <h2 className="text-xl font-bold mb-2">Scan Failed</h2>
        <p className="text-gray-400">{result.error || "The URL could not be audited."}</p>
      </div>
    );
  }

  const { score, url, checks } = result.data;

  return (
    <div className="w-full max-w-4xl mt-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1 glass p-8 flex flex-col items-center justify-center indigo-glow-box">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-800"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * score) / 100}
                className={cn(
                  "transition-all duration-1000 ease-out",
                  score > 80 ? "text-green-500" : score > 50 ? "text-yellow-500" : "text-red-500"
                )}
              />
            </svg>
            <span className="absolute text-4xl font-bold">{score}%</span>
          </div>
          <p className="mt-4 text-gray-400 font-medium uppercase tracking-widest text-sm">Health Score</p>
        </div>

        <div className="md:col-span-2 glass p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Globe className="w-6 h-6 text-indigo-400 icon-glow" />
            </div>
            <h1 className="text-2xl font-bold truncate max-w-md">{url}</h1>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Overall site audit for technical SEO. Your health score is based on critical tags like Title, H1, Meta Description, and Image Accessibility.
          </p>
          <div className="mt-6 flex gap-4">
            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs rounded-full border border-green-500/20">Technical Analysis OK</span>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">High Performance</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checks.map((check, i) => (
          <div key={i} className="glass p-6 glass-hover group transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {check.status === "pass" && <CheckCircle2 className="w-5 h-5 text-green-500 icon-glow" />}
                {check.status === "warn" && <AlertCircle className="w-5 h-5 text-yellow-500 icon-glow" />}
                {check.status === "fail" && <XCircle className="w-5 h-5 text-red-500 icon-glow" />}
                <h3 className="font-bold text-lg">{check.name}</h3>
              </div>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter",
                check.status === "pass" ? "bg-green-500/20 text-green-500" :
                check.status === "warn" ? "bg-yellow-500/20 text-yellow-500" : "bg-red-500/20 text-red-500"
              )}>
                {check.status}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-sm font-mono text-gray-300 break-words line-clamp-2">
                {check.value}
              </p>
            </div>
            <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
              {check.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
