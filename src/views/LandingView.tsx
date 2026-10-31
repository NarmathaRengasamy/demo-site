import React from 'react';
import { WORKFLOWS } from '../data/workflows';
import { IconArrowRight } from '../components/common/Icons';
import { HeroVisual } from '../components/visuals/HeroVisual';

interface LandingViewProps {
  onOpenDemo: () => void;
  onSelectWorkflow: (id: string) => void;
}

export function LandingView({ onOpenDemo, onSelectWorkflow }: LandingViewProps) {
  const handleScrollToWorkflows = () => {
    const el = document.getElementById('workflows-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">

      {/* ════════════════════════════════════════════════════════
          HERO SECTION — 2-column split
          LEFT:  brand copy + CTA + trust indicators
          RIGHT: perfox-landing visual design
          ════════════════════════════════════════════════════════ */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[calc(100vh-64px)] items-center py-10 lg:py-0">

        {/* ── LEFT: Copy & CTA ───────────────────────────────── */}
        <div className="flex flex-col justify-center items-start gap-5">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink-2 border border-line text-xs font-mono shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="uppercase tracking-widest font-semibold text-t1">LIVE DEMO · NO SIGNUP NEEDED</span>
          </div>

          {/* Headline */}
          <div>
            <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] text-t1 tracking-tight leading-[1.08]">
              Autonomous agents<br />
              <span className="pf-grad-text">running live.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-t2 max-w-xl leading-relaxed mt-3">
              Watch Perfox orchestrate real business workflows with live telemetry, verifiable citations, and zero-human task resolution — right now in your browser.
            </p>
          </div>

          {/* CTA & Trust Indicators */}
          <div className="flex flex-col gap-4 w-full sm:w-auto pt-1">
            <div>
              <button
                onClick={handleScrollToWorkflows}
                className="inline-flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-pill pf-btn-primary font-sans font-bold text-base shadow-ember-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <span>Explore demo workflows</span>
                <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-y-1">
                  arrow_downward
                </span>
              </button>
            </div>

            {/* Trust / value badges */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-xs font-sans text-t2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-accent">bolt</span>
                <span>Instant sandbox</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-accent">timer</span>
                <span>0s setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-accent">lock_open</span>
                <span>No login required</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Replicated Right Pane Design from perfox-landing ── */}
        <div className="relative flex items-center justify-center w-full">
          <HeroVisual />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WORKFLOW SANDBOXES
          ════════════════════════════════════════════════════════ */}
      <section id="workflows-section" className="w-full pb-16 scroll-mt-24">
        <div className="flex items-center justify-between px-1 mb-5">
          <span className="font-mono text-xs tracking-widest uppercase text-t3 font-bold">EXPLORE SPECIALIZED WORKFLOWS</span>
          <span className="font-mono text-xs text-accent font-semibold">{WORKFLOWS.length} Sandboxes Ready</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {WORKFLOWS.map((wf) => (
            <div
              key={wf.id}
              onClick={() => onSelectWorkflow(wf.id)}
              className="pf-card p-5 sm:p-6 cursor-pointer flex flex-col justify-between group transition-all duration-300 border border-line hover:border-accent/40 hover:shadow-ember-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm shrink-0"
                      style={{ backgroundColor: `${wf.iconColor}15`, borderColor: `${wf.iconColor}35`, color: wf.iconColor }}
                    >
                      <span className="material-symbols-outlined text-2xl">{wf.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-sans font-bold text-base sm:text-lg text-t1 group-hover:text-accent transition-colors">{wf.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold uppercase ${wf.badgeType === 'active' ? 'bg-accent/15 text-accent border border-accent/30' : 'bg-spark/15 text-spark border border-spark/30'}`}>
                          {wf.badge}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-t3 mt-0.5">{wf.subtitle}</p>
                    </div>
                  </div>
                  <IconArrowRight className="w-5 h-5 text-t3 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                </div>
                <p className="font-sans text-xs sm:text-sm text-t2 bg-ink/60 p-3 sm:p-3.5 rounded-xl border border-line leading-relaxed mb-3">{wf.desc}</p>
              </div>
              <div className="flex items-center justify-between text-xs pt-2.5 border-t border-line/60">
                <span className="font-mono text-t3 text-[11px] sm:text-xs">{wf.telemetry}</span>
                <span className="font-mono font-medium text-accent text-xs group-hover:underline">Launch sandbox →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default LandingView;
