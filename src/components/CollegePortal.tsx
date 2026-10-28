import React, { useState, useRef } from 'react';
import { 
  InstitutionApplication, 
  MandatoryDocRequirement, 
  MandatoryDocType 
} from '../types';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  UploadCloud, 
  FileText, 
  Calendar, 
  Bell, 
  ShieldAlert, 
  Clock, 
  ArrowRight,
  Send,
  Sparkles,
  FileCheck2,
  Check,
  AlertCircle,
  FileUp,
  RefreshCw
} from 'lucide-react';

interface CollegePortalProps {
  application: InstitutionApplication;
  onUpdateApplication: (updatedApp: InstitutionApplication) => void;
  onSwitchToOfficer: () => void;
}

export const CollegePortal: React.FC<CollegePortalProps> = ({
  application,
  onUpdateApplication,
  onSwitchToOfficer,
}) => {
  const [activeUploadDoc, setActiveUploadDoc] = useState<MandatoryDocRequirement | null>(null);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats
  const missingDocs = application.mandatoryDocs.filter((d) => d.status === 'MISSING');
  const expiredDocs = application.mandatoryDocs.filter((d) => d.status === 'UPLOADED_EXPIRED');
  const tamperedDocs = application.mandatoryDocs.filter((d) => d.status === 'UPLOADED_TAMPERED');
  const validDocs = application.mandatoryDocs.filter((d) => d.status === 'UPLOADED_VALID');

  const hasIssues = missingDocs.length > 0 || expiredDocs.length > 0 || tamperedDocs.length > 0;

  // Trigger file selection
  const handleOpenUpload = (doc: MandatoryDocRequirement) => {
    setActiveUploadDoc(doc);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Process file upload (either real file chosen or 1-click test simulation)
  const processDocumentUpload = (customFileName?: string) => {
    if (!activeUploadDoc) return;
    const doc = activeUploadDoc;

    setIsSimulatingUpload(true);
    setUploadProgress(20);

    setTimeout(() => setUploadProgress(65), 400);

    setTimeout(() => {
      setUploadProgress(100);
      setIsSimulatingUpload(false);

      const fileNameToUse = customFileName || `${doc.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 24)}_Verified_2026.pdf`;

      // Update doc to valid
      const updatedDocs = application.mandatoryDocs.map((item) => {
        if (item.type === doc.type) {
          return {
            ...item,
            status: 'UPLOADED_VALID' as const,
            fileName: fileNameToUse,
            fileSize: '3.2 MB',
            uploadDate: 'Just now (AI Verified)',
            expiryDate: '2028-06-30',
            isExpired: false,
            daysExpiredOrLeft: 600,
            tamperRiskScore: 2,
            ocrConfidence: 99.4,
            aiMessage: '✓ Verified Genuine: AI automatic OCR & metadata scrutiny passed with zero anomalies.'
          };
        }
        return item;
      });

      // Recalculate score based on proportion of valid docs
      const newValidCount = updatedDocs.filter((d) => d.status === 'UPLOADED_VALID').length;
      const newScore = Math.min(99, Math.round((newValidCount / updatedDocs.length) * 100));

      const newNotifications = [
        {
          id: `notif-${Date.now()}`,
          title: `Document AI Verified: ${doc.name}`,
          message: 'OCR fidelity is 99.4%, metadata is genuine, and validity date is active through 2028.',
          type: 'success' as const,
          timestamp: 'Just now',
          relatedDoc: doc.name
        },
        ...application.notifications
      ];

      onUpdateApplication({
        ...application,
        mandatoryDocs: updatedDocs,
        overallScore: newScore,
        notifications: newNotifications,
      });

      setActiveUploadDoc(null);
    }, 900);
  };

  // Submit to AICTE Officer
  const handleSubmitToOfficer = () => {
    onUpdateApplication({
      ...application,
      reviewStatus: 'SUBMITTED_TO_AICTE',
      submissionDate: new Date().toISOString().split('T')[0],
      notifications: [
        {
          id: `submit-${Date.now()}`,
          title: 'Application Dossier Submitted to AICTE Scrutiny Desk',
          message: 'Your 10 statutory documents have been routed to AICTE Central Scrutiny Officer for final approval seal.',
          type: 'info' as const,
          timestamp: 'Just now'
        },
        ...application.notifications
      ]
    });
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Native File Browser */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg,.tiff"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            processDocumentUpload(e.target.files[0].name);
          }
        }}
      />

      {/* College Identity & Review Status Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
                INSTITUTE PORTAL
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {application.collegeCode}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-medium">
                {application.applicationType}
              </span>

              {/* Status Badge */}
              {application.reviewStatus === 'APPROVED' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AICTE APPROVAL GRANTED
                </span>
              ) : application.reviewStatus === 'DEFICIT_NOTICE_ISSUED' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <AlertTriangle className="w-3.5 h-3.5" /> 15-DAY DEFICIT NOTICE ISSUED BY OFFICER
                </span>
              ) : application.reviewStatus === 'REJECTED' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  <XCircle className="w-3.5 h-3.5" /> APPLICATION REJECTED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  <Clock className="w-3.5 h-3.5" /> SUBMITTED FOR AICTE REVIEW
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {application.collegeName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span>Login: <strong className="text-slate-200 font-mono">{application.loginId}</strong></span>
              <span>•</span>
              <span>Region: <strong className="text-slate-200">{application.district}, {application.state}</strong></span>
              <span>•</span>
              <span>Intake: <strong className="text-slate-200">{application.totalStudents} Students</strong> ({application.totalFaculty} Faculty)</span>
            </div>
          </div>

          {/* Quick Notification Bell + Switch to Officer Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-sky-500/50 transition-all"
            >
              <Bell className="w-5 h-5 text-sky-400" />
              {application.notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                  {application.notifications.length}
                </span>
              )}
            </button>

            <button
              onClick={onSwitchToOfficer}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
            >
              <span>View as AICTE Scrutiny Officer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Official Approved Celebration Banner if Approved */}
      {application.reviewStatus === 'APPROVED' && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border-2 border-emerald-500/60 shadow-2xl space-y-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">CONGRATULATIONS! AICTE APPROVAL GRANTED</h3>
              <p className="text-xs text-emerald-300">
                AICTE Scrutiny Officer has approved all 10 statutory certificates and issued the official Extension of Approval (EoA).
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
              <div className="text-[10px] text-slate-500">Approving Officer</div>
              <div className="font-bold text-white mt-0.5">{application.officerDecision?.officerName || 'Dr. S. K. Aggarwal'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
              <div className="text-[10px] text-slate-500">Decision Date</div>
              <div className="font-bold text-white mt-0.5">{application.officerDecision?.decisionDate || '2026-10-28'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
              <div className="text-[10px] text-slate-500">Digital Seal Hash</div>
              <div className="font-bold text-emerald-400 mt-0.5 truncate">{application.officerDecision?.approvalCertificateHash || 'SHA256:d89f72b9a103...'}</div>
            </div>
          </div>
        </div>
      )}

      {/* AI Automatic Diagnostic Warnings Callout (Missing / Expired / Tampered) */}
      {hasIssues && application.reviewStatus !== 'APPROVED' && (
        <div className="p-5 rounded-2xl bg-amber-950/20 border-2 border-amber-500/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>AI Automatic Pre-Check: {missingDocs.length + expiredDocs.length + tamperedDocs.length} Action Items Required</span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">
              {validDocs.length} of {application.mandatoryDocs.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Missing Box */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-rose-400 flex items-center justify-between">
                <span>❌ Missing Documents ({missingDocs.length})</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {missingDocs.length > 0
                  ? missingDocs.map((d) => d.name.replace(/^\d+\.\s*/, '')).join(', ')
                  : 'All 10 documents submitted.'}
              </p>
            </div>

            {/* Expired Box */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400 flex items-center justify-between">
                <span>⏳ Expired Certificates ({expiredDocs.length})</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {expiredDocs.length > 0
                  ? expiredDocs.map((d) => `${d.name.replace(/^\d+\.\s*/, '')} (Expired on ${d.expiryDate})`).join(', ')
                  : 'All validity dates active.'}
              </p>
            </div>

            {/* Tampering Box */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-purple-400 flex items-center justify-between">
                <span>🚨 AI Tamper Red Flags ({tamperedDocs.length})</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {tamperedDocs.length > 0
                  ? tamperedDocs.map((d) => d.name.replace(/^\d+\.\s*/, '')).join(', ')
                  : 'Zero forgeries detected.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer */}
      {showNotificationDrawer && (
        <div className="glass-panel p-5 rounded-2xl border border-sky-500/30 shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-sky-400" />
              <span>Real-Time Notifications & AI Scrutiny Alerts ({application.notifications.length})</span>
            </span>
            <button
              onClick={() => setShowNotificationDrawer(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {application.notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-xl border text-xs space-y-1 ${
                  notif.type === 'danger'
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    : notif.type === 'warning'
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : notif.type === 'success'
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{notif.title}</span>
                  <span className="text-[10px] opacity-75 font-mono">{notif.timestamp}</span>
                </div>
                <p className="text-[11px] opacity-90">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Upload Progress Indicator */}
      {isSimulatingUpload && activeUploadDoc && (
        <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/50 shadow-2xl space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-sky-300">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
              <span>Uploading & Scanning: {activeUploadDoc.name}...</span>
            </span>
            <span className="font-mono">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-sky-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      {/* Mandatory Statutory 10 Documents Checklist Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl space-y-4">
        <div className="p-5 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-sky-400" />
              <span>AICTE Approval Statutory Dossier: 10 Mandatory Documents</span>
            </h2>
            <p className="text-xs text-slate-400">
              Each certificate is scanned for expiration dates, OCR text extraction, tampering, and AICTE APH compliance.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-300 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
            Dossier Readiness:{' '}
            <strong className="text-emerald-400 font-mono text-sm">{validDocs.length}</strong> / {application.mandatoryDocs.length} Compliant
          </div>
        </div>

        {/* 10 Document Rows */}
        <div className="divide-y divide-slate-800/80">
          {application.mandatoryDocs.map((doc) => {
            const isMissing = doc.status === 'MISSING';
            const isExpired = doc.status === 'UPLOADED_EXPIRED';
            const isTampered = doc.status === 'UPLOADED_TAMPERED';
            const isValid = doc.status === 'UPLOADED_VALID';

            return (
              <div
                key={doc.type}
                className={`p-4 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  isMissing
                    ? 'bg-rose-950/10 hover:bg-rose-950/20'
                    : isExpired
                    ? 'bg-amber-950/10 hover:bg-amber-950/20'
                    : isTampered
                    ? 'bg-purple-950/10 hover:bg-purple-950/20'
                    : 'hover:bg-slate-900/40'
                }`}
              >
                {/* Doc Name & Category */}
                <div className="space-y-1 lg:max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {doc.category}
                    </span>
                    <span className="text-sm font-bold text-white">{doc.name}</span>

                    {/* Status Pill */}
                    {isValid && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Check className="w-3 h-3" /> VERIFIED & ACTIVE
                      </span>
                    )}
                    {isExpired && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> EXPIRED
                      </span>
                    )}
                    {isMissing && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> MISSING
                      </span>
                    )}
                    {isTampered && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> FORGERY DETECTED
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400">{doc.description}</p>

                  {/* AI Message / Finding */}
                  {doc.aiMessage && (
                    <div className={`text-xs font-medium p-2 rounded-lg mt-1 ${
                      isValid
                        ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/20'
                        : isExpired
                        ? 'bg-amber-950/30 text-amber-300 border border-amber-500/30'
                        : isMissing
                        ? 'bg-rose-950/30 text-rose-300 border border-rose-500/30'
                        : 'bg-purple-950/30 text-purple-300 border border-purple-500/30'
                    }`}>
                      {doc.aiMessage}
                    </div>
                  )}
                </div>

                {/* File Details & Upload / Replace Button */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between lg:justify-end">
                  {!isMissing && (
                    <div className="text-right text-xs">
                      <div className="font-mono text-slate-200 truncate max-w-[200px]">{doc.fileName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Expiry: <span className={doc.isExpired ? 'text-rose-400 font-bold' : 'text-slate-300'}>{doc.expiryDate}</span>
                      </div>
                    </div>
                  )}

                  {/* Upload / Replace Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenUpload(doc)}
                      disabled={isSimulatingUpload}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                        isMissing
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                          : isExpired
                          ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                          : isTampered
                          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{isMissing ? 'Upload Document' : isExpired ? 'Upload Renewal NOC' : 'Re-upload / Replace'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Submission Bar */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {hasIssues ? (
              <span className="text-amber-400 font-medium flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Upload all 10 compliant documents above before submitting to the AICTE Scrutiny Officer.
              </span>
            ) : (
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                All 10 documents are 100% verified, active, and compliant with AICTE APH norms.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmitToOfficer}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Submit Dossier to AICTE Officer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
