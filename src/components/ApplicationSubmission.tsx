import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileCheck, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Institution, VerificationDocument } from '../types';

interface ApplicationSubmissionProps {
  institution: Institution;
  onDocumentAdded?: (newDoc: VerificationDocument) => void;
  onNavigateTab: (tab: string) => void;
}

export const ApplicationSubmission: React.FC<ApplicationSubmissionProps> = ({
  institution,
  onDocumentAdded,
  onNavigateTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Safety & Fire' | 'Land & Legal' | 'Faculty Ledger' | 'Building & Infrastructure'>('Safety & Fire');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [completedScan, setCompletedScan] = useState<VerificationDocument | null>(null);

  // Preset file templates for quick 1-click test
  const quickTestFiles = [
    {
      category: 'Safety & Fire',
      title: 'State Fire Department Renewal NOC',
      fileName: 'Fire_NOC_Test_Upload.pdf',
      simulatedOutcome: 'VERIFIED',
      tamperScore: 3,
    },
    {
      category: 'Land & Legal',
      title: 'Collector Office Land Deed (Suspect Stamp)',
      fileName: 'Collector_Land_Record_Altered.pdf',
      simulatedOutcome: 'FLAGGED',
      tamperScore: 84,
    },
    {
      category: 'Faculty Ledger',
      title: 'Faculty Aadhaar & Salary Declaration 2026',
      fileName: 'Faculty_Pay_Register_Conflict.pdf',
      simulatedOutcome: 'FLAGGED',
      tamperScore: 68,
    }
  ];

  const handleSimulateScan = (testFile: typeof quickTestFiles[0]) => {
    setIsProcessing(true);
    setCompletedScan(null);
    setProgressPercent(10);
    setProcessingStage('Stage 1/4: Multimodal Layout Parsing & High-Res OCR...');

    setTimeout(() => {
      setProgressPercent(40);
      setProcessingStage('Stage 2/4: Error Level Analysis (ELA) & EXIF Clone Scan...');
    }, 700);

    setTimeout(() => {
      setProgressPercent(75);
      setProcessingStage('Stage 3/4: Zero-Knowledge Aadhaar / PAN Cross-Registry Query...');
    }, 1400);

    setTimeout(() => {
      setProgressPercent(95);
      setProcessingStage('Stage 4/4: Evaluating AICTE APH 2024-27 Clause Compliance...');
    }, 2000);

    setTimeout(() => {
      setIsProcessing(false);
      setProgressPercent(100);

      const generatedDoc: VerificationDocument = {
        id: `doc-${Date.now()}`,
        title: testFile.title,
        category: testFile.category as any,
        fileName: testFile.fileName,
        fileSize: '3.4 MB',
        uploadDate: 'Just now (Live Scan)',
        status: testFile.simulatedOutcome as any,
        ocrConfidence: testFile.simulatedOutcome === 'VERIFIED' ? 98.8 : 88.4,
        tamperRiskScore: testFile.tamperScore,
        metadataAnalysis: {
          softwareUsed: testFile.simulatedOutcome === 'VERIFIED' ? 'Scanner Canon G3010' : 'Photoshop CC 2024 (Mac)',
          originalCreationDate: '2026-10-28 10:15:00',
          modifiedDate: '2026-10-28 11:20:00',
          anomalyDetected: testFile.simulatedOutcome !== 'VERIFIED',
          anomalyDetails: testFile.simulatedOutcome !== 'VERIFIED' ? 'Clone stamp metadata & spliced compression noise identified in numeric fields.' : undefined,
        },
        elaForensics: {
          elaScore: testFile.tamperScore,
          tamperedRegionsCount: testFile.simulatedOutcome === 'VERIFIED' ? 0 : 2,
          suspiciousDescription: testFile.simulatedOutcome !== 'VERIFIED' ? 'Spliced pixel cluster detected around validity date and seal.' : undefined,
        },
        extractedFields: {
          'Document Title': testFile.title,
          'Issuing Authority': 'Government Regulatory Division',
          'Verification Status': testFile.simulatedOutcome === 'VERIFIED' ? 'Valid & Genuine' : 'Tampered / Suspicious',
        },
        rulesChecked: [
          {
            ruleId: 'R-LIVE-01',
            ruleName: 'Statutory Validity',
            clause: 'APH 2024-27 Mandatory Document Standard',
            passed: testFile.simulatedOutcome === 'VERIFIED',
            details: testFile.simulatedOutcome === 'VERIFIED' ? 'All criteria satisfied with certified seal.' : 'Deficit or tampering detected.',
          }
        ]
      };

      setCompletedScan(generatedDoc);
      if (onDocumentAdded) {
        onDocumentAdded(generatedDoc);
      }
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
            <UploadCloud className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-extrabold text-white">
            Institutional Dossier Ingestion & AI Verification Gateway
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-2xl">
          Upload statutory institutional documents (Fire NOC, Land Deed, Faculty Ledger, Building Plans) for real-time automated fraud detection and AICTE regulatory auditing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Upload Area & Live Simulator */}
        <div className="lg:col-span-7 space-y-4">
          {/* Drag & Drop Card */}
          <div className="glass-panel p-8 rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-sky-500/50 transition-all text-center space-y-4 relative group cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                Drag & Drop Dossier PDF / Scanned Image
              </h3>
              <p className="text-xs text-slate-400">
                Supports PDF, TIFF, PNG, JPG (Auto OCR, Table Extraction & Tamper Forensics)
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleSimulateScan(quickTestFiles[0])}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 transition-all"
              >
                Browse & Run AI Scan
              </button>
            </div>
          </div>

          {/* 1-Click Quick Demo Test Dossiers */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>1-Click Test Scenarios (Instant Hackathon Demo)</span>
              </span>
              <span className="text-[10px] text-slate-500">Zero Upload Waiting</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickTestFiles.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulateScan(file)}
                  disabled={isProcessing}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-left transition-all space-y-1.5 group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {file.category}
                    </span>
                    <span className={`text-[10px] font-bold ${file.simulatedOutcome === 'VERIFIED' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {file.simulatedOutcome}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-sky-300">
                    {file.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{file.fileName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Live AI Processing Feed & Scan Results */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 min-h-[380px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>Real-Time AI Pipeline Telemetry</span>
                </span>
                {isProcessing && (
                  <span className="flex items-center gap-1.5 text-xs text-sky-400 animate-pulse font-mono font-bold">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing {progressPercent}%</span>
                  </span>
                )}
              </div>

              {isProcessing ? (
                /* Animated Scanning State */
                <div className="py-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-sky-500/20 border-t-sky-500 animate-spin mx-auto" />
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">{processingStage}</div>
                    <div className="text-xs text-slate-400">
                      Scanning OCR matrices, calculating compression ELA, querying AICTE registry...
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-sky-500 h-full transition-all duration-300 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : completedScan ? (
                /* Completed Scan Result Card */
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {completedScan.category}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{completedScan.title}</h4>
                      <p className="text-xs text-slate-400 font-mono">{completedScan.fileName}</p>
                    </div>

                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      completedScan.status === 'VERIFIED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {completedScan.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">OCR Confidence</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">{completedScan.ocrConfidence}%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Tamper Risk Index</div>
                      <div className={`text-sm font-bold font-mono mt-0.5 ${completedScan.tamperRiskScore > 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {completedScan.tamperRiskScore}%
                      </div>
                    </div>
                  </div>

                  {completedScan.metadataAnalysis.anomalyDetails && (
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-1">
                      <div className="font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Tampering Anomaly Detected</span>
                      </div>
                      <p className="text-[11px] text-rose-300/90">{completedScan.metadataAnalysis.anomalyDetails}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => onNavigateTab('inspector')}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Open in Forensic Inspector</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Idle Guidance State */
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-xs">
                    Select a 1-click test file or upload a document to view real-time AI extraction and fraud analysis.
                  </p>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-3 flex items-center justify-between">
              <span>Cryptographic Hashing: SHA-256</span>
              <span>Regulatory Standard: AICTE APH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
