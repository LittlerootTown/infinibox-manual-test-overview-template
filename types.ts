
export interface IOMetrics {
  protocol: 'NAS' | 'SAN' | 'S3';
  iops: number;
  throughput: string;
  latency: string;
}

export interface NodeUpgradeTime {
  node: string;
  time: string;
}

export interface SystemEvent {
  timestamp: string;
  level: 'CRITICAL' | 'ERROR' | 'WARNING' | 'INFO';
  code: string;
  description: string;
}

export interface EventQuery {
  queryName: string;
  highestSeverity: 'CRITICAL' | 'ERROR' | 'WARNING' | 'INFO' | 'NONE';
  events: SystemEvent[];
}

export interface IboxData {
  id: string;
  version: string;
  saUtilsVersion: string;
  encryption: {
    status: 'enabled' | 'disabled';
    type?: string;
  };
  supervisor: {
    email: string;
    tl: string;
    lockingEmail: string;
    lockingReason: string;
    isLocked: boolean;
  };
  lastEvent: {
    relative: string;
    timestamp: string;
  };
  capacity: {
    percentage: number;
    used: string;
  };
  io: IOMetrics[];
  services: {
    status: 'Active' | 'Warning' | 'Error';
    message: string;
  };
  networking: {
    eth: string;
    fc: string;
  };
  rmr: {
    async: { status: string; detail?: string };
    syncAA: { status: string; detail?: string };
  };
  upgrade: {
    path: string;
    nodes: NodeUpgradeTime[];
  };
  eventMonitor: EventQuery;
  sanity: {
    status: 'Success' | 'Failed' | 'Warning' | 'Can\'t Read';
    hwStatus?: string;
    lastSanity: string;
    logPath: string;
    relativeTime?: string;
  };
}
