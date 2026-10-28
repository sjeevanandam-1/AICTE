import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileSearch, 
  Users, 
  Layers, 
  ArrowRight, 
  Building, 
  MapPin, 
  Calendar,
  FileCheck2,
  FileCode2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Institution } from '../types';
import { MOCK_DOCUMENTS, MOCK_GHOST_FACULTY, MOCK_REGULATORY_RULES } from '../data/mockData';

interface OverviewDashboardProps {
  institution: Institution;
  onNavigateTab: (tab: string) => void;
  onOpenReport: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  institution,
  onNavigateTab,
  onOpenReport,
}) => {
  const docs = MOCK_DOCUMENTS[institution.id] || [];
  const rules = MOCK_REGULATORY_RULES[institution.id] || [];
  const passedRules = rules.filter((r) => r.passed).length;
  const ghostAlerts = institution.id === 'inst-3' ? MOCK_GHOST_FACULTY : institution.id === 'inst-2' ? [MOCK_GHOST_FACULTY[2]] : [];

  // Color mapping based on risk
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 40) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getStatusBadge = () => {
    if (institution.status === 'VERIFIED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED & COMPLIANT
        </span>
      );
    }
    if (institution.status === 'SUSPICIOUS') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5" /> ACTION REQUIRED / DEFICIT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
        <XCircle className="w-3.5 h-3.5" /> HIGH RISK / FRAUD DETECTED
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Institution Info & Trust Score */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {institution.code}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {institution.applicationType}
              </span>
              {getStatusBadge()}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {institution.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {institution.district}, {institution.state}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                {institution.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Submitted on {institution.submissionDate}
              </span>
            </div>
          </div>

          {/* AI Scrutiny Scorecard Ring */}
          <div className="flex items-center gap-5 bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 shadow-inner">
            <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center ${getScoreColor(institution.overallScore)}`}>
              <span className="text-2xl font-black">{institution.overallScore}%</span>
              <span className="text-[9px] uppercase tracking-wider font-bold">Trust Index</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-200">AICTE AI Evaluation</div>
              <p className="text-[11px] text-slate-400 max-w-[210px]">
                {institution.overallScore >= 80
                  ? 'High fidelity. All documents authenticated with zero red-flags.'
                  : institution.overallScore >= 40
                  ? 'Compliance deficits detected in faculty cadre and safety NOCs.'
                  : 'Critical anomalies found in legal land deeds and faculty rolls.'}
              </p>
              <button
                onClick={onOpenReport}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 mt-1 transition-colors"
              >
                <span>View Full Audit Certificate</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Regulatory Handbook Check */}
        <div 
          onClick={() => onNavigateTab('rules')}
          className="glass-panel p-5 rounded-xl border border-slate-800/80 hover:border-sky-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">APH Norms Met</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{passedRules}</span>
            <span className="text-xs text-slate-500 font-semibold">/ {rules.length} Mandated Rules</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className={passedRules === rules.length ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
              {passedRules === rules.length ? '100% Compliant' : `${rules.length - passedRules} Deficiencies`}
            </span>
            <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform flex items-center text-[11px]">
              Inspect <ArrowRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Tampering & Forensics */}
        <div 
          onClick={() => onNavigateTab('inspector')}
          className="glass-panel p-5 rounded-xl border border-slate-800/80 hover:border-sky-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Document Forensics</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              {docs.filter((d) => d.status === 'VERIFIED').length}
            </span>
            <span className="text-xs text-slate-500 font-semibold">/ {docs.length} Dossiers Clean</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className={institution.id === 'inst-3' ? 'text-rose-400 font-medium' : 'text-slate-400'}>
              {institution.id === 'inst-3' ? 'ELA Forgery Splicing Found' : 'Metadata stamps genuine'}
            </span>
            <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform flex items-center text-[11px]">
              Analyze <ArrowRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card 3: Ghost Faculty Radar */}
        <div 
          onClick={() => onNavigateTab('ghost-faculty')}
          className="glass-panel p-5 rounded-xl border border-slate-800/80 hover:border-sky-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ghost Faculty</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl font-black ${ghostAlerts.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {ghostAlerts.length}
            </span>
            <span className="text-xs text-slate-500 font-semibold">Cross-Institution Conflicts</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className={ghostAlerts.length > 0 ? 'text-rose-400 font-medium' : 'text-emerald-400 font-medium'}>
              {ghostAlerts.length > 0 ? 'Duplicate Payroll Detected' : 'Clean Aadhaar/PAN Roll'}
            </span>
            <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform flex items-center text-[11px]">
              Radar <ArrowRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card 4: AICTE Scrutiny Committee Verdict */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Approval Pathway</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-sm font-bold text-white">
              {institution.status === 'VERIFIED'
                ? 'Fast-Track EoA Grant'
                : institution.status === 'SUSPICIOUS'
                ? 'Issue Show-Cause Notice'
                : 'Refer to Vigilance Cell'}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {institution.status === 'VERIFIED'
              ? 'Autonomous approval eligible'
              : institution.status === 'SUSPICIOUS'
              ? '15 days compliance window'
              : 'Immediate physical inspection'}
          </div>
        </div>
      </div>

      {/* Main Split: Live Anomaly Alerts & AI Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Scrutiny Feed & Document Audit */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-sky-400" />
              <span>Uploaded Dossier Documents ({docs.length})</span>
            </h2>
            <button
              onClick={() => onNavigateTab('inspector')}
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>Side-by-side Forensic View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {docs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onNavigateTab('inspector')}
                className="glass-panel p-4 rounded-xl border border-slate-800/80 hover:border-sky-500/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                      {doc.category}
                    </span>
                    <span className="font-semibold text-white text-sm">{doc.title}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span className="font-mono text-[11px] text-slate-500">{doc.fileName}</span>
                    <span>•</span>
                    <span>OCR: <strong className="text-slate-300">{doc.ocrConfidence}%</strong></span>
                    <span>•</span>
                    <span>
                      Tamper Risk:{' '}
                      <strong className={doc.tamperRiskScore > 40 ? 'text-rose-400' : 'text-emerald-400'}>
                        {doc.tamperRiskScore}%
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      doc.status === 'VERIFIED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : doc.status === 'FLAGGED'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {doc.status}
                  </span>
                  <div className="text-slate-500 hover:text-sky-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Anomaly Callout Box if Issues Found */}
          {institution.flaggedIssuesCount > 0 && (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-sm font-bold text-rose-200">
                  {institution.flaggedIssuesCount} Discrepancies Require Scrutiny Officer Action
                </div>
                <p className="text-xs text-rose-300/80">
                  Automated computer vision and cross-registry verification identified inconsistencies in this dossier.
                  Review the forensic Error Level Analysis (ELA) and ghost faculty matches before approval.
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => onNavigateTab('inspector')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                  >
                    Examine Alterations
                  </button>
                  {ghostAlerts.length > 0 && (
                    <button
                      onClick={() => onNavigateTab('ghost-faculty')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                      View Ghost Faculty Map ({ghostAlerts.length})
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: AI Verification Pipeline Flow */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Multi-Stage Automated AI Pipeline</span>
            </div>

            <div className="space-y-4 relative">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-800 pointer-events-none" />

              {/* Stage 1 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold z-10">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">1. Multimodal OCR & Layout Parsing</div>
                  <div className="text-[11px] text-slate-400">
                    Tables, stamps, and structured fields parsed via PaddleOCR & LayoutLM.
                  </div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold z-10">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">2. Metadata & Digital Forensics</div>
                  <div className="text-[11px] text-slate-400">
                    EXIF creation dates, PDF software traces, and clone stamp detection.
                  </div>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold z-10">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">3. Error Level Analysis (ELA)</div>
                  <div className="text-[11px] text-slate-400">
                    Compression delta analysis exposing spliced signatures & edited acreage.
                  </div>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold z-10">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">4. Cross-Institute Deduplication</div>
                  <div className="text-[11px] text-slate-400">
                    Zero-knowledge salted Aadhaar/PAN hashing to detect moonlighting faculty.
                  </div>
                </div>
              </div>

              {/* Stage 5 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold z-10">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">5. AICTE APH Regulatory RAG</div>
                  <div className="text-[11px] text-slate-400">
                    Deterministic checks for SFR 1:15, Cadre ratio 1:2:6, and land thresholds.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={onOpenReport}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 text-sky-400" />
                <span>Download Verified Audit Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
