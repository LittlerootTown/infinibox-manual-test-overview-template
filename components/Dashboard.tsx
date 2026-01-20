
import React, { useState } from 'react';
import { IboxData, SystemEvent, EventQuery } from '../types';
import { MOCK_DATA } from '../mockData';

const SEVERITY_PRIORITY = {
  'CRITICAL': 1,
  'ERROR': 2,
  'WARNING': 3,
  'INFO': 4,
  'NONE': 5
};

const getHighestSeverity = (events: SystemEvent[]): IboxData['eventMonitor']['highestSeverity'] => {
  if (events.length === 0) return 'NONE';
  const levels = events.map(e => e.level);
  if (levels.includes('CRITICAL')) return 'CRITICAL';
  if (levels.includes('ERROR')) return 'ERROR';
  if (levels.includes('WARNING')) return 'WARNING';
  if (levels.includes('INFO')) return 'INFO';
  return 'NONE';
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
    {children}
  </span>
);

const Val = ({ children, className = "", title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <span className={`text-[12px] font-medium block truncate ${className}`} title={title}>
    {children}
  </span>
);

const SeverityIndicator = ({ severity }: { severity: string }) => {
  // Mapping to restricted color set: Red, Orange, Green
  if (severity === 'CRITICAL' || severity === 'ERROR') {
    return <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />;
  }
  if (severity === 'WARNING') {
    return <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />;
  }
  // For INFO or NONE/Success
  return <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />;
};

interface EventEditorModalProps {
  currentQuery: string;
  onTogglePreset: (preset: string) => void;
  onManualCreate: (code: string) => void;
  onClear: () => void;
  onClose: () => void;
  systemId: string;
}

const EventEditorModal = ({ currentQuery, onTogglePreset, onManualCreate, onClear, onClose, systemId }: EventEditorModalProps) => {
  const [manualCode, setManualCode] = useState('');

  const options = [
    'event.query level=CRITICAL',
    'event.query level=ERROR',
    'event.query level=WARNING'
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (manualCode.trim()) {
        onManualCreate(manualCode.trim());
        setManualCode('');
      }
    }
  };

  const isSelected = (opt: string) => {
    const level = opt.split('=')[1];
    return currentQuery.includes(level);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <div>
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">Event Monitoring Control</h2>
            <p className="text-slate-400 text-[10px] mono">System: {systemId}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Manual Entry Section */}
          <section>
            <Label>Create Manual Event (Press Enter)</Label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Enter Event Code..."
                value={manualCode}
                onKeyDown={handleKeyDown}
                onChange={(e) => setManualCode(e.target.value)}
                autoFocus
                className="bg-slate-950 border border-slate-700 rounded px-3 py-3 text-xs mono text-sky-400 focus:outline-none focus:border-sky-500 transition-colors w-full placeholder:text-slate-700"
              />
            </div>
          </section>

          {/* Presets Section */}
          <section>
            <Label>Query Presets (Multi-select)</Label>
            <div className="flex flex-col gap-2 mt-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onTogglePreset(opt)}
                  className={`text-left px-4 py-2.5 rounded border transition-all flex items-center justify-between group ${
                    isSelected(opt)
                      ? 'bg-sky-500/10 border-sky-500/50 text-sky-400'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  <span className="mono text-[11px]">{opt}</span>
                  {isSelected(opt) && (
                    <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Destructive Actions */}
          <section className="pt-4 border-t border-slate-800">
            <button
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 py-3 border border-rose-900/50 bg-rose-950/20 text-rose-400 hover:bg-rose-950/40 rounded transition-all text-xs font-bold uppercase tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All Events
            </button>
          </section>
        </div>

        <div className="bg-slate-950/50 px-6 py-4 text-center border-t border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Monitoring Tools • V1.3 Professional</p>
        </div>
      </div>
    </div>
  );
};

const SystemStrip = ({ ibox, onEditEvent }: { ibox: IboxData; onEditEvent: (id: string) => void }) => {
  const isLocked = ibox.supervisor.isLocked;
  const sanityFailed = ibox.sanity.status === 'Failed';
  
  // Find highest priority event for display in the "Terminal" view
  const eventsSorted = [...ibox.eventMonitor.events].sort((a, b) => 
    SEVERITY_PRIORITY[a.level] - SEVERITY_PRIORITY[b.level]
  );
  const latestEvent = eventsSorted[0];

  const handleRunSanity = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Initializing Sanity workflow for node cluster: ${ibox.id}\nStatus: Job Dispatched to Scheduler.`);
  };

  return (
    <div className={`group border-b border-slate-800 hover:bg-slate-800/30 transition-colors ${ibox.eventMonitor.highestSeverity === 'CRITICAL' ? 'bg-rose-500/5' : 'bg-slate-900/20'}`}>
      <div className="flex items-stretch min-h-[120px]">
        
        {/* COL 1: IDENTITY */}
        <div className="w-44 p-4 border-r border-slate-800 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <Val className="text-lg font-bold mono text-white leading-none">{ibox.id}</Val>
            <SeverityIndicator severity={ibox.eventMonitor.highestSeverity} />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div>
              <Label>Software Version</Label>
              <Val className="mono text-sky-400">{ibox.version}</Val>
            </div>
            <div>
              <Label>Encryption</Label>
              <Val className={`mono ${ibox.encryption.status === 'enabled' ? 'text-emerald-400' : 'text-slate-500 opacity-60'}`}>
                {ibox.encryption.status === 'enabled' ? `${ibox.encryption.type || 'Enabled'}` : 'Disabled'}
              </Val>
            </div>
          </div>
        </div>

        {/* COL 2: SUPERVISOR & LOCKING */}
        <div className={`w-56 p-4 border-r border-slate-800 flex flex-col justify-center ${isLocked ? 'bg-rose-500/5' : ''}`}>
          <div className="mb-3">
            <Label>Owner / Supervisor</Label>
            <Val className="text-slate-200">{ibox.supervisor.email}</Val>
            <Val className="text-[10px] text-slate-500">TL: {ibox.supervisor.tl}</Val>
          </div>
          <div>
            <Label>Lock Status</Label>
            {isLocked ? (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-rose-400 uppercase">LOCKED: {ibox.supervisor.lockingReason}</span>
                <span className="text-[9px] text-rose-300/60 truncate">{ibox.supervisor.lockingEmail}</span>
              </div>
            ) : (
              <span className="text-[10px] font-bold text-emerald-500 uppercase">Available</span>
            )}
          </div>
        </div>

        {/* COL 3: IO PERFORMANCE */}
        <div className="flex-1 p-4 border-r border-slate-800 bg-black/10 flex flex-col justify-center">
          <div className="flex flex-col gap-2">
            {ibox.io.map(io => (
              <div key={io.protocol} className="flex items-center gap-3 bg-slate-950/40 p-1.5 rounded-sm border border-slate-800/50">
                <span className="text-[10px] font-black text-slate-400 mono w-8">{io.protocol}</span>
                <div className="flex-1 flex items-center justify-between px-2 border-l border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-bold leading-none">Throughput</span>
                    <span className="text-[11px] text-sky-400 mono font-bold">{io.throughput}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] text-slate-500 uppercase font-bold leading-none">IOPS / Latency</span>
                    <span className="text-[11px] text-white mono">
                      {io.iops.toLocaleString()} <span className="text-slate-500">@</span> <span className={parseFloat(io.latency) > 10 ? 'text-amber-400' : 'text-emerald-400'}>{io.latency}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COL 4: RESOURCES */}
        <div className="w-52 p-4 border-r border-slate-800 flex flex-col justify-center">
          <div className="mb-3">
            <div className="flex justify-between items-end">
              <Label>Capacity Used</Label>
              <span className="text-[10px] font-bold text-slate-300">{ibox.capacity.percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div 
                className={`h-full rounded-full ${ibox.capacity.percentage > 70 ? 'bg-amber-500' : 'bg-sky-500'}`} 
                style={{ width: `${ibox.capacity.percentage}%` }}
              />
            </div>
            <Val className="text-[10px] text-slate-500 mt-1">{ibox.capacity.used}</Val>
          </div>
          <div>
            <Label>Networking</Label>
            <div className="flex gap-1">
              <div className="px-1 py-0.5 rounded bg-slate-800 text-[8px] font-bold text-slate-400 border border-slate-700">ETH: {ibox.networking.eth}</div>
              <div className="px-1 py-0.5 rounded bg-slate-800 text-[8px] font-bold text-slate-400 border border-slate-700">FC: {ibox.networking.fc}</div>
            </div>
          </div>
        </div>

        {/* COL 5: EVENT MONITORING - EDITABLE */}
        <div 
          onClick={() => onEditEvent(ibox.id)}
          className="w-72 p-4 border-r border-slate-800 flex flex-col justify-center bg-slate-950/20 cursor-pointer hover:bg-slate-950/40 transition-colors relative"
        >
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity">
            <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div className="flex justify-between items-center mb-1">
            <Label>Event Query Monitor</Label>
            <span className="text-[8px] text-slate-600 mono truncate max-w-[120px]" title={ibox.eventMonitor.queryName}>
              {ibox.eventMonitor.queryName}
            </span>
          </div>
          {latestEvent ? (
            <div className="flex flex-col gap-1.5 bg-black/40 p-2 rounded border border-slate-800/80 shadow-inner">
              <div className="flex justify-between items-center">
                <span className={`text-[9px] font-black mono px-1 rounded ${
                  latestEvent.level === 'CRITICAL' ? 'bg-rose-500 text-white animate-pulse' : 
                  latestEvent.level === 'ERROR' ? 'bg-rose-400 text-black' : 
                  latestEvent.level === 'WARNING' ? 'bg-amber-500 text-black' : 'bg-sky-500 text-white'
                }`}>
                  {latestEvent.level}
                </span>
                <span className="text-[8px] text-slate-500 mono">{latestEvent.timestamp}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-300 mono leading-none mb-0.5">{latestEvent.code}</span>
                <span className="text-[9px] text-slate-500 leading-tight line-clamp-2">{latestEvent.description}</span>
              </div>
            </div>
          ) : (
            <div className="h-12 flex items-center justify-center border border-dashed border-slate-800 rounded group-hover:border-slate-600 transition-colors">
              <span className="text-[9px] text-slate-600 uppercase font-bold">No Active Events</span>
            </div>
          )}
          <div className="mt-2 flex gap-1">
             <div className="h-0.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    ibox.eventMonitor.highestSeverity === 'CRITICAL' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 
                    ibox.eventMonitor.highestSeverity === 'ERROR' ? 'bg-rose-400' :
                    ibox.eventMonitor.highestSeverity === 'WARNING' ? 'bg-amber-400' :
                    ibox.eventMonitor.highestSeverity === 'INFO' ? 'bg-sky-400' : 'bg-slate-800'
                  }`} 
                  style={{width: ibox.eventMonitor.highestSeverity === 'NONE' ? '0%' : '100%'}} 
                />
             </div>
          </div>
        </div>

        {/* COL 6: LIFECYCLE & RMR */}
        <div className="w-64 p-4 border-r border-slate-800 flex flex-col justify-center bg-slate-950/10">
          <div className="mb-3 pb-2 border-b border-slate-800/50">
            <Label>RMR / Replication</Label>
            <div className="flex justify-between text-[10px] mb-0.5">
              <span className="text-slate-500">Async</span>
              <span className="text-slate-300 font-medium">{ibox.rmr.async.status} {ibox.rmr.async.detail && <span className="text-[8px] opacity-50">[{ibox.rmr.async.detail}]</span>}</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Sync AA</span>
              <span className="text-slate-300 font-medium">{ibox.rmr.syncAA.status}</span>
            </div>
          </div>
          <div>
            <Label>Upgrade Times</Label>
            <Val className="text-[10px] text-sky-400 mono font-bold truncate mb-1" title={ibox.upgrade.path}>{ibox.upgrade.path}</Val>
            <div className="grid grid-cols-1 gap-0.5">
              {ibox.upgrade.nodes.map(n => (
                <div key={n.node} className="flex justify-between items-center text-[10px] mono border-b border-slate-800/30 pb-0.5 last:border-0">
                  <span className="text-slate-500 font-bold">{n.node}</span>
                  <span className={`font-medium ${n.time === '-' ? 'text-slate-600 italic' : 'text-slate-300'}`}>
                    {n.time === '-' ? 'No Data' : n.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COL 7: SANITY & LOGS */}
        <div className={`flex-1 p-4 flex flex-col justify-center ${sanityFailed ? 'bg-rose-500/10' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <Label>Sanity Results</Label>
              <span className={`text-[11px] font-black uppercase ${sanityFailed ? 'text-rose-500' : 'text-emerald-500'}`}>
                {ibox.sanity.status} {ibox.sanity.hwStatus && `[HW: ${ibox.sanity.hwStatus}]`}
              </span>
            </div>
            <div className="text-right">
              <Label>Last Run</Label>
              <Val className="text-[10px] text-slate-400">{ibox.sanity.relativeTime || ibox.sanity.lastSanity.split('sanity.')[1]?.substring(0,8) || 'Unknown'}</Val>
            </div>
          </div>
          
          <button 
            onClick={handleRunSanity}
            className="mb-3 w-full py-2 bg-emerald-600/10 border border-emerald-500/40 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded hover:bg-emerald-600/20 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 group/btn"
          >
            <svg className="w-3 h-3 group-hover/btn:animate-spin-slow transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Run Sanity on {ibox.id}
          </button>

          <div className="bg-black/40 p-2 rounded border border-slate-800 group-hover:border-slate-700 transition-colors overflow-hidden">
            <Label>Log Reference Path</Label>
            <Val className="text-[9px] mono text-slate-500 break-all select-all leading-tight">
              {ibox.sanity.logPath}
            </Val>
          </div>
        </div>

      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<IboxData[]>(MOCK_DATA);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEditEvent = (id: string) => {
    setEditingId(id);
  };

  const handleTogglePreset = (preset: string) => {
    if (!editingId) return;
    const levelToToggle = preset.split('=')[1] as 'CRITICAL' | 'ERROR' | 'WARNING';
    
    setData(prev => prev.map(item => {
      if (item.id === editingId) {
        let currentLevels = item.eventMonitor.queryName === 'No Query Active' 
          ? [] 
          : item.eventMonitor.queryName.split('level=')[1]?.split(',') || [];
        
        if (currentLevels.includes(levelToToggle)) {
          currentLevels = currentLevels.filter(l => l !== levelToToggle);
        } else {
          currentLevels.push(levelToToggle);
        }

        const newQueryName = currentLevels.length > 0 
          ? `event.query level=${currentLevels.join(',')}` 
          : 'No Query Active';

        // Filter events based on active levels
        const manualEvents = item.eventMonitor.events.filter(e => e.level === 'INFO');
        const simulatedEvents: SystemEvent[] = currentLevels.map(level => ({
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          level: level as any,
          code: `MONITOR_${level}`,
          description: `Active monitoring for ${level} events.`
        }));

        const allEvents = [...simulatedEvents, ...manualEvents];

        return {
          ...item,
          eventMonitor: {
            ...item.eventMonitor,
            queryName: newQueryName,
            events: allEvents,
            highestSeverity: getHighestSeverity(allEvents)
          }
        };
      }
      return item;
    }));
  };

  const handleManualCreate = (code: string) => {
    if (!editingId) return;
    setData(prev => prev.map(item => {
      if (item.id === editingId) {
        const newEvent: SystemEvent = {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          level: 'INFO',
          code: code,
          description: 'User generated custom event.'
        };
        const allEvents = [newEvent, ...item.eventMonitor.events];
        return {
          ...item,
          eventMonitor: {
            ...item.eventMonitor,
            events: allEvents,
            highestSeverity: getHighestSeverity(allEvents)
          }
        };
      }
      return item;
    }));
    setEditingId(null);
  };

  const handleClearEvents = () => {
    if (!editingId) return;
    setData(prev => prev.map(item => {
      if (item.id === editingId) {
        return {
          ...item,
          eventMonitor: {
            ...item.eventMonitor,
            highestSeverity: 'NONE',
            events: [],
            queryName: 'No Query Active'
          }
        };
      }
      return item;
    }));
    setEditingId(null);
  };

  const editingItem = data.find(i => i.id === editingId);

  return (
    <div className="flex flex-col min-h-screen text-slate-200 selection:bg-sky-500/30">
      {/* PERSISTENT TOP HEADER */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-2xl px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-slate-900">IB</div>
            <h1 className="text-xl font-bold tracking-tighter text-white uppercase">InfiniBox <span className="text-sky-500 font-light">Overview</span></h1>
          </div>
          <nav className="flex gap-4 border-l border-slate-800 pl-6">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Team: Manual Testing</div>
            <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Systems Online: {data.length}
            </div>
          </nav>
        </div>
        <div className="flex gap-3">
          <div className="bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
            <span className="text-[9px] font-bold text-slate-600 uppercase block leading-none mb-1">Last Data Sync</span>
            <span className="text-[11px] font-medium text-slate-400 mono">2026-01-19 18:45:00</span>
          </div>
        </div>
      </header>

      {/* COLUMN HEADERS */}
      <div className="bg-slate-950/50 border-b border-slate-800 px-0 sticky top-[69px] z-40 hidden lg:block">
        <div className="flex text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] py-2">
          <div className="w-44 px-4">Identity</div>
          <div className="w-56 px-4">Ownership</div>
          <div className="flex-1 px-4">Performance Matrix</div>
          <div className="w-52 px-4">Resources</div>
          <div className="w-72 px-4">Event Monitoring</div>
          <div className="w-64 px-4">Lifecycle & RMR</div>
          <div className="flex-1 px-4">Health & Logs</div>
        </div>
      </div>

      {/* MAIN DATA FEED */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {data.map((ibox) => (
            <SystemStrip key={ibox.id} ibox={ibox} onEditEvent={handleEditEvent} />
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 p-4 text-center">
        <p className="text-[10px] text-slate-600 font-medium tracking-widest uppercase">
          Enterprise Fleet Monitoring System • Professional Manual Testing Division • Level 3 Dashboard Access
        </p>
      </footer>

      {/* MODAL */}
      {editingId && editingItem && (
        <EventEditorModal
          systemId={editingId}
          currentQuery={editingItem.eventMonitor.queryName}
          onTogglePreset={handleTogglePreset}
          onManualCreate={handleManualCreate}
          onClear={handleClearEvents}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
