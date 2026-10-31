import React, { useState, useEffect } from 'react';
import { WorkflowItem, PipelineStage } from '../types';
import { createDefaultStages } from '../data/workflows';
import { LaunchBlast } from '../components/visuals/LaunchBlast';
import robotAsset from '../assets/perfox-robot.png';

export interface SandboxSetupViewProps {
  workflow?: WorkflowItem | null;
  onComplete: () => void;
  onBack: () => void;
}

export function SandboxSetupView({ workflow, onComplete, onBack }: SandboxSetupViewProps) {
  const targetTitle = workflow?.title || 'Industrial Tape Co.';
  const stages: PipelineStage[] =
    workflow?.stages && workflow.stages.length > 0
      ? workflow.stages
      : createDefaultStages(targetTitle);

  // Completed stages count (0 to 6)
  const [completedCount, setCompletedCount] = useState<number>(0);
  const isFullyReady = completedCount >= stages.length;
  const [showBlast, setShowBlast] = useState(false);

  // Fully automatic point-by-point progression (uninterrupted, sequential)
  useEffect(() => {
    setCompletedCount(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCompletedCount(current);
      if (current >= stages.length) {
        clearInterval(timer);
      }
    }, 1100);

    return () => {
      clearInterval(timer);
    };
  }, [stages.length, workflow?.id]);

  const hasTriggeredBlastRef = React.useRef(false);

  // Reset launch trigger if workflow changes
  useEffect(() => {
    hasTriggeredBlastRef.current = false;
  }, [workflow?.id]);

  // Auto-launch transition as soon as all stages are verified (strictly ONCE)
  useEffect(() => {
    if (isFullyReady && !hasTriggeredBlastRef.current) {
      hasTriggeredBlastRef.current = true;
      const autoLaunchTimer = setTimeout(() => {
        setShowBlast(true);
      }, 500);

      return () => clearTimeout(autoLaunchTimer);
    }
  }, [isFullyReady]);

  const handleBlastDone = () => {
    setShowBlast(false);
    onComplete();
  };

  const progressPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <>
      {showBlast && <LaunchBlast title={targetTitle} onDone={handleBlastDone} />}

      {/* Progress Loader - Positioned directly below the navbar */}
      <div className="fixed top-[56px] sm:top-[64px] left-0 right-0 w-full h-[5px] bg-ink-3/90 border-b border-white/10 z-40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#ff8a2b] via-[#ff6a2c] to-[#ff3d6e] transition-all duration-700 ease-out relative shadow-[0_0_16px_rgba(255,106,44,1),0_0_30px_rgba(255,61,110,0.8)]"
          style={{ width: `${Math.max(progressPercent, 5)}%` }}
        />
      </div>

      {/* Main Two-Column Viewport Container (Desktop Single Screen Fit with Generous Breathing Room) */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-5 flex items-center justify-center animate-fade-in relative">
        {/* Soft Background Ambient Lighting (Seamlessly Faded) */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-spark/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 xl:gap-14">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN (40% Desktop): Mascot with Soft Illumination */}
          {/* ======================================================== */}
          <div className="w-full lg:w-[40%] xl:w-[42%] flex flex-col items-center justify-center relative select-none order-first lg:order-none shrink-0 py-2">
            {/* Seamless Circular Radial Glow (Zero Box Boundaries) */}
            <div
              className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none transition-all duration-700 animate-aura-breathe"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 106, 44, 0.28) 0%, rgba(255, 61, 110, 0.16) 40%, rgba(107, 75, 255, 0.10) 65%, transparent 75%)',
                filter: 'blur(42px)',
                opacity: isFullyReady ? 1 : 0.65 + (completedCount / stages.length) * 0.35,
                transform: isFullyReady ? 'scale(1.15)' : 'scale(1)',
              }}
            />

            {/* Inner Core Ember Glow */}
            <div
              className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full pointer-events-none transition-all duration-700"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 138, 43, 0.26) 0%, rgba(139, 92, 246, 0.12) 55%, transparent 72%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Mascot Image (Clean Floating Presentation, No Box Shadow Artifacts) */}
            <img
              src={robotAsset}
              alt="Perfox AI Mascot"
              className={`relative z-10 w-full max-w-[240px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[440px] xl:max-w-[480px] h-auto object-contain select-none pointer-events-none transition-all duration-500 ${
                isFullyReady
                  ? 'animate-robot-celebrate scale-105'
                  : completedCount >= 4
                  ? 'animate-robot-energetic'
                  : 'animate-robot-float'
              }`}
            />
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN (60% Desktop): Initialization Pipeline       */}
          {/* ======================================================== */}
          <div className="w-full lg:w-[60%] xl:w-[58%] flex flex-col justify-center min-w-0">
            {/* Top Ambient Badges Row */}
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-3.5">
              {/* Left Badge: CLUSTER ONLINE */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-[10.5px] sm:text-[11px] font-semibold shadow-xs shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-wider">CLUSTER ONLINE</span>
              </div>

              {/* Right Badge: READY / VERIFYING */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-[10.5px] sm:text-[11px] font-semibold shadow-xs shrink-0">
                {isFullyReady ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="tracking-wider">SANDBOX READY</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span className="tracking-wider text-accent font-mono">AUTOMATIC PREVIEW</span>
                  </>
                )}
              </div>
            </div>

            {/* Header & Subtitle with Clean Breathing Space */}
            <div className="text-left mb-3.5 sm:mb-4">
              <h1 className="font-sans font-bold text-2xl sm:text-[26px] text-t1 tracking-tight leading-snug">
                Your sandbox is{' '}
                <span className="pf-grad-text">
                  {isFullyReady ? 'launching live!' : 'preparing...'}
                </span>
              </h1>
              <p className="font-sans text-xs sm:text-[13px] text-t2 leading-relaxed mt-1.5 max-w-xl">
                {targetTitle} is{' '}
                {isFullyReady
                  ? 'verified and launching automatically.'
                  : 'configuring autonomous engines.'}{' '}
                Zero config required.
              </p>
            </div>

            {/* Section Subtitle Bar */}
            <div className="flex items-center justify-between gap-2 text-xs font-mono mb-2.5 sm:mb-3 px-0.5">
              <span className="text-t3 uppercase tracking-widest font-bold text-[10px] sm:text-[10.5px] shrink-0">
                ORCHESTRATION PIPELINE · PREVIEW
              </span>
              <div className="flex items-center gap-1.5 min-w-0">
                {isFullyReady ? (
                  <span className="text-accent font-semibold text-[10.5px] sm:text-xs flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping shrink-0" />
                    <span className="truncate">All 6 stages verified · Launching automatically...</span>
                  </span>
                ) : (
                  <span className="text-accent/90 font-semibold text-[10.5px] sm:text-xs flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping shrink-0" />
                    <span className="truncate">
                      Verifying stage {completedCount + 1} of {stages.length}...
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Pipeline 6 Stages: Premium Spacing & Clear Nodes */}
            <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-3.5">
              {stages.map((stage) => {
                const isDone = stage.id <= completedCount;
                const isCurrent = stage.id === completedCount + 1;

                return (
                  <div
                    id={`stage-${stage.id}`}
                    key={stage.id}
                    className={`w-full py-2.5 px-3.5 sm:px-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 cursor-default select-none ${
                      isCurrent
                        ? 'bg-gradient-to-r from-accent/15 via-ink-2/95 to-ink-2/90 border-accent/70 shadow-[0_0_24px_rgba(255,106,44,0.18)] ring-1 ring-accent/40 z-10'
                        : isDone
                        ? 'bg-ink-2/70 border-emerald-500/20 shadow-xs'
                        : 'bg-ink-1/30 border-white/[0.04] opacity-45'
                    }`}
                  >
                    {/* Node point & description */}
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                      {/* Status Node Point */}
                      <div
                        className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center shrink-0 text-xs font-mono transition-all ${
                          isDone
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                            : isCurrent
                            ? 'bg-gradient-to-br from-[#ff8a2b] to-[#ff3d6e] text-[#1a0d06] font-bold shadow-[0_0_14px_rgba(255,106,44,0.65)] animate-pulse'
                            : 'bg-ink-3/80 border border-white/10 text-t3'
                        }`}
                      >
                        {isDone ? (
                          <svg
                            className="w-3.5 h-3.5 text-emerald-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <span className="text-[11px] sm:text-xs font-bold">{stage.id}</span>
                        )}
                      </div>

                      {/* Text Content */}
                      <div className="min-w-0 flex-1 flex items-baseline gap-2">
                        <h3
                          className={`font-sans text-xs sm:text-[13px] leading-none transition-colors truncate sm:shrink-0 ${
                            isCurrent
                              ? 'text-t1 font-bold'
                              : isDone
                              ? 'text-t1/90 font-medium'
                              : 'text-t3 font-normal'
                          }`}
                        >
                          {stage.title}
                        </h3>
                        <p className="font-sans text-[11px] sm:text-xs text-t3/80 leading-tight truncate hidden md:block">
                          — {stage.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right Duration Metric */}
                    <div className="shrink-0 flex items-center gap-2">
                      <span
                        className={`font-mono text-[11px] sm:text-xs font-semibold ${
                          isDone
                            ? 'text-emerald-400 flex items-center gap-1.5'
                            : isCurrent
                            ? 'text-accent font-bold animate-pulse'
                            : 'text-t3/40'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <svg
                              className="w-3.5 h-3.5 text-emerald-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{stage.time}</span>
                          </>
                        ) : isCurrent ? (
                          'Verifying...'
                        ) : (
                          stage.time
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Status Card */}
            <div
              id="ready-section"
              className={`w-full py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 mb-3 sm:mb-3.5 ${
                isFullyReady
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
                  : 'bg-ink-2/40 border-line/40 opacity-40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isFullyReady
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-ink-3 text-t3 border-line'
                  }`}
                >
                  {isFullyReady ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  ) : (
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex items-baseline gap-2 flex-1">
                  <h4 className="font-sans font-bold text-xs sm:text-[13px] text-t1 truncate sm:shrink-0">
                    {targetTitle}{' '}
                    {isFullyReady
                      ? 'Environment Ready · Auto-Launching'
                      : 'Configuring Environment...'}
                  </h4>
                  <p
                    className={`font-sans text-[11px] sm:text-xs truncate hidden md:block ${
                      isFullyReady ? 'text-emerald-400/90' : 'text-t3'
                    }`}
                  >
                    —{' '}
                    {isFullyReady
                      ? 'All stages verified, redirecting now...'
                      : 'Autonomous initialization in progress...'}
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full font-mono text-[10.5px] sm:text-xs font-semibold shrink-0 border transition-all ${
                  isFullyReady
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 flex items-center gap-1.5'
                    : 'bg-ink-3 text-t3 border-line/40'
                }`}
              >
                {isFullyReady ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Auto-Launching</span>
                  </>
                ) : (
                  'Setting Up...'
                )}
              </span>
            </div>

            {/* Bottom Action Row */}
            <div id="bottom-actions" className="flex items-center justify-between gap-4">
              <button
                onClick={onBack}
                className="px-4.5 py-2 rounded-full bg-ink-2 hover:bg-ink-3 border border-line text-xs font-mono text-t2 hover:text-t1 transition-all cursor-pointer shadow-xs"
              >
                ← Back to Engine Overview
              </button>

              {isFullyReady && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Launching automatically...</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default SandboxSetupView;
