import React, { useState } from 'react';
import { BackgroundGlow } from './components/layout/BackgroundGlow';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingView } from './views/LandingView';
import { SandboxSetupView } from './views/SandboxSetupView';
import { LiveSimulationModal } from './components/modals/LiveSimulationModal';
import { WORKFLOWS } from './data/workflows';
import { WorkflowItem } from './types';

// Dynamically derive trusted redirect hostnames from the configured workflows
const TRUSTED_DOMAINS = new Set<string>();
WORKFLOWS.forEach((wf) => {
  if (wf.vercelUrl) {
    try {
      TRUSTED_DOMAINS.add(new URL(wf.vercelUrl).hostname);
    } catch {
      // ignore
    }
  }
});

function isSafeRedirectUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl, window.location.origin);

    // Allow localhost/127.0.0.1 in development mode for testing
    if (import.meta.env.DEV && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) {
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    }

    // Require HTTPS strictly for external destinations
    if (parsed.protocol !== 'https:') {
      return false;
    }

    // Must match explicit whitelist or trusted Vercel subdomain
    return TRUSTED_DOMAINS.has(parsed.hostname) || parsed.hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('screen');
    return s === '2' ? 2 : 1;
  });
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('furniture');
  const [activeWorkflowModal, setActiveWorkflowModal] = useState<WorkflowItem | null>(null);

  const selectedWorkflow = WORKFLOWS.find((w) => w.id === selectedWorkflowId) || WORKFLOWS[0];

  const handleOpenDemo = () => {
    setCurrentScreen(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasOpenedRef = React.useRef(false);

  const handleCompleteSetup = () => {
    // Strictly prevent double execution
    if (hasOpenedRef.current) return;
    hasOpenedRef.current = true;
    setTimeout(() => {
      hasOpenedRef.current = false;
    }, 4000);

    const rawUrl = selectedWorkflow?.vercelUrl;
    if (rawUrl && isSafeRedirectUrl(rawUrl)) {
      try {
        const parsed = new URL(rawUrl, window.location.origin);
        parsed.searchParams.set('tour', 'true');
        parsed.searchParams.set('ref', 'sandbox');
        window.location.href = parsed.toString();
        return;
      } catch (err) {
        console.error('Failed to construct redirect URL:', err);
      }
    } else {
      console.warn('Blocked navigation: target URL failed security validation:', rawUrl);
    }
  };

  const handleBackToLanding = () => {
    setCurrentScreen(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWorkflow = (id: string) => {
    setSelectedWorkflowId(id);
    setCurrentScreen(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${currentScreen === 2 ? 'h-screen overflow-hidden' : ''} bg-ink text-t1 font-sans relative selection:bg-accent/30 selection:text-white flex flex-col justify-between overflow-x-hidden w-full max-w-full`}>
      {/* Background Ambient Drifting Globs & Grid */}
      <BackgroundGlow />

      {/* Global Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        selectedWorkflowTitle={selectedWorkflow.title}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
        onReset={() => {
          setCurrentScreen(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Flow Container */}
      <main className={`flex-1 relative z-10 ${currentScreen === 2 ? 'pt-0 flex flex-col justify-center items-center min-h-0' : 'pt-2 sm:pt-3'}`}>
        {currentScreen === 1 && (
          <LandingView
            onOpenDemo={handleOpenDemo}
            onSelectWorkflow={handleSelectWorkflow}
          />
        )}

        {currentScreen === 2 && (
          <SandboxSetupView
            workflow={selectedWorkflow}
            onComplete={handleCompleteSetup}
            onBack={handleBackToLanding}
          />
        )}
      </main>

      {/* Live Simulation Runner Modal */}
      <LiveSimulationModal
        workflow={activeWorkflowModal}
        onClose={() => setActiveWorkflowModal(null)}
      />

      {/* Global Footer */}
      <Footer compact={currentScreen === 2} />
    </div>
  );
}
