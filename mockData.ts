
import { IboxData } from './types';

export const MOCK_DATA: IboxData[] = [
  {
    id: 'ibox2101',
    version: '8.6.0.190',
    saUtilsVersion: '8.2.0.1-0',
    encryption: { status: 'disabled' },
    supervisor: {
      email: 'ldaniel@infinidat.com',
      tl: 'slevi@infinidat.com',
      lockingEmail: 'ldaniel@infinidat.com',
      lockingReason: 'installation',
      isLocked: true
    },
    lastEvent: {
      relative: '1 hours ago',
      timestamp: '2026-01-19 17:43:56'
    },
    capacity: {
      percentage: 0.04,
      used: '1025.28 TB'
    },
    io: [
      { protocol: 'NAS', iops: 423, throughput: '106.00 MB/s', latency: '0.287 ms' },
      { protocol: 'SAN', iops: 36095, throughput: '4.00 GB/s', latency: '41.766 ms' },
      { protocol: 'S3', iops: 0, throughput: '-', latency: '0.000 ms' }
    ],
    services: { status: 'Active', message: 'All Services Active' },
    networking: { eth: '2 X 10.0 Gbps', fc: '2 X 10.0 Gbps' },
    rmr: {
      async: { status: 'No Async' },
      syncAA: { status: 'No AA-Sync' }
    },
    upgrade: {
      path: '8.6.0.180 ==> 8.6.0.190',
      nodes: [
        { node: 'N1', time: '-' },
        { node: 'N2', time: '-' },
        { node: 'N3', time: '-' }
      ]
    },
    eventMonitor: {
      queryName: 'level=WARNING,CRITICAL',
      highestSeverity: 'WARNING',
      events: [
        { timestamp: '2026-01-19 20:01:09', level: 'WARNING', code: 'INTERNAL_CUSTOM_WARNING_EVENT', description: 'System Keepalive' }
      ]
    },
    sanity: {
      status: 'Can\'t Read',
      lastSanity: '/var/log/sa-utils/script/sanity.20260115-124038.log',
      logPath: '/var/log/sa-utils/script/sanity.20260115-124038.log'
    }
  },
  {
    id: 'ibox2531',
    version: '8.5.0.220',
    saUtilsVersion: '8.2.0.0-13',
    encryption: { status: 'disabled' },
    supervisor: {
      email: 'slevi@infinidat.com',
      tl: 'slevi@infinidat.com',
      lockingEmail: 'slevi@infinidat.com',
      lockingReason: 'mayhem',
      isLocked: true
    },
    lastEvent: {
      relative: '2 hours ago',
      timestamp: '2026-01-19 16:24:13'
    },
    capacity: {
      percentage: 70.62,
      used: '4149.39 TB'
    },
    io: [
      { protocol: 'NAS', iops: 0, throughput: '-', latency: '0.000 ms' },
      { protocol: 'SAN', iops: 46701, throughput: '366.00 MB/s', latency: '2933.632 ms' },
      { protocol: 'S3', iops: 0, throughput: '-', latency: '0.000 ms' }
    ],
    services: { status: 'Active', message: 'All Services Active' },
    networking: { eth: '2 X 10.0 Gbps', fc: '2 X 10.0 Gbps' },
    rmr: {
      async: { status: '10 Async', detail: 'No IO' },
      syncAA: { status: '9 AA-Sync', detail: '3 IO' }
    },
    upgrade: {
      path: '8.5.0.180 ==> 8.5.0.220',
      nodes: [
        { node: 'N1', time: '17.926s' },
        { node: 'N2', time: '17.932s' },
        { node: 'N3', time: '17.929s' }
      ]
    },
    eventMonitor: {
      queryName: 'level=CRITICAL',
      highestSeverity: 'NONE',
      events: []
    },
    sanity: {
      status: 'Can\'t Read',
      lastSanity: '/var/log/sa-utils/script/sanity.20250317-190159.log-20250401.gz',
      logPath: '/var/log/sa-utils/script/sanity.20250317-190159.log-20250401.gz'
    }
  },
  {
    id: 'ibox3011',
    version: '8.6.0.180',
    saUtilsVersion: '8.2.0.0-13',
    encryption: { status: 'enabled', type: 'FIPS' },
    supervisor: {
      email: 'slevi@infinidat.com',
      tl: 'slevi@infinidat.com',
      lockingEmail: 'slevi@infinidat.com',
      lockingReason: 'mayhem',
      isLocked: true
    },
    lastEvent: {
      relative: '1 hours ago',
      timestamp: '2026-01-19 18:03:10'
    },
    capacity: {
      percentage: 55.78,
      used: '765.85 TB'
    },
    io: [
      { protocol: 'NAS', iops: 99055, throughput: '786.00 MB/s', latency: '0.232 ms' },
      { protocol: 'SAN', iops: 66563, throughput: '2.00 GB/s', latency: '0.700 ms' },
      { protocol: 'S3', iops: 120, throughput: '886.00 MB/s', latency: '0.512 ms' }
    ],
    services: { status: 'Active', message: 'All Services Active' },
    networking: { eth: '2 X 10.0 Gbps', fc: '2 X 10.0 Gbps' },
    rmr: {
      async: { status: 'No Async' },
      syncAA: { status: 'No AA-Sync' }
    },
    upgrade: {
      path: '8.4.0.520 ==> 8.6.0.180',
      nodes: [
        { node: 'N1', time: '69.571s' },
        { node: 'N2', time: '69.571s' },
        { node: 'N3', time: '69.571s' }
      ]
    },
    eventMonitor: {
      queryName: 'level=WARNING',
      highestSeverity: 'INFO',
      events: [
        { timestamp: '2026-01-19 18:00:00', level: 'INFO', code: 'USER_LOGIN_SUCCESS', description: "User 'infinidat' successfully logged in" }
      ]
    },
    sanity: {
      status: 'Can\'t Read',
      lastSanity: '/var/log/sa-utils/script/sanity.20260113-095039.log',
      logPath: '/var/log/sa-utils/script/sanity.20260113-095039.log'
    }
  },
  {
    id: 'ibox3958',
    version: '8.6.0.180',
    saUtilsVersion: '8.2.0.0-13',
    encryption: { status: 'disabled' },
    supervisor: {
      email: 'alenger@infinidat.com',
      tl: 'slevi@infinidat.com',
      lockingEmail: 'ibox Not Locked',
      lockingReason: '',
      isLocked: false
    },
    lastEvent: {
      relative: '3 hours ago',
      timestamp: '2026-01-19 16:19:18'
    },
    capacity: {
      percentage: 66.23,
      used: '2050.36 TB'
    },
    io: [
      { protocol: 'NAS', iops: 4873, throughput: '119.00 MB/s', latency: '0.125 ms' },
      { protocol: 'SAN', iops: 1051, throughput: '130.00 MB/s', latency: '2.939 ms' },
      { protocol: 'S3', iops: 0, throughput: '-', latency: '0.000 ms' }
    ],
    services: { status: 'Active', message: 'All Services Active' },
    networking: { eth: '2 X 10.0 Gbps', fc: '2 X 10.0 Gbps' },
    rmr: {
      async: { status: 'No Async' },
      syncAA: { status: '25 AA-Sync', detail: 'No IO' }
    },
    upgrade: {
      path: '7.3.25.10 ==> 8.6.0.180',
      nodes: [
        { node: 'N1', time: '70.047s' },
        { node: 'N2', time: '70.050s' },
        { node: 'N3', time: '70.043s' }
      ]
    },
    eventMonitor: {
      queryName: 'level=CRITICAL',
      highestSeverity: 'CRITICAL',
      events: [
        { timestamp: '2026-01-18 11:34:28', level: 'CRITICAL', code: 'TRIE_RAM_CRIT', description: 'Trie RAM usage reached critical threshold 2%' },
        { timestamp: '2026-01-18 10:32:50', level: 'CRITICAL', code: 'SYSTEM_READ_ONLY', description: 'System moved to read-only state due to resource exhaustion' }
      ]
    },
    sanity: {
      status: 'Failed',
      hwStatus: 'Failed',
      lastSanity: '2026-01-05 08:56:13',
      logPath: '',
      relativeTime: '14 days ago'
    }
  }
];
