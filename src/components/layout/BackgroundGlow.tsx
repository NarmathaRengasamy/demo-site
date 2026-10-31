import React from 'react';

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="pf-glow-a" />
      <div className="pf-glow-b" />
      <div className="pf-grid" />
    </div>
  );
}
