"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { scrapeUrl, AuditResult } from "@/app/actions";

interface SearchBarProps {
  onResult: (result: AuditResult) => void;
  onLoading: (loading: boolean) => void;
}

export default function SearchBar({ onResult, onLoading }: SearchBarProps) {
  const [url, setUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    onLoading(true);
    const result = await scrapeUrl(url);
    onResult(result);
    onLoading(false);
  };

  return (
    <div 
      className={`w-full max-w-2xl transition-all duration-500 ease-out ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute -inset-0.5 bg-indigo-500/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center glass p-2 gap-2">
          <div className="flex-1 flex items-center px-4">
            <Search className="w-5 h-5 text-indigo-400 mr-3 opacity-70" />
            <input
              type="text"
              placeholder="Enter website URL (e.g., google.com)"
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-lg py-3"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-indigo-900/20 active:scale-95 flex items-center gap-2"
          >
            Audit Now
          </button>
        </div>
      </form>
    </div>
  );
}
