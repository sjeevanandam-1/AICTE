import React, { useState } from 'react';
import { 
  InstitutionApplication, 
  MandatoryDocRequirement 
} from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Building2, 
  Clock, 
  FileText, 
  FileCheck2, 
  ArrowRight,
  UserCheck,
  Award,
  Stamp,
  Send,
  Eye,
  Check,
  AlertOctagon,
  Sparkles
} from 'lucide-react';

interface OfficerPortalProps {
  applications: InstitutionApplication[];
  selectedAppId: string;
  onSelectApplication: (id: string) => void;
  onApproveApplication: (appId: string, remarks: string) => void;
  onIssueDeficitNotice: (appId: string, remarks: string) => void;
  onRejectApplication: (appId: string, remarks: string) => void;
  onSwitchToCollege: () => void;
}

export const OfficerPortal: React.FC<OfficerPortalProps> = ({
  applications,
  selectedAppId,
  onSelectApplication,
  onApproveApplication,
  onIssueDeficitNotice,
  onRejectApplication,
  onSwitchToCollege,
}) => {
  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];
  const [officerRemarks, setOfficerRemarks] = useState<string>('All statutory documents verified in accordance with AICTE Approval Process Handbook (APH 2024-2027). Approval recommended.');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const missingDocs = currentApp.mandatoryDocs.filter((d) => d.status === 'MISSING');
  const expiredDocs = currentApp.mandatoryDocs.filter((d) => d.status === 'UPLOADED_EXPIRED');
  const tamperedDocs = currentApp.mandatoryDocs.filter((d) => d.status === 'UPLOADED_TAMPERED');
  const validDocs = currentApp.mandatoryDocs.filter((d) => d.status === 'UPLOADED_VALID');

  const handleApprove = () => {
    onApproveApplication(currentApp.id, officerRemarks);
    setActionSuccessMsg(`Application officially APPROVED by AICTE Scrutiny Officer! Approval certificate generated with SHA-256 seal.`);
    setTimeout(() => setActionSuccessMsg(null), 5000);
  };

  const handleDeficit = () => {
    onIssueDeficitNotice(currentApp.id, officerRemarks);
    setActionSuccessMsg(`15-Day Deficit Notice officially issued to ${currentApp.collegeName}. College notification feed updated.`);
    setTimeout(() => setActionSuccessMsg(null), 5000);
  };

  const handleReject = () => {
    onRejectApplication(currentApp.id, officerRemarks);
    setActionSuccessMsg(`Application REJECTED and referred to AICTE Vigilance & Legal Cell.`);
    setTimeout(() => setActionSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Officer Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                AICTE Official Scrutiny & Approval Desk
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">
              Institutional Application Review & Final Approval Authority
            </h1>
            <p className="text-xs text-slate-400">
              Scrutiny Officer: <strong className="text-slate-200">Dr. S. K. Aggarwal</strong> (Advisor & Member Secretary, Approval Bureau, AICTE HQ New Delhi)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSwitchToCollege}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 flex items-center gap-1.5 transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>Switch to College Portal View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/60 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Main Grid: Application Queue + Officer Scrutiny Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols): Application Queue */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-bold uppercase tracking-wider">
              Pending Scrutiny Queue ({applications.length})
            </span>
            <span className="text-[10px] text-slate-500">AI CTE EoA 2026-27</span>
          </div>

          <div className="space-y-2.5">
            {applications.map((app) => {
              const isSelected = app.id === currentApp.id;
              return (
                <div
                  key={app.id}
                  onClick={() => onSelectApplication(app.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500/60 shadow-lg shadow-indigo-950/40'
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {app.collegeCode}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      app.reviewStatus === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : app.reviewStatus === 'DEFICIT_NOTICE_ISSUED'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : app.reviewStatus === 'REJECTED'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}>
                      {app.reviewStatus.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white leading-tight">
                    {app.collegeName}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>{app.district}, {app.state}</span>
                    <span className="font-bold font-mono">
                      Trust: <strong className={app.overallScore > 75 ? 'text-emerald-400' : 'text-rose-400'}>{app.overallScore}%</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Scrutiny Workspace & Decision Controls */}
        <div className="lg:col-span-8 space-y-6">
          {/* Institution Header Summary */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-slate-400">{currentApp.collegeCode}</span>
                <h2 className="text-xl font-black text-white mt-0.5">{currentApp.collegeName}</h2>
                <div className="text-xs text-slate-400 mt-1">
                  Category: {currentApp.category} • Application: {currentApp.applicationType}
                </div>
              </div>

              {/* Trust Score & Current Review Status */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Review Status</div>
                  <div className={`text-xs font-black mt-0.5 ${
                    currentApp.reviewStatus === 'APPROVED' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {currentApp.reviewStatus.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-mono ${
                  currentApp.overallScore > 75 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  <span className="text-lg font-black">{currentApp.overallScore}%</span>
                  <span className="text-[8px] uppercase">Trust</span>
                </div>
              </div>
            </div>

            {/* AI Automated Scrutiny Findings (Missing & Expired Checklist) */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>AI Automated Verification Findings</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Missing Docs Box */}
                <div className={`p-3 rounded-xl border space-y-1 ${
                  missingDocs.length > 0 ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  <div className="font-bold flex items-center justify-between">
                    <span>Mandatory Missing Documents</span>
                    <span className="font-mono">{missingDocs.length} Missing</span>
                  </div>
                  <div className="text-[11px]">
                    {missingDocs.length > 0 ? (
                      <ul className="list-disc list-inside space-y-0.5 mt-1 text-rose-300">
                        {missingDocs.map((d) => (
                          <li key={d.type}>{d.name}</li>
                        ))}
                      </ul>
                    ) : (
                      'All mandatory statutory documents submitted.'
                    )}
                  </div>
                </div>

                {/* Expired Docs Box */}
                <div className={`p-3 rounded-xl border space-y-1 ${
                  expiredDocs.length > 0 ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  <div className="font-bold flex items-center justify-between">
                    <span>Expired Certificates / NOCs</span>
                    <span className="font-mono">{expiredDocs.length} Expired</span>
                  </div>
                  <div className="text-[11px]">
                    {expiredDocs.length > 0 ? (
                      <ul className="list-disc list-inside space-y-0.5 mt-1 text-amber-300">
                        {expiredDocs.map((d) => (
                          <li key={d.type}>{d.name} (Expired on {d.expiryDate})</li>
                        ))}
                      </ul>
                    ) : (
                      'All submitted certificate validity dates are active.'
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Verification Table */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Uploaded Dossier Items Review ({validDocs.length} of {currentApp.mandatoryDocs.length} Valid)
              </div>

              <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 text-xs">
                {currentApp.mandatoryDocs.map((doc) => (
                  <div key={doc.type} className="p-3 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-white">{doc.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {doc.status === 'MISSING' ? (
                          <span className="text-rose-400 font-bold">❌ Missing Document</span>
                        ) : doc.status === 'UPLOADED_EXPIRED' ? (
                          <span className="text-amber-400 font-bold">⚠️ Expired on {doc.expiryDate}</span>
                        ) : doc.status === 'UPLOADED_TAMPERED' ? (
                          <span className="text-purple-400 font-bold">🚨 ELA Tampering Flagged (Score {doc.tamperRiskScore}%)</span>
                        ) : (
                          <span className="text-emerald-400">✓ Verified Authentic (Valid until {doc.expiryDate})</span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        doc.status === 'UPLOADED_VALID'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : doc.status === 'UPLOADED_EXPIRED'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Final Decision Authority Panel (The user requirement) */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Stamp className="w-4 h-4 text-indigo-400" />
                <span>AICTE Officer Final Statutory Determination</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">Scrutiny Officer Findings / Official Remarks:</label>
                <textarea
                  value={officerRemarks}
                  onChange={(e) => setOfficerRemarks(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter official scrutiny committee remarks..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Approve Button */}
                <button
                  onClick={handleApprove}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Award className="w-4 h-4" />
                  <span>GRANT AICTE APPROVAL (EoA)</span>
                </button>

                {/* Deficit Notice Button */}
                <button
                  onClick={handleDeficit}
                  className="py-3 px-4 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Issue 15-Day Deficit Notice</span>
                </button>

                {/* Reject Button */}
                <button
                  onClick={handleReject}
                  className="py-3 px-4 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white shadow-lg shadow-rose-700/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject & Refer to Vigilance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
