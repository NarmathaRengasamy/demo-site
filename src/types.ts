export interface Integration {
  key: string;
  label: string;
  color: string;
  bg: string;
  border: string;
  accent: string;
  orbLabel: string;
  icon: string;
}

export interface AgentTier {
  name: string;
  tierCode: string;
  desc: string;
  accent: string;
  visorTint: string;
  coreGlow: string;
  aura: string;
}

export interface PipelineStage {
  id: number;
  title: string;
  desc: string;
  time: string;
}

export interface WorkflowItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeType: 'active' | 'syncing';
  telemetry: string;
  desc: string;
  icon: string;
  iconColor: string;
  agents: string[];
  challenge: string;
  solution: string;
  videoTag: string;
  videoMetric: string;
  runtime: string;
  vercelUrl?: string;
  stages?: PipelineStage[];
}

export interface ProvisionStep {
  id: number;
  title: string;
  desc: string;
  time: string;
  durationMs: number;
}
