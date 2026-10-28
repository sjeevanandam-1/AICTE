import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  Building2, 
  ShieldAlert, 
  CreditCard, 
  Briefcase, 
  Calendar, 
  ExternalLink,
  Search,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { Institution, GhostFacultyAlert } from '../types';
import { MOCK_GHOST_FACULTY } from '../data/mockData';

interface GhostFacultyRadarProps {
  institution: Institution;
}

export const GhostFacultyRadar: React.FC<GhostFacultyRadarProps> = ({ institution }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<GhostFacultyAlert | null>(
    institution.id === 'inst-3' ? MOCK_GHOST_FACULTY[0] : null
  );

  // Filters
  const relevantAlerts =
    institution.id === 'inst-3'
      ? MOCK_GHOST_FACULTY
      : institution.id === 'inst-2'
      ? [MOCK_GHOST_FACULTY[2]]
      : [];

  const filteredAlerts = relevantAlerts.filter(
    (a) =>
      a.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Users className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-white">
                Ghost Faculty & Cross-Institution Deduplication Radar
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Cross-verifying faculty payroll rolls against AICTE National Faculty Database using salted SHA-256 Aadhaar hashes and PAN records to eliminate multi-college moonlighting.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
              National Database: 482,190 Faculty Records
            </span>
          </div>
        </div>
      </div>

      {/* If Clean Institution */}
      {relevantAlerts.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl border border-emerald-500/30 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Zero Faculty Duplications Detected</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              All {institution.totalFaculty} faculty members listed in the submitted payroll register have unique Aadhaar/PAN cryptographic signatures with no concurrent appointments across any Indian university.
            </p>
          </div>
          <div className="pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Verified 100% Genuine Teaching Roster
            </span>
          </div>
        </div>
      ) : (
        /* Alerts Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 cols): Conflict Alert Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Flagged Faculty Profiles ({filteredAlerts.length})</span>
              </span>
              <span>AICTE Anti-Fraud Directive</span>
            </div>

            <div className="space-y-3">
              {filteredAlerts.map((alert) => {
                const isSelected = selectedAlert?.id === alert.id;
                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-950/50'
                        : 'glass-panel border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-white">{alert.facultyName}</div>
                        <div className="text-xs text-slate-400">{alert.designation}</div>
                        <div className="text-[11px] text-sky-400 font-medium mt-0.5">{alert.department}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {alert.severity}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                      <div>Aadhaar: <span className="text-slate-200">{alert.aadhaarHash}</span></div>
                      <div>PAN: <span className="text-slate-200">{alert.panNumber}</span></div>
                    </div>

                    <div className="mt-2 text-[11px] text-amber-300/90 font-medium">
                      Simultaneously drawing salary from {alert.institutionsInvolved.length} colleges!
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 cols): Cross-Institution Network Visualization */}
          <div className="lg:col-span-7 space-y-4">
            {selectedAlert ? (
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      Concurrent Employment Audit
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{selectedAlert.facultyName}</h3>
                    <p className="text-xs text-slate-400">{selectedAlert.designation} • {selectedAlert.department}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {selectedAlert.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Conflict Institutions Comparison */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Overlapping Institutional Appointments:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedAlert.institutionsInvolved.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                          <div className="font-bold text-xs text-white line-clamp-1">
                            {item.institutionName}
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                            <span>Designation: <strong className="text-slate-200">{item.role}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                            <span>Salary: <strong className="text-emerald-400 font-mono">{item.reportedSalary}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>Duration: <strong className="text-amber-300">{item.overlapPeriod}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regulatory Impact Analysis */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Regulatory Actionable Violation</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Under AICTE Approval Process Handbook (Chapter VII, Clause 7.1), full-time teaching faculty may not accept concurrent remuneration or maintain formal faculty status at any other technical institution without explicit Council exemption.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors">
                    Issue AICTE Show-Cause Notice
                  </button>
                  <button className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors">
                    Freeze Faculty Profile in National Portal
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-12 text-center rounded-2xl text-slate-400">
                Select a faculty alert from the left list to review detailed cross-institutional conflict timelines.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
