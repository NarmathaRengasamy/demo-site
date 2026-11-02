import React from 'react';

interface FooterProps {
  compact?: boolean;
}

export function Footer({ compact = false }: FooterProps) {
  return (
    <footer className={`relative z-10 border-t border-line bg-ink-1 text-center font-mono text-t3 ${compact ? 'py-2 sm:py-2.5 text-[11px]' : 'py-6 text-xs'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p>© 2026 Perfox, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
