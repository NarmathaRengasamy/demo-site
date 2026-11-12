import React, { useState, useEffect, useRef } from 'react';
import { WorkflowItem, PipelineStage } from '../types';
import { createDefaultStages } from '../data/workflows';
import { LaunchBlast } from '../components/visuals/LaunchBlast';

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

  const hasTriggeredBlastRef = useRef(false);

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
      <div className="fixed top-[56px] sm:top-[64px] left-0 right-0 w-full h-[3px] bg-ink-3/90 border-b border-white/10 z-40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#ff8a2b] via-[#ff6a2c] to-[#ff3d6e] transition-all duration-700 ease-out relative shadow-[0_0_16px_rgba(255,106,44,1),0_0_30px_rgba(255,61,110,0.8)]"
          style={{ width: `${Math.max(progressPercent, 5)}%` }}
        />
      </div>

      {/* Main Center Screen Container (Desktop Single Screen Fit with Zero Scrolling) */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex flex-col items-center justify-center relative select-none animate-fade-in z-10">
        {/* Soft Ambient Radial Backdrop Behind Center Panel */}
        <div
          className="absolute w-[500px] h-[350px] sm:w-[680px] sm:h-[420px] rounded-full pointer-events-none transition-all duration-700 -z-10"
          style={{
            background: isFullyReady
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(255, 106, 44, 0.12) 40%, rgba(107, 75, 255, 0.06) 70%, transparent 80%)'
              : 'radial-gradient(circle, rgba(255, 106, 44, 0.20) 0%, rgba(255, 61, 110, 0.12) 40%, rgba(107, 75, 255, 0.08) 70%, transparent 80%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Header Section */}
        <div className="w-full text-center mb-3 sm:mb-3.5">
          {/* Top Ambient Badges Row */}
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
            {/* Left Badge: PERFOX ORCHESTRATOR */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/90 border border-white/10 text-t2 font-mono text-[10.5px] sm:text-[11px] font-semibold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="tracking-wider uppercase">PERFOX ORCHESTRATOR</span>
            </div>

            {/* Right Badge: CLUSTER ONLINE / READY */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-[10.5px] sm:text-[11px] font-semibold shadow-xs">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="tracking-wider">CLUSTER ONLINE</span>
                </>
              )}
            </div>
          </div>

          {/* Header & Subtitle */}
          <h1 className="font-sans font-bold text-2xl sm:text-[28px] text-t1 tracking-tight leading-snug">
            {isFullyReady ? (
              <>
                Your <span className="pf-grad-text">{targetTitle}</span> sandbox is{' '}
                <span className="pf-grad-text">ready!</span>
              </>
            ) : (
              <>
                Initializing <span className="pf-grad-text">{targetTitle}</span> Demo
              </>
            )}
          </h1>
          <p className="font-sans text-xs sm:text-[13px] text-t2 leading-relaxed mt-1 max-w-xl mx-auto">
            {isFullyReady
              ? 'All autonomous agents and pipeline guardrails verified. Redirecting live...'
              : 'Configuring domain actions, specialist agents, and verification guardrails.'}{' '}
            Zero manual config required.
          </p>
        </div>

        {/* Main Console Box containing the 6 Points */}
        <div className="w-full bg-ink-1/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3 sm:p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-20px_rgba(255,106,44,0.12)]">
          <div className="space-y-1.5 sm:space-y-2">
            {stages.map((stage) => {
              const isDone = stage.id <= completedCount;
              const isCurrent = stage.id === completedCount + 1;

              return (
                <div
                  id={`stage-${stage.id}`}
                  key={stage.id}
                  className={`w-full py-2 px-3 sm:px-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 select-none ${
                    isCurrent
                      ? 'bg-gradient-to-r from-accent/15 via-ink-2/95 to-ink-2/90 border-accent/60 shadow-[0_0_20px_rgba(255,106,44,0.16)] ring-1 ring-accent/30'
                      : isDone
                      ? 'bg-ink-2/60 border-emerald-500/20'
                      : 'bg-ink-2/20 border-white/[0.03] opacity-40'
                  }`}
                >
                  {/* Left Node & Text */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Status Circle Node */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-mono transition-all ${
                        isDone
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                          : isCurrent
                          ? 'bg-gradient-to-br from-[#ff8a2b] to-[#ff3d6e] text-[#1a0d06] font-bold shadow-[0_0_14px_rgba(255,106,44,0.65)] ring-2 ring-accent/30 animate-pulse'
                          : 'bg-ink-3/80 border border-white/10 text-t3/60'
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
                        <span className="text-[11px] font-bold">{stage.id}</span>
                      )}
                    </div>

                    {/* Title & Description inline */}
                    <div className="min-w-0 flex-1 flex items-baseline gap-2 overflow-hidden">
                      <h3
                        className={`font-sans text-xs sm:text-[13px] leading-tight transition-colors truncate shrink-0 ${
                          isCurrent
                            ? 'text-t1 font-bold'
                            : isDone
                            ? 'text-t1/90 font-medium'
                            : 'text-t3/70 font-normal'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <span className="text-t3/30 hidden md:inline text-xs">•</span>
                      <p className="font-sans text-[11px] sm:text-xs text-t3/80 leading-tight truncate hidden md:block">
                        {stage.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Status Pill / Timing */}
                  <div className="shrink-0 flex items-center">
                    {isDone ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-semibold">
                        <svg
                          className="w-3 h-3 text-emerald-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{stage.time}</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-accent/15 border border-accent/40 text-accent font-mono text-[10.5px] sm:text-[11px] font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping shrink-0" />
                        <span>Verifying...</span>
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] text-t3/40 px-2 py-0.5">
                        {stage.time}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Status Ribbon inside Console Card */}
          <div
            className={`mt-2.5 pt-2.5 border-t transition-all duration-300 flex items-center justify-between text-xs font-mono ${
              isFullyReady
                ? 'border-emerald-500/30 text-emerald-400'
                : 'border-white/[0.06] text-t3'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isFullyReady ? 'bg-emerald-400 animate-ping' : 'bg-accent animate-pulse'
                }`}
              />
              <span className="text-[11px] sm:text-xs truncate">
                {isFullyReady
                  ? `${targetTitle} environment armed & verified · Redirecting now...`
                  : 'Deploying autonomous agents & synthetic feeds · Zero config required'}
              </span>
            </div>

            <span
              className={`text-[10.5px] sm:text-[11px] font-semibold shrink-0 ml-2 ${
                isFullyReady ? 'text-emerald-400' : 'text-t3/60'
              }`}
            >
              {isFullyReady ? 'Status: 100% Ready' : `Elapsed: ~${(completedCount * 0.4).toFixed(1)}s`}
            </span>
          </div>
        </div>

        {/* Actions Bar below Console */}
        <div className="w-full flex items-center justify-between gap-4 mt-3 sm:mt-3.5 px-1">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink-2 hover:bg-ink-3 border border-line text-xs font-mono text-t2 hover:text-t1 transition-all cursor-pointer shadow-xs"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>

          {isFullyReady && (
            <button
              onClick={handleBlastDone}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-from to-to text-[#1a0d06] text-xs font-bold font-sans hover:opacity-90 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,106,44,0.4)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#1a0d06] animate-ping" />
              <span>Launch Demo Now →</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default SandboxSetupView;
