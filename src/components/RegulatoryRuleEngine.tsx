import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Calculator, 
  BookOpen, 
  Sliders, 
  AlertTriangle,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Institution } from '../types';
import { MOCK_REGULATORY_RULES } from '../data/mockData';

interface RegulatoryRuleEngineProps {
  institution: Institution;
}

export const RegulatoryRuleEngine: React.FC<RegulatoryRuleEngineProps> = ({ institution }) => {
  const rules = MOCK_REGULATORY_RULES[institution.id] || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Interactive Live Calculator state
  const [calcStudents, setCalcStudents] = useState<number>(institution.totalStudents);
  const [calcFaculty, setCalcFaculty] = useState<number>(institution.totalFaculty);

  // Compute live SFR
  const liveSFR = calcFaculty > 0 ? (calcStudents / calcFaculty).toFixed(1) : '0';
  const isSfrCompliant = Number(liveSFR) <= 15.0 && calcFaculty > 0;

  // Compute AICTE recommended Cadre based on total faculty
  // Formula: 1:2:6 ratio -> total 9 parts.
  const requiredProfessors = Math.max(1, Math.round(calcFaculty * (1 / 9)));
  const requiredAssociates = Math.max(2, Math.round(calcFaculty * (2 / 9)));
  const requiredAssistants = calcFaculty - requiredProfessors - requiredAssociates;

  const categories = ['ALL', 'Faculty & Cadre', 'Land & Built-up', 'Safety & Environment', 'Governance'];

  const filteredRules = selectedCategory === 'ALL'
    ? rules
    : rules.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-white">
                AICTE Approval Process Handbook (APH 2024-27) Rule Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Deterministic regulatory rule engine mapping institutional dossier figures directly against statutory AICTE norms, cadre matrices, and infrastructure thresholds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              APH 2024-27 Edition
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Regulatory Calculator Widget */}
      <div className="glass-panel p-6 rounded-2xl border border-sky-500/30 shadow-xl bg-gradient-to-r from-sky-950/20 via-slate-900 to-indigo-950/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Interactive AICTE SFR & Cadre Simulator
            </h3>
          </div>
          <span className="text-[11px] text-sky-400 font-mono">Real-time Rule Evaluation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Slider 1: Student Intake */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Approved Student Intake</span>
              <span className="font-bold text-white font-mono">{calcStudents} Students</span>
            </div>
            <input
              type="range"
              min="120"
              max="2400"
              step="60"
              value={calcStudents}
              onChange={(e) => setCalcStudents(Number(e.target.value))}
              className="w-full accent-sky-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
            />
          </div>

          {/* Slider 2: Full-Time Faculty */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Full-Time Faculty Count</span>
              <span className="font-bold text-white font-mono">{calcFaculty} Faculty</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={calcFaculty}
              onChange={(e) => setCalcFaculty(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
            />
          </div>

          {/* Computed SFR Ratio */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Computed SFR
            </div>
            <div className="text-2xl font-black font-mono">
              1 : <span className={isSfrCompliant ? 'text-emerald-400' : 'text-rose-400'}>{liveSFR}</span>
            </div>
            <div className="text-[10px] font-bold">
              {isSfrCompliant ? (
                <span className="text-emerald-400">✓ Meets AICTE 1:15 Norm</span>
              ) : (
                <span className="text-rose-400">✕ Deficit (Must be &le; 1:15)</span>
              )}
            </div>
          </div>

          {/* Recommended Cadre Proportion */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Mandated 1:2:6 Cadre
            </div>
            <div className="text-xs font-mono font-bold text-slate-200">
              <span className="text-sky-400">{requiredProfessors} P</span> :{' '}
              <span className="text-indigo-400">{requiredAssociates} Assoc</span> :{' '}
              <span className="text-slate-300">{requiredAssistants} Asst</span>
            </div>
            <div className="text-[10px] text-slate-400">Doctoral requirement distribution</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rules Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400">
            Mandated Statutory Rule Checks ({filteredRules.length})
          </span>
          <span className="text-slate-400">
            Status:{' '}
            <strong className="text-emerald-400">
              {filteredRules.filter((r) => r.passed).length} Passed
            </strong>{' '}
            /{' '}
            <strong className="text-rose-400">
              {filteredRules.filter((r) => !r.passed).length} Failed
            </strong>
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="p-4.5 hover:bg-slate-900/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 p-4"
            >
              <div className="space-y-1 md:max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {rule.code}
                  </span>
                  <span className="font-bold text-white text-sm">{rule.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{rule.handbookSection}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Norm: <span className="font-mono text-slate-300">{rule.formulaOrNorm}</span>
                </div>
                <div className="text-xs text-slate-300">
                  Result: <span className="font-semibold">{rule.variance}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 justify-between md:justify-end">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Observed / Threshold</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">
                    {rule.institutionValue} <span className="text-slate-500">vs</span> {rule.thresholdValue}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {rule.passed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> COMPLIANT
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      <XCircle className="w-3.5 h-3.5" /> DEFICIT / NON-COMPLIANT
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
