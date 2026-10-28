import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Award,
  QrCode,
  Calendar,
  Building2,
  FileCheck2
} from 'lucide-react';
import { Institution } from '../types';
import { MOCK_DOCUMENTS, MOCK_GHOST_FACULTY, MOCK_REGULATORY_RULES } from '../data/mockData';

interface ComplianceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  institution: Institution;
}

export const ComplianceReportModal: React.FC<ComplianceReportModalProps> = ({
  isOpen,
  onClose,
  institution,
}) => {
  if (!isOpen) return null;

  const docs = MOCK_DOCUMENTS[institution.id] || [];
  const rules = MOCK_REGULATORY_RULES[institution.id] || [];
  const ghostAlerts = institution.id === 'inst-3' ? MOCK_GHOST_FACULTY : institution.id === 'inst-2' ? [MOCK_GHOST_FACULTY[2]] : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Actions Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-sky-500/10 text-sky-400">
              <FileCheck2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Official Regulatory Audit Dossier Preview
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate / Dossier Content (Formal Printable Document) */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-100 bg-slate-950 font-sans print:p-0 print:bg-white print:text-black">
          {/* Official Letterhead */}
          <div className="text-center border-b-2 border-slate-700 pb-6 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              ALL INDIA COUNCIL FOR TECHNICAL EDUCATION (AICTE)
            </div>
            <div className="text-[10px] text-slate-400">
              Statutory Body of the Government of India • Ministry of Education, Nelson Mandela Marg, New Delhi
            </div>
            <h1 className="text-xl font-extrabold text-white uppercase tracking-tight pt-2">
              Automated Scrutiny & Regulatory Verification Report
            </h1>
            <div className="text-xs text-sky-400 font-mono">
              Report Ref: AICTE/VERIFY/2026/{institution.code} • Generated: {new Date().toLocaleDateString('en-IN')}
            </div>
          </div>

          {/* Institution Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Institution Name:</div>
              <div className="font-bold text-white mt-0.5">{institution.name}</div>
            </div>
            <div>
              <div className="text-slate-400">Permanent Institute ID:</div>
              <div className="font-mono font-bold text-sky-400 mt-0.5">{institution.code}</div>
            </div>
            <div>
              <div className="text-slate-400">Application Category:</div>
              <div className="font-bold text-white mt-0.5">{institution.applicationType}</div>
            </div>
            <div>
              <div className="text-slate-400">State / Region:</div>
              <div className="font-bold text-white mt-0.5">{institution.district}, {institution.state}</div>
            </div>
          </div>

          {/* AI Scrutiny Verdict */}
          <div className="p-4 rounded-xl border flex items-center justify-between gap-4 bg-slate-900/60 border-slate-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Executive Scrutiny Verdict</span>
              <div className="text-lg font-black">
                {institution.status === 'VERIFIED' ? (
                  <span className="text-emerald-400">RECOMMENDED FOR APPROVAL (100% COMPLIANT)</span>
                ) : institution.status === 'SUSPICIOUS' ? (
                  <span className="text-amber-400">CONDITIONAL HEARING / ACTION REQUIRED</span>
                ) : (
                  <span className="text-rose-400">REJECTED & FLAGGED FOR VIGILANCE INQUIRY</span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Evaluation conducted using AICTE Multi-Modal Document Authentication & Ghost Faculty Deduplication System.
              </p>
            </div>

            <div className="text-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-2xl font-black font-mono text-sky-400">{institution.overallScore}%</div>
              <div className="text-[9px] uppercase font-bold text-slate-500">Trust Score</div>
            </div>
          </div>

          {/* Section 1: Submitted Document Forensics */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              1. Document Forensic Authentication Ledger
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="py-2">Document Title</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">OCR Fidelity</th>
                    <th className="py-2">Tamper Risk</th>
                    <th className="py-2">Forensic Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {docs.map((doc) => (
                    <tr key={doc.id}>
                      <td className="py-2 font-medium text-white">{doc.title}</td>
                      <td className="py-2 text-slate-400">{doc.category}</td>
                      <td className="py-2 font-mono">{doc.ocrConfidence}%</td>
                      <td className="py-2 font-mono">
                        <span className={doc.tamperRiskScore > 40 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                          {doc.tamperRiskScore}%
                        </span>
                      </td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.status === 'VERIFIED'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : doc.status === 'FLAGGED'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Ghost Faculty Cross-Audit */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              2. Faculty Cross-Institutional Duplication Check
            </h3>
            {ghostAlerts.length === 0 ? (
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero duplicate faculty profiles found across national regulatory database.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {ghostAlerts.map((gf) => (
                  <div key={gf.id} className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-rose-300">
                      <span>Conflict: {gf.facultyName} ({gf.designation})</span>
                      <span className="font-mono text-[10px]">Aadhaar Hash: {gf.aadhaarHash}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Listed simultaneously at: {gf.institutionsInvolved.map((i) => i.institutionName).join(' AND ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: AICTE Statutory APH Norms */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              3. AICTE Approval Process Handbook (APH) Rule Compliance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {rules.map((rule) => (
                <div key={rule.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{rule.name}</span>
                    <span className={rule.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {rule.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Observed: <strong className="text-slate-200">{rule.institutionValue}</strong> (Norm: {rule.thresholdValue})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Verification Seal & Sign-off */}
          <div className="pt-6 border-t-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                <QrCode className="w-10 h-10 text-sky-400" />
              </div>
              <div>
                <div className="font-mono font-bold text-slate-300 text-[11px]">
                  VERIFY HASH: SHA256:d89f72b9a103c8e4...
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Scan QR code or query AICTE Public Ledger to confirm cryptographic validity.
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="font-serif italic text-sm text-slate-300">
                Member Secretary / Scrutiny Committee
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                All India Council for Technical Education
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
