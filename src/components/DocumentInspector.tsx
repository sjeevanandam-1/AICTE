import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Sliders, 
  Cpu, 
  Info,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Institution, VerificationDocument } from '../types';
import { MOCK_DOCUMENTS } from '../data/mockData';

interface DocumentInspectorProps {
  institution: Institution;
}

export const DocumentInspector: React.FC<DocumentInspectorProps> = ({ institution }) => {
  const docs = MOCK_DOCUMENTS[institution.id] || [];
  const [selectedDocId, setSelectedDocId] = useState<string>(docs[0]?.id || '');
  const [viewMode, setViewMode] = useState<'standard' | 'ela'>('standard');
  const [elaSensitivity, setElaSensitivity] = useState<number>(75);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const currentDoc = docs.find((d) => d.id === selectedDocId) || docs[0];

  if (!currentDoc) {
    return (
      <div className="glass-panel p-12 text-center rounded-2xl text-slate-400">
        No documents available for this institution dossier.
      </div>
    );
  }

  const isTampered = currentDoc.tamperRiskScore > 40;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sky-400" />
            <span>AI Forensic Document Inspection & ELA Lab</span>
          </h2>
          <p className="text-xs text-slate-400">
            Automated computer vision, compression error analysis (ELA), and metadata tampering diagnostics.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'standard'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Standard Layout View</span>
          </button>
          <button
            onClick={() => setViewMode('ela')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'ela'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Forensic ELA Heatmap</span>
            {isTampered && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Document List + Document Canvas + AI Intelligence Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (3 cols): Document Selector */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Dossier Files ({docs.length})
          </div>
          <div className="space-y-2">
            {docs.map((doc) => {
              const isSelected = doc.id === currentDoc.id;
              const hasRisk = doc.tamperRiskScore > 40;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-950/60 border-sky-500/50 shadow-lg shadow-sky-950/50'
                      : 'glass-panel border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {doc.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        doc.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : doc.status === 'FLAGGED'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-white leading-tight line-clamp-1">
                    {doc.title}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{doc.fileSize}</span>
                    <span className={hasRisk ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                      Tamper: {doc.tamperRiskScore}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Forensic Info Tip */}
          <div className="glass-panel p-3.5 rounded-xl border border-slate-800/80 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-sky-400">
              <Info className="w-4 h-4" />
              <span>How ELA Works</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Error Level Analysis (ELA) intentionally recompresses the image. Modified pixels (such as cloned rubber stamps, altered numbers, or pasted signatures) degrade at drastically different error rates than unaltered originals.
            </p>
          </div>
        </div>

        {/* Middle Column (5 cols): Interactive Document Canvas */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-slate-300">Document Visualizer</span>
            <span className="font-mono text-[11px] text-slate-500">{currentDoc.fileName}</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl min-h-[520px] flex flex-col justify-between">
            {/* Visual Header of simulated paper document */}
            <div className="p-3 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-slate-400 font-mono ml-2">Page 1 of 1 (100% Zoom)</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>PaddleOCR Engine v2.7</span>
              </div>
            </div>

            {/* Simulated Document Sheet */}
            <div className="p-6 relative flex-1 flex flex-col justify-between font-serif select-none transition-all">
              {viewMode === 'standard' ? (
                /* Standard Clean or Flagged View */
                <div className="space-y-4 bg-amber-50/5 text-slate-200 p-6 rounded-xl border border-slate-800/80 font-sans shadow-inner">
                  {/* Official Emblem & Header */}
                  <div className="text-center border-b border-slate-800 pb-4 space-y-1">
                    <div className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
                      GOVERNMENT REGULATORY DOCUMENT
                    </div>
                    <div className="text-base font-bold text-white tracking-tight">
                      {currentDoc.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Ref Code: {institution.code}-{currentDoc.id}
                    </div>
                  </div>

                  {/* Main Document Body with Interactive Bounding Boxes */}
                  <div className="space-y-3 text-xs leading-relaxed">
                    <p className="text-slate-300">
                      This is to certify that the institution named <strong className="text-white">{institution.name}</strong>, 
                      situated in <strong className="text-white">{institution.district}, {institution.state}</strong>, has submitted 
                      statutory compliance records for regulatory verification under the guidelines of AICTE APH 2024-2027.
                    </p>

                    {/* Field 1: Bounding Box Highlight */}
                    <div 
                      onMouseEnter={() => setActiveHighlight('field1')}
                      onMouseLeave={() => setActiveHighlight(null)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        currentDoc.id === 'doc-301'
                          ? 'bg-rose-500/20 border-rose-500/80 text-rose-200'
                          : currentDoc.id === 'doc-201'
                          ? 'bg-amber-500/20 border-amber-500/80 text-amber-200'
                          : 'bg-sky-500/10 border-sky-500/40 text-sky-200'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 flex items-center justify-between">
                        <span>OCR Key-Value Match</span>
                        {isTampered && <span className="font-mono text-rose-400">[TAMPERING FLAGGED]</span>}
                      </div>
                      <div className="font-mono font-bold text-sm mt-0.5">
                        {Object.entries(currentDoc.extractedFields)[0]
                          ? `${Object.entries(currentDoc.extractedFields)[0][0]}: ${Object.entries(currentDoc.extractedFields)[0][1]}`
                          : 'Extracted Property'}
                      </div>
                    </div>

                    {/* Field 2: Second Extracted Field */}
                    <div 
                      className={`p-2.5 rounded-lg border transition-all ${
                        currentDoc.id === 'doc-301'
                          ? 'bg-rose-500/20 border-rose-500/80 text-rose-200'
                          : 'bg-slate-800/80 border-slate-700/80 text-slate-300'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                        Extracted Verification Field
                      </div>
                      <div className="font-mono text-xs mt-0.5">
                        {Object.entries(currentDoc.extractedFields)[1]
                          ? `${Object.entries(currentDoc.extractedFields)[1][0]}: ${Object.entries(currentDoc.extractedFields)[1][1]}`
                          : 'Approved Authority'}
                      </div>
                    </div>

                    {/* Official Stamp & Signature Simulation */}
                    <div className="pt-6 flex items-center justify-between">
                      <div className="border border-dashed border-slate-700 p-2 rounded text-center text-[10px] text-slate-400">
                        [Official Government QR Code]
                        <div className="font-mono text-[9px] text-slate-500 mt-0.5">SHA256: 9e88...a410</div>
                      </div>

                      <div className={`text-center p-2 rounded border ${
                        currentDoc.id === 'doc-301'
                          ? 'border-rose-500/80 bg-rose-500/20 text-rose-300'
                          : 'border-slate-700 text-slate-400'
                      }`}>
                        <div className="text-[10px] font-bold uppercase tracking-wider">
                          Digital Seal / Stamp
                        </div>
                        <div className="font-mono text-[9px] mt-0.5">
                          {currentDoc.id === 'doc-301' ? '⚠️ CLONED PIXEL ARTIFACT' : '✓ Verified Cryptographic Signature'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ELA Forensic Heatmap Canvas View */
                <div className="space-y-4 bg-slate-950 text-slate-200 p-6 rounded-xl border border-slate-800 font-sans relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial-gradient from-indigo-950/40 via-slate-950 to-slate-950 pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Error Level Compression Delta (Sensitivity: {elaSensitivity}%)</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          High luminescence regions indicate differing JPEG quantization matrices.
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                        currentDoc.elaForensics.elaScore > 40 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        ELA Score: {currentDoc.elaForensics.elaScore}/100
                      </span>
                    </div>

                    {/* Forensic Heatmap Representation */}
                    <div className="relative h-64 w-full bg-slate-950 rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center">
                      {/* Dark uniform noise background representing unmodified areas */}
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />

                      {isTampered ? (
                        /* Spliced & Tampered High-Energy Glow Bounding Box */
                        <div className="relative z-10 w-3/4 p-4 rounded-xl border-2 border-rose-500 bg-rose-950/50 shadow-[0_0_35px_rgba(244,63,94,0.6)] animate-pulse">
                          <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                            <span>SPLICED CLONE DETECTED</span>
                            <span className="font-mono">Δ = +89.4 dB</span>
                          </div>
                          <p className="text-[11px] text-rose-200/90 mt-1">
                            {currentDoc.elaForensics.suspiciousDescription || 'High-frequency noise variance detected around altered numeric values and stamps.'}
                          </p>
                        </div>
                      ) : (
                        /* Clean Document Heatmap */
                        <div className="relative z-10 text-center space-y-1 p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                          <div className="text-xs font-bold text-emerald-300">Uniform Error Level Distribution</div>
                          <p className="text-[11px] text-slate-400 max-w-xs">
                            No irregular compression clusters or copy-move artifacts detected across pixel arrays.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Sensitivity Slider */}
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Forensic ELA Frequency Threshold</span>
                        <span className="font-mono text-slate-200">{elaSensitivity}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={elaSensitivity}
                        onChange={(e) => setElaSensitivity(Number(e.target.value))}
                        className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Tamper Certainty: <strong className={isTampered ? 'text-rose-400' : 'text-emerald-400'}>{currentDoc.tamperRiskScore}%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): AI Extracted Data & Forensic Diagnostics */}
        <div className="lg:col-span-4 space-y-4">
          {/* Metadata Forensics Card */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Metadata & EXIF Forensics
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                currentDoc.metadataAnalysis.anomalyDetected
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {currentDoc.metadataAnalysis.anomalyDetected ? 'EXIF Discrepancy' : 'Metadata Genuine'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Software Agent:</span>
                <span className="font-mono text-slate-200 text-right max-w-[180px] truncate">
                  {currentDoc.metadataAnalysis.softwareUsed || 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">File Created:</span>
                <span className="font-mono text-slate-200">
                  {currentDoc.metadataAnalysis.originalCreationDate}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Last Modified:</span>
                <span className="font-mono text-slate-200">
                  {currentDoc.metadataAnalysis.modifiedDate}
                </span>
              </div>

              {currentDoc.metadataAnalysis.anomalyDetails && (
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-300 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Forensic Red Flag</span>
                  </div>
                  <p>{currentDoc.metadataAnalysis.anomalyDetails}</p>
                </div>
              )}
            </div>
          </div>

          {/* Extracted Key-Value Fields */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Extracted Fields ({Object.keys(currentDoc.extractedFields).length})
              </span>
              <span className="text-[11px] font-mono text-sky-400">
                OCR: {currentDoc.ocrConfidence}%
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {Object.entries(currentDoc.extractedFields).map(([key, val]) => (
                <div key={key} className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs">
                  <div className="text-slate-400 font-medium text-[11px]">{key}</div>
                  <div className="font-mono font-bold text-slate-100 mt-0.5 break-words">
                    {String(val)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AICTE Rule Cross-Reference */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              AICTE APH Rule Mapping
            </span>
            <div className="space-y-2">
              {currentDoc.rulesChecked.map((rule) => (
                <div
                  key={rule.ruleId}
                  className={`p-2.5 rounded-lg border text-xs ${
                    rule.passed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>{rule.ruleName}</span>
                    <span className="text-[10px] font-mono opacity-80">{rule.clause}</span>
                  </div>
                  <div className="text-[11px] opacity-90 mt-1">{rule.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
