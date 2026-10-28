import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CollegePortal } from './components/CollegePortal';
import { OfficerPortal } from './components/OfficerPortal';
import { DocumentInspector } from './components/DocumentInspector';
import { GhostFacultyRadar } from './components/GhostFacultyRadar';
import { RegulatoryRuleEngine } from './components/RegulatoryRuleEngine';
import { ComplianceReportModal } from './components/ComplianceReportModal';
import { AddCollegeModal } from './components/AddCollegeModal';
import { INITIAL_APPLICATIONS } from './data/mockData';
import { UserRole, InstitutionApplication, Institution } from './types';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('COLLEGE');
  const [currentTab, setCurrentTab] = useState<string>('college');
  const [applications, setApplications] = useState<InstitutionApplication[]>(INITIAL_APPLICATIONS);
  const [selectedAppId, setSelectedAppId] = useState<string>(INITIAL_APPLICATIONS[0].id);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isAddCollegeOpen, setIsAddCollegeOpen] = useState<boolean>(false);

  // Active Application
  const selectedApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  // Map application to legacy Institution type for inspector and rule engine
  const mappedInstitution: Institution = {
    id: selectedApp.id === 'app-srm-01' ? 'inst-1' : selectedApp.id === 'app-apex-02' ? 'inst-2' : 'inst-3',
    name: selectedApp.collegeName,
    code: selectedApp.collegeCode,
    state: selectedApp.state,
    district: selectedApp.district,
    category: selectedApp.category,
    applicationType: selectedApp.applicationType,
    submissionDate: selectedApp.submissionDate,
    overallScore: selectedApp.overallScore,
    riskLevel: selectedApp.riskLevel,
    status: selectedApp.reviewStatus === 'APPROVED' ? 'VERIFIED' : selectedApp.overallScore < 40 ? 'FLAGGED' : 'SUSPICIOUS',
    totalStudents: selectedApp.totalStudents,
    totalFaculty: selectedApp.totalFaculty,
    campusAreaAcres: selectedApp.campusAreaAcres,
    builtUpAreaSqM: selectedApp.builtUpAreaSqM,
    documentsCount: selectedApp.mandatoryDocs.length,
    flaggedIssuesCount: selectedApp.mandatoryDocs.filter((d) => d.status !== 'UPLOADED_VALID').length,
  };

  // College updates application (e.g. uploaded renewal NOC or missing doc)
  const handleUpdateApplication = (updatedApp: InstitutionApplication) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    );
  };

  // Add newly registered college
  const handleAddCollege = (newCollegeApp: InstitutionApplication) => {
    setApplications((prev) => [newCollegeApp, ...prev]);
    setSelectedAppId(newCollegeApp.id);
    setCurrentRole('COLLEGE');
    setCurrentTab('college');
  };

  // AICTE Officer approves application
  const handleApproveApplication = (appId: string, remarks: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const certHash = `SHA256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
          return {
            ...app,
            reviewStatus: 'APPROVED' as const,
            overallScore: 98,
            officerDecision: {
              officerName: 'Dr. S. K. Aggarwal (Advisor, AICTE Approval Bureau)',
              officerId: 'AICTE-OFFICER-DELHI-004',
              decisionDate: new Date().toISOString().split('T')[0],
              remarks: remarks || 'All statutory requirements verified. Full Approval (EoA) granted.',
              approvalCertificateHash: certHash,
            },
            notifications: [
              {
                id: `appr-${Date.now()}`,
                title: '🎉 OFFICIAL AICTE APPROVAL GRANTED',
                message: `Approval letter (EoA) officially issued by Dr. S. K. Aggarwal. Reference Hash: ${certHash}`,
                type: 'success' as const,
                timestamp: 'Just now',
              },
              ...app.notifications,
            ],
          };
        }
        return app;
      })
    );
  };

  // AICTE Officer issues deficit notice
  const handleIssueDeficitNotice = (appId: string, remarks: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            reviewStatus: 'DEFICIT_NOTICE_ISSUED' as const,
            notifications: [
              {
                id: `def-${Date.now()}`,
                title: '⚠️ 15-Day Official AICTE Deficit Notice',
                message: remarks || 'You must submit renewed Fire Safety NOC and missing statutory documents within 15 days.',
                type: 'danger' as const,
                timestamp: 'Just now',
              },
              ...app.notifications,
            ],
          };
        }
        return app;
      })
    );
  };

  // AICTE Officer rejects application
  const handleRejectApplication = (appId: string, remarks: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            reviewStatus: 'REJECTED' as const,
            notifications: [
              {
                id: `rej-${Date.now()}`,
                title: '🚨 APPLICATION REJECTED',
                message: remarks || 'Application rejected due to document tampering and regulatory non-compliance.',
                type: 'danger' as const,
                timestamp: 'Just now',
              },
              ...app.notifications,
            ],
          };
        }
        return app;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Navbar with Role Switcher & Add College Button */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedApp={selectedApp}
        setSelectedAppId={setSelectedAppId}
        applications={applications}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenAddCollege={() => setIsAddCollegeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role 1: College Portal View */}
        {currentTab === 'college' && (
          <CollegePortal
            application={selectedApp}
            onUpdateApplication={handleUpdateApplication}
            onSwitchToOfficer={() => {
              setCurrentRole('AICTE_OFFICER');
              setCurrentTab('officer');
            }}
          />
        )}

        {/* Role 2: AICTE Officer Scrutiny Desk */}
        {currentTab === 'officer' && (
          <OfficerPortal
            applications={applications}
            selectedAppId={selectedApp.id}
            onSelectApplication={setSelectedAppId}
            onApproveApplication={handleApproveApplication}
            onIssueDeficitNotice={handleIssueDeficitNotice}
            onRejectApplication={handleRejectApplication}
            onSwitchToCollege={() => {
              setCurrentRole('COLLEGE');
              setCurrentTab('college');
            }}
          />
        )}

        {/* Deep Dive Forensic Tools */}
        {currentTab === 'inspector' && (
          <DocumentInspector institution={mappedInstitution} />
        )}

        {currentTab === 'ghost-faculty' && (
          <GhostFacultyRadar institution={mappedInstitution} />
        )}

        {currentTab === 'rules' && (
          <RegulatoryRuleEngine institution={mappedInstitution} />
        )}
      </main>

      {/* Add College Modal */}
      <AddCollegeModal
        isOpen={isAddCollegeOpen}
        onClose={() => setIsAddCollegeOpen(false)}
        onAddCollege={handleAddCollege}
      />

      {/* Official Verifiable Compliance Report Modal */}
      <ComplianceReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        institution={mappedInstitution}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-sky-500/10 text-sky-400 font-bold">SIH26261</span>
            <span className="text-slate-300 font-semibold">
              SatyaVerify AI — Multi-Role Automated Regulatory Scrutiny System
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-500">
            <span>Active Role: <strong className="text-sky-400">{currentRole}</strong></span>
            <span>•</span>
            <span>AICTE Approval Process Handbook 2024-27</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
