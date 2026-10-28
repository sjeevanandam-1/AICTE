import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  FileCheck2,
} from 'lucide-react';
import { InstitutionApplication } from '../types';
import { TEN_MANDATORY_DOCUMENTS_SCHEMA } from '../data/mockData';

interface AddCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCollege: (newApp: InstitutionApplication) => void;
}

export const AddCollegeModal: React.FC<AddCollegeModalProps> = ({
  isOpen,
  onClose,
  onAddCollege,
}) => {
  if (!isOpen) return null;

  const [collegeName, setCollegeName] = useState('');
  const [collegeCode, setCollegeCode] = useState(`AICTE-1-${Math.floor(10000000 + Math.random() * 90000000)}`);
  const [loginEmail, setLoginEmail] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Chennai');
  const [category, setCategory] = useState('Engineering & Technology (UG & PG)');
  const [applicationType, setApplicationType] = useState<'Extension of Approval (EoA)' | 'New Institution' | 'Intake Increase' | 'New Course Addition'>('Extension of Approval (EoA)');
  const [studentIntake, setStudentIntake] = useState(720);
  const [facultyCount, setFacultyCount] = useState(48);
  const [campusAcres, setCampusAcres] = useState(8.5);
  const [builtUpArea, setBuiltUpArea] = useState(16500);

  // Auto-fill realistic sample for instant hackathon demo
  const handleAutoFill = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setCollegeName(`St. Michael Institute of Technology & Science #${randomSuffix}`);
    setCollegeCode(`AICTE-1-9${randomSuffix}214`);
    setLoginEmail(`principal.stmichael${randomSuffix}@aicte.gov.in`);
    setState('Tamil Nadu');
    setDistrict('Coimbatore');
    setCategory('Engineering & Technology');
    setApplicationType('Extension of Approval (EoA)');
    setStudentIntake(900);
    setFacultyCount(60);
    setCampusAcres(10.2);
    setBuiltUpArea(21000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName.trim()) return;

    const email = loginEmail.trim() || `college.${collegeName.toLowerCase().replace(/[^a-z0-9]/g, '')}@aicte.gov.in`;

    // Scaffold all 10 mandatory documents in MISSING status ready for upload
    const scaffoldedDocs = TEN_MANDATORY_DOCUMENTS_SCHEMA.map((schema) => ({
      ...schema,
      status: 'MISSING' as const,
      aiMessage: `❌ MISSING: ${schema.name} has not been uploaded yet.`
    }));

    const newApplication: InstitutionApplication = {
      id: `app-custom-${Date.now()}`,
      collegeName: collegeName.trim(),
      collegeCode: collegeCode.trim(),
      loginId: email,
      state,
      district,
      category,
      applicationType,
      submissionDate: new Date().toISOString().split('T')[0],
      reviewStatus: 'DRAFT',
      overallScore: 35,
      riskLevel: 'HIGH',
      totalStudents: Number(studentIntake),
      totalFaculty: Number(facultyCount),
      campusAreaAcres: Number(campusAcres),
      builtUpAreaSqM: Number(builtUpArea),
      notifications: [
        {
          id: `notif-${Date.now()}-1`,
          title: 'College Successfully Registered',
          message: 'Dossier initialized with 10 statutory document requirements. Upload certificates to initiate AI verification.',
          type: 'info',
          timestamp: 'Just now'
        },
        {
          id: `notif-${Date.now()}-2`,
          title: 'ACTION REQUIRED: 10 Documents Missing',
          message: 'Upload all 10 mandatory certificates to obtain AICTE Scrutiny Officer approval.',
          type: 'warning',
          timestamp: 'Just now'
        }
      ],
      mandatoryDocs: scaffoldedDocs
    };

    onAddCollege(newApplication);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Register / Add New College</h2>
              <p className="text-xs text-slate-400">Scaffolds 10 mandatory statutory AICTE compliance certificates</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoFill}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Sample Data</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Row 1: College Name & Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">College / Institution Name *</label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="e.g. Chennai Institute of Tech"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">AICTE Permanent ID *</label>
              <input
                type="text"
                required
                value={collegeCode}
                onChange={(e) => setCollegeCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-sky-400 font-mono font-bold focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Row 2: State & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">State *</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Telangana">Telangana</option>
                <option value="Kerala">Kerala</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">District *</label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Chennai, Coimbatore, Bengaluru"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Row 3: Category & Application Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Engineering & Technology (UG & PG)">Engineering & Technology (UG & PG)</option>
                <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                <option value="Management (MBA / PGDM)">Management (MBA / PGDM)</option>
                <option value="MCA / Computer Applications">MCA / Computer Applications</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Application Type *</label>
              <select
                value={applicationType}
                onChange={(e) => setApplicationType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Extension of Approval (EoA)">Extension of Approval (EoA)</option>
                <option value="New Institution">New Institution Establishment</option>
                <option value="Intake Increase">Increase in Approved Intake</option>
                <option value="New Course Addition">Introduction of New Course</option>
              </select>
            </div>
          </div>

          {/* Row 4: Student Intake & Faculty Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Approved Student Intake *</label>
              <input
                type="number"
                min="60"
                step="60"
                required
                value={studentIntake}
                onChange={(e) => setStudentIntake(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">
                Full-Time Teaching Faculty * (SFR: 1:{(studentIntake / (facultyCount || 1)).toFixed(1)})
              </label>
              <input
                type="number"
                min="5"
                required
                value={facultyCount}
                onChange={(e) => setFacultyCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/20 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Register College & Scaffold 10 Documents</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
