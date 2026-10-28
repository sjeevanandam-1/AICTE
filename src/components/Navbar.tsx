import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  ChevronDown, 
  FileText, 
  Zap, 
  UserCheck, 
  Cpu, 
  Layers, 
  Users,
  PlusCircle,
  Plus
} from 'lucide-react';
import { UserRole, InstitutionApplication } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedApp: InstitutionApplication;
  setSelectedAppId: (id: string) => void;
  applications: InstitutionApplication[];
  onOpenReport: () => void;
  onOpenAddCollege: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  currentTab,
  setCurrentTab,
  selectedApp,
  setSelectedAppId,
  applications,
  onOpenReport,
  onOpenAddCollege,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      {/* Top Banner with SIH & AICTE Identity */}
      <div className="bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border-b border-slate-800/60 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-200">Smart India Hackathon (SIH 2026)</span>
            <span className="text-slate-500">•</span>
            <span className="bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20 font-mono font-medium">
              Problem ID: SIH26261
            </span>
            <span className="hidden lg:inline text-slate-400">
              AI-Powered Application Validation & Regulatory Compliance Suite
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-400">
            <span className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1">
              <Zap className="w-3 h-3" /> AICTE Approval Process Handbook (APH 2024-27)
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">Ministry of Education, GoI</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Platform Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setCurrentTab(currentRole === 'COLLEGE' ? 'college' : 'officer')}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-sky-400" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  Satya<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Verify</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  AICTE AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Multi-Role Regulatory Portal</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('college')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'college'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>College Portal</span>
            </button>

            <button
              onClick={() => setCurrentTab('officer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'officer'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>AICTE Officer Desk</span>
            </button>

            <button
              onClick={() => setCurrentTab('inspector')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'inspector'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Forensics & ELA</span>
            </button>

            <button
              onClick={() => setCurrentTab('ghost-faculty')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'ghost-faculty'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Ghost Faculty Radar</span>
            </button>

            <button
              onClick={() => setCurrentTab('rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'rules'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>AICTE Rule Engine</span>
            </button>
          </nav>

          {/* Right Controls: Add College Button + College Preset Switcher + Role Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Direct "+ Add College" Button */}
            <button
              onClick={onOpenAddCollege}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 hover:border-emerald-500/60 transition-all shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add College</span>
            </button>

            {/* Active College Switcher */}
            <div className="relative group">
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs cursor-pointer hover:border-sky-500/50 transition-all">
                <Building2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <div className="text-left max-w-[110px] sm:max-w-[150px] truncate">
                  <div className="text-[9px] text-slate-400 font-mono">College:</div>
                  <div className="font-semibold text-slate-200 truncate">{selectedApp.collegeName.split(' ')[0]} ...</div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1 flex items-center justify-between">
                  <span>Registered Colleges ({applications.length})</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAddCollege();
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>

                <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                  {applications.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-start justify-between ${
                        selectedApp.id === app.id
                          ? 'bg-sky-950/80 border border-sky-500/30 text-sky-200'
                          : 'hover:bg-slate-800/70 text-slate-300'
                      }`}
                    >
                      <div className="max-w-[190px]">
                        <div className="font-semibold truncate">{app.collegeName}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{app.state} • {app.collegeCode}</div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {app.reviewStatus === 'APPROVED' ? 'APPROVED' : app.reviewStatus.split('_')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Bottom Add Action in dropdown */}
                <div className="pt-2 mt-1 border-t border-slate-800">
                  <button
                    onClick={onOpenAddCollege}
                    className="w-full py-1.5 px-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Register New College / Institution</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setCurrentRole('COLLEGE');
                  setCurrentTab('college');
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  currentRole === 'COLLEGE'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                College
              </button>
              <button
                onClick={() => {
                  setCurrentRole('AICTE_OFFICER');
                  setCurrentTab('officer');
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  currentRole === 'AICTE_OFFICER'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Officer
              </button>
            </div>

            {/* Official Report Button */}
            <button
              onClick={onOpenReport}
              className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 text-white shadow-md transition-all active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
