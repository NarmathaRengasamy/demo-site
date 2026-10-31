import React from 'react';
import { LogoLockup } from '../common/BrandMarks';

interface NavbarProps {
  currentScreen: number;
  selectedWorkflowTitle?: string;
  onSelectScreen: (screen: number) => void;
  onReset: () => void;
}

export function Navbar({ currentScreen, onSelectScreen, onReset }: NavbarProps) {
  const steps = [
    { num: 1, label: 'Engine' },
    { num: 2, label: 'Sandbox Setup' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-ink/80 border-b border-line transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        <LogoLockup onClick={onReset} />

        {/* Step Flow Navigation Tracker (Engine | Sandbox Setup) */}
        <nav className="flex items-center gap-1 p-1 rounded-full bg-ink-2/90 border border-line shadow-inner">
          {steps.map((step) => {
            const active = currentScreen === step.num;
            return (
              <button
                key={step.num}
                onClick={() => onSelectScreen(step.num)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-sans text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-from to-to text-[#1a0d06] shadow-md font-bold'
                    : 'text-t3 hover:text-t2 hover:bg-ink-3/80'
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#1a0d06]"></span>}
                <span>{step.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
