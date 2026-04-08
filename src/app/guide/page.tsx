import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck, Zap, Activity } from "lucide-react";

export default function GuidePage() {
  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen pt-24 px-6 pb-24">
      <div className="relative z-10 w-full max-w-4xl flex flex-col">
        <Link href="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 self-start w-fit">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">Back to Auditor</span>
        </Link>
        
        <div className="glass p-10 relative overflow-hidden">
          {/* Subtle glow sphere behind text */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <BookOpen className="w-8 h-8 text-indigo-400 icon-glow" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">Platform Guide</h1>
              <p className="text-gray-400 mt-2 font-medium">Everything you need to know about SitePulse SEO.</p>
            </div>
          </div>

          <div className="space-y-12 relative z-10">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_currentColor] icon-glow"></span> 
                What is SitePulse SEO?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                SitePulse SEO is a high-speed, technical site auditor designed for modern websites. It enables developers, marketers, and SEO specialists to instantly crawl any public webpage and identify critical HTML metadata gaps. 
                Instead of waiting for slow, exhaustive deep-crawlers, SitePulse analyzes edge-level tags within seconds, making it ideal for rapid iterations and verifying deployments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_currentColor] icon-glow"></span> 
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/20 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-indigo-400 font-extrabold text-3xl mb-3 opacity-50">01</div>
                  <h3 className="font-bold text-white mb-2 text-lg">Input URL</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Simply paste the full URL of the public webpage you want to audit into the main dashboard search bar.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-indigo-400 font-extrabold text-3xl mb-3 opacity-50">02</div>
                  <h3 className="font-bold text-white mb-2 text-lg">Edge Parse</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Our engine requests the HTML payload and rigorously parses exactly what search engine crawlers see.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-indigo-400 font-extrabold text-3xl mb-3 opacity-50">03</div>
                  <h3 className="font-bold text-white mb-2 text-lg">Instant Report</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">You instantly receive a weighted Health Score alongside a detailed breakdown of all SEO failures and passes.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_currentColor] icon-glow"></span> 
                Understanding Your Results
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Your Health Score is dynamically calculated based on the presence and quality of critical semantic tags. The color-coded legend will help you identify issues at a glance:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-5 bg-white/5 p-5 rounded-lg border border-white/5">
                  <ShieldCheck className="w-6 h-6 text-green-500 icon-glow mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-lg">Healthy (Pass)</h4>
                    <p className="text-sm text-gray-400 mt-1">The semantic tag was found and passes standard optimization rules. No immediate action is required.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 bg-white/5 p-5 rounded-lg border border-white/5">
                  <Activity className="w-6 h-6 text-yellow-500 icon-glow mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-lg">Medium (Warning)</h4>
                    <p className="text-sm text-gray-400 mt-1">The tag exists but is sub-optimal. For example, a Title tag that is too short, or missing alt attributes on some images.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 bg-white/5 p-5 rounded-lg border border-white/5">
                  <Zap className="w-6 h-6 text-red-500 icon-glow mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-lg">Risk (Fail)</h4>
                    <p className="text-sm text-gray-400 mt-1">Critical SEO metadata is completely absent or improperly formatted. This poses a direct risk to your search engine rankings.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
