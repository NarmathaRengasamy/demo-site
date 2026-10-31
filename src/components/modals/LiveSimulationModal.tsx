import React, { useState, useEffect } from 'react';
import { WorkflowItem } from '../../types';
import { IconBolt, IconCheck, IconTerminal } from '../common/Icons';

interface LiveSimulationModalProps {
  workflow: WorkflowItem | null;
  onClose: () => void;
}

interface StepLog {
  agent: string;
  action: string;
  time: string;
  status: 'done' | 'active' | 'pending';
  meta: string;
}

export function LiveSimulationModal({ workflow, onClose }: LiveSimulationModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    if (!workflow) return;
    setStepIndex(0);
    setIsResolved(false);

    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= 4) {
          setIsResolved(true);
          clearInterval(timer);
          return 4;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [workflow]);

  if (!workflow) return null;

  const logs: StepLog[] = [
    {
      agent: workflow.agents[0] || 'Research',
      action: `Ingested customer query & indexed ${workflow.title} policies`,
      time: '0.6s',
      status: stepIndex >= 0 ? 'done' : 'pending',
      meta: '4 grounded citations retrieved from workspace storage',
    },
    {
      agent: workflow.agents[1] || 'Draft',
      action: 'Synthesizing verified domain plan and checking inventory sync',
      time: '1.4s',
      status: stepIndex > 1 ? 'done' : stepIndex === 1 ? 'active' : 'pending',
      meta: '0 human friction detected · API connectors ready',
    },
    {
      agent: workflow.agents[2] || 'Verify',
      action: 'Executing policy verification and safety guardrails check',
      time: '2.2s',
      status: stepIndex > 2 ? 'done' : stepIndex === 2 ? 'active' : 'pending',
      meta: 'SOC2 Type II compliance matrix passed (0 violations)',
    },
    {
      agent: 'Human-in-the-Loop',
      action: 'Evaluated approval threshold (Autonomous Pass)',
      time: '2.8s',
      status: stepIndex > 3 ? 'done' : stepIndex === 3 ? 'active' : 'pending',
      meta: 'Dispatched response through live webhooks & CRM',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-card bg-gradient-to-b from-ink-2 to-ink-1 border border-line shadow-console overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Window Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-ink/40">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse"></span>
            <div>
              <h3 className="font-sans font-bold text-base text-t1 flex items-center gap-2">
                <span>{workflow.title}</span>
                <span className="text-xs font-mono text-accent bg-accent/15 px-2 py-0.5 rounded border border-accent/30">
                  LIVE RUN #4827
                </span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-ink-3 hover:bg-ink-4 text-t2 hover:text-t1 flex items-center justify-center border border-line transition-all"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Query Callout */}
          <div className="p-4 rounded-xl bg-ink/70 border border-line">
            <div className="flex items-center justify-between text-[11px] font-mono text-t3 mb-2">
              <span className="flex items-center gap-1.5">
                <IconBolt className="w-3.5 h-3.5 text-accent" />
                SIMULATED INCOMING WORKFLOW
              </span>
              <span className="text-emerald-400 font-semibold">Latency 0.3s</span>
            </div>
            <p className="font-sans text-sm text-t1 leading-relaxed">
              &quot;Automate end-to-end task resolution for {workflow.title} with full citations, inventory checks, and live audit telemetry.&quot;
            </p>
          </div>

          {/* Execution Steps */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase text-t3 font-bold block">
              Multi-Agent Orchestration Trace
            </span>

            {logs.map((log, i) => (
              <div
                key={i}
                className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all ${
                  log.status === 'done'
                    ? 'bg-ink-2/60 border-line'
                    : log.status === 'active'
                    ? 'bg-ink-2 border-accent/50 shadow-sm'
                    : 'bg-ink-1/30 border-line/20 opacity-40'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono ${
                    log.status === 'done'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : log.status === 'active'
                      ? 'bg-accent/20 text-accent border border-accent/40 animate-spin'
                      : 'bg-ink-3 text-t3 border border-line'
                  }`}
                >
                  {log.status === 'done' ? (
                    <IconCheck className="w-3.5 h-3.5" />
                  ) : log.status === 'active' ? (
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-accent border-t-transparent animate-spin"></span>
                  ) : (
                    i + 1
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans font-bold text-xs text-t1">
                      {log.agent} <span className="font-mono text-[10px] text-t3 font-normal">agent</span>
                    </span>
                    <span className="font-mono text-[11px] text-t3">{log.time}</span>
                  </div>
                  <p className="font-sans text-xs text-t2 mt-0.5">{log.action}</p>
                  <p className="font-mono text-[10px] text-t3 mt-1">{log.meta}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Resolution Ribbon */}
          {isResolved && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-emerald-400 text-xs font-mono animate-fade-in">
              <span className="flex items-center gap-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                RESOLVED END-TO-END · ZERO ERRORS
              </span>
              <span className="text-t1 font-bold">Total: 3.1s</span>
            </div>
          )}
        </div>

        {/* Modal Window Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-line bg-ink/60">
          <span className="font-mono text-xs text-t3 flex items-center gap-1.5">
            <IconTerminal className="w-3.5 h-3.5 text-accent" />
            Sandbox Cluster-09 OK
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full pf-btn-primary font-sans font-bold text-xs shadow-sm cursor-pointer"
          >
            Close Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
