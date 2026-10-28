import { 
  InstitutionApplication, 
  Institution, 
  VerificationDocument, 
  GhostFacultyAlert, 
  RegulatoryRule,
  MandatoryDocRequirement 
} from '../types';

export const TEN_MANDATORY_DOCUMENTS_SCHEMA: Omit<MandatoryDocRequirement, 'status' | 'fileName' | 'uploadDate' | 'expiryDate' | 'isExpired' | 'aiMessage'>[] = [
  {
    type: 'LAND_DEED',
    name: '1. Land Ownership & Registration Title Deed',
    category: 'Land & Legal',
    description: 'Registered sale/gift deed establishing contiguous unencumbered campus land area.'
  },
  {
    type: 'FIRE_NOC',
    name: '2. State Fire & Rescue Services Safety NOC',
    category: 'Safety & Environment',
    description: 'Mandatory annual fire safety clearance certificate covering active academic session.'
  },
  {
    type: 'BUILDING_STABILITY',
    name: '3. Building Structural Stability Certificate',
    category: 'Infrastructure',
    description: 'Certified structural engineer stability certificate confirming earthquake/safety fitness.'
  },
  {
    type: 'ARCHITECTURAL_PLAN',
    name: '4. Approved Master Plan & Carpet Area Blueprint',
    category: 'Infrastructure',
    description: 'Municipal / DTCP sanctioned blueprint validating instructional and administrative carpet area.'
  },
  {
    type: 'FACULTY_ROLL',
    name: '5. Teaching Faculty Roll & Form-16 Salary Register',
    category: 'Faculty & Cadre',
    description: 'Roster of all faculty with Aadhaar/PAN hashes and PFMS/bank salary disbursement proof.'
  },
  {
    type: 'POLLUTION_NOC',
    name: '6. State Pollution Control Board (PCB) Consent',
    category: 'Safety & Environment',
    description: 'Consent to Operate (CTO) for campus Sewage Treatment Plant (STP) & e-waste management.'
  },
  {
    type: 'WATER_SANITATION',
    name: '7. Potable Water Purity & Sanitation Hygiene Certificate',
    category: 'Health & Safety',
    description: 'Public health laboratory test report confirming bacteriologically safe drinking water.'
  },
  {
    type: 'AUDITED_FINANCIALS',
    name: '8. Audited Balance Sheet & Financial Audit Statements',
    category: 'Financial & Solvency',
    description: 'Chartered Accountant audited balance sheet, income/expenditure, and Form 10B/ITR.'
  },
  {
    type: 'LAB_LIBRARY_FACILITY',
    name: '9. Laboratory Equipment & Computing Facility Ledger',
    category: 'Academics & Labs',
    description: 'Stock register bills showing licensed software, computer terminals, and lab machinery.'
  },
  {
    type: 'ANTI_RAGGING_AFFIDAVIT',
    name: '10. Anti-Ragging Committee Constitution & CCTV Undertaking',
    category: 'Governance & Discipline',
    description: 'Statutory affidavit undertaking compliance with Supreme Court of India anti-ragging mandates.'
  }
];

export const INITIAL_APPLICATIONS: InstitutionApplication[] = [
  {
    id: 'app-srm-01',
    collegeName: 'SRM Institute of Engineering & Technology',
    collegeCode: 'AICTE-1-49281902',
    loginId: 'college.srm@aicte.gov.in',
    state: 'Tamil Nadu',
    district: 'Chennai',
    category: 'Engineering & Technology (UG & PG)',
    applicationType: 'Extension of Approval (EoA)',
    submissionDate: '2026-10-25',
    reviewStatus: 'SUBMITTED_TO_AICTE',
    overallScore: 98,
    riskLevel: 'LOW',
    totalStudents: 1200,
    totalFaculty: 82,
    campusAreaAcres: 12.5,
    builtUpAreaSqM: 28400,
    notifications: [
      {
        id: 'n-1',
        title: 'All 10 Statutory Documents Verified',
        message: 'AI automatic scrutiny passed all 10 required certificates. Expiry dates active and seals authentic.',
        type: 'success',
        timestamp: '2 hours ago'
      },
      {
        id: 'n-2',
        title: 'Application Forwarded to AICTE Scrutiny Desk',
        message: 'Dossier ready for official approval sign-off by AICTE Scrutiny Officer.',
        type: 'info',
        timestamp: '1 hour ago'
      }
    ],
    mandatoryDocs: [
      {
        type: 'LAND_DEED',
        name: '1. Land Ownership & Registration Title Deed',
        category: 'Land & Legal',
        description: 'Registered sale/gift deed establishing contiguous unencumbered campus land area.',
        status: 'UPLOADED_VALID',
        fileName: 'SRM_Land_Registration_Deed.pdf',
        fileSize: '4.8 MB',
        uploadDate: '2026-10-24',
        expiryDate: 'Perpetual',
        isExpired: false,
        tamperRiskScore: 3,
        ocrConfidence: 99.1,
        aiMessage: '✓ Authentic Government Sub-Registrar seal. 12.5 Acres exceeds urban 7.5 Acres norm.'
      },
      {
        type: 'FIRE_NOC',
        name: '2. State Fire & Rescue Services Safety NOC',
        category: 'Safety & Environment',
        description: 'Mandatory annual fire safety clearance certificate covering active academic session.',
        status: 'UPLOADED_VALID',
        fileName: 'Fire_Safety_NOC_2026_Chennai.pdf',
        fileSize: '2.1 MB',
        uploadDate: '2026-10-25',
        expiryDate: '2027-09-30',
        isExpired: false,
        daysExpiredOrLeft: 337,
        tamperRiskScore: 2,
        ocrConfidence: 98.9,
        aiMessage: '✓ Valid until 30-Sep-2027. Hydrant pressure 4.2 bar verified.'
      },
      {
        type: 'BUILDING_STABILITY',
        name: '3. Building Structural Stability Certificate',
        category: 'Infrastructure',
        description: 'Certified structural engineer stability certificate confirming earthquake/safety fitness.',
        status: 'UPLOADED_VALID',
        fileName: 'Structural_Stability_Certificate.pdf',
        fileSize: '3.4 MB',
        uploadDate: '2026-10-24',
        expiryDate: '2029-05-31',
        isExpired: false,
        daysExpiredOrLeft: 945,
        tamperRiskScore: 4,
        ocrConfidence: 97.8,
        aiMessage: '✓ Structural fitness verified for Zone-III seismic safety standards.'
      },
      {
        type: 'ARCHITECTURAL_PLAN',
        name: '4. Approved Master Plan & Carpet Area Blueprint',
        category: 'Infrastructure',
        description: 'Municipal / DTCP sanctioned blueprint validating instructional and administrative carpet area.',
        status: 'UPLOADED_VALID',
        fileName: 'DTCP_Approved_Master_Blueprint.pdf',
        fileSize: '6.4 MB',
        uploadDate: '2026-10-24',
        expiryDate: 'Permanent Sanction',
        isExpired: false,
        tamperRiskScore: 3,
        ocrConfidence: 98.2,
        aiMessage: '✓ 28,400 sq.m instructional area verified (23.6 sq.m/student exceeds AICTE norm 4.0).'
      },
      {
        type: 'FACULTY_ROLL',
        name: '5. Teaching Faculty Roll & Form-16 Salary Register',
        category: 'Faculty & Cadre',
        description: 'Roster of all faculty with Aadhaar/PAN hashes and PFMS/bank salary disbursement proof.',
        status: 'UPLOADED_VALID',
        fileName: 'Faculty_Payroll_Aadhaar_Register.pdf',
        fileSize: '3.9 MB',
        uploadDate: '2026-10-25',
        expiryDate: 'Active AY 2026-27',
        isExpired: false,
        tamperRiskScore: 5,
        ocrConfidence: 99.4,
        aiMessage: '✓ 82 faculty verified. SFR 1:14.6 compliant. Zero ghost faculty conflicts detected.'
      },
      {
        type: 'POLLUTION_NOC',
        name: '6. State Pollution Control Board (PCB) Consent',
        category: 'Safety & Environment',
        description: 'Consent to Operate (CTO) for campus Sewage Treatment Plant (STP) & e-waste management.',
        status: 'UPLOADED_VALID',
        fileName: 'TNPCB_Consent_To_Operate.pdf',
        fileSize: '1.8 MB',
        uploadDate: '2026-10-24',
        expiryDate: '2028-03-31',
        isExpired: false,
        daysExpiredOrLeft: 520,
        tamperRiskScore: 3,
        ocrConfidence: 98.4,
        aiMessage: '✓ Active CTO valid through 2028. STP capacity 250 KLD compliant.'
      },
      {
        type: 'WATER_SANITATION',
        name: '7. Potable Water Purity & Sanitation Hygiene Certificate',
        category: 'Health & Safety',
        description: 'Public health laboratory test report confirming bacteriologically safe drinking water.',
        status: 'UPLOADED_VALID',
        fileName: 'Water_Quality_Lab_Report.pdf',
        fileSize: '1.2 MB',
        uploadDate: '2026-10-25',
        expiryDate: '2027-04-15',
        isExpired: false,
        daysExpiredOrLeft: 169,
        tamperRiskScore: 2,
        ocrConfidence: 99.0,
        aiMessage: '✓ Pure drinking water certified. Total Dissolved Solids & Coliform within BIS limits.'
      },
      {
        type: 'AUDITED_FINANCIALS',
        name: '8. Audited Balance Sheet & Financial Audit Statements',
        category: 'Financial & Solvency',
        description: 'Chartered Accountant audited balance sheet, income/expenditure, and Form 10B/ITR.',
        status: 'UPLOADED_VALID',
        fileName: 'Audited_Financial_Statement_FY25_26.pdf',
        fileSize: '4.5 MB',
        uploadDate: '2026-10-24',
        expiryDate: 'Active FY 2025-26',
        isExpired: false,
        tamperRiskScore: 3,
        ocrConfidence: 98.6,
        aiMessage: '✓ Financial solvency verified. Sufficient corpus reserve funds maintained.'
      },
      {
        type: 'LAB_LIBRARY_FACILITY',
        name: '9. Laboratory Equipment & Computing Facility Ledger',
        category: 'Academics & Labs',
        description: 'Stock register bills showing licensed software, computer terminals, and lab machinery.',
        status: 'UPLOADED_VALID',
        fileName: 'Lab_Computers_Equipment_Ledger.pdf',
        fileSize: '3.1 MB',
        uploadDate: '2026-10-25',
        expiryDate: 'Valid Academic Year',
        isExpired: false,
        tamperRiskScore: 4,
        ocrConfidence: 97.9,
        aiMessage: '✓ 680 computing terminals with legal software and 1:2 computer-student ratio verified.'
      },
      {
        type: 'ANTI_RAGGING_AFFIDAVIT',
        name: '10. Anti-Ragging Committee Constitution & CCTV Undertaking',
        category: 'Governance & Discipline',
        description: 'Statutory affidavit undertaking compliance with Supreme Court of India anti-ragging mandates.',
        status: 'UPLOADED_VALID',
        fileName: 'Anti_Ragging_Affidavit_CCTV_Proof.pdf',
        fileSize: '1.6 MB',
        uploadDate: '2026-10-25',
        expiryDate: 'Current AY 2026-27',
        isExpired: false,
        tamperRiskScore: 2,
        ocrConfidence: 99.2,
        aiMessage: '✓ Full compliance with Supreme Court Anti-Ragging directives and CCTV deployment.'
      }
    ]
  },
  {
    id: 'app-apex-02',
    collegeName: 'Apex Global College of Engineering & Research',
    collegeCode: 'AICTE-1-83921045',
    loginId: 'college.apex@aicte.gov.in',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    category: 'Engineering & Technology',
    applicationType: 'Intake Increase',
    submissionDate: '2026-10-22',
    reviewStatus: 'DEFICIT_NOTICE_ISSUED',
    overallScore: 52,
    riskLevel: 'MEDIUM',
    totalStudents: 960,
    totalFaculty: 49,
    campusAreaAcres: 7.2,
    builtUpAreaSqM: 15200,
    notifications: [
      {
        id: 'n-21',
        title: 'CRITICAL: Fire Safety NOC Expired',
        message: 'Your Fire Safety NOC expired on 2026-05-09 (172 days ago). Immediate renewal order required.',
        type: 'danger',
        timestamp: '3 days ago',
        relatedDoc: 'Fire Safety NOC'
      },
      {
        id: 'n-22',
        title: 'MANDATORY DOCUMENTS MISSING',
        message: 'Water & Sanitation Certificate and Anti-Ragging Committee Affidavit are missing.',
        type: 'warning',
        timestamp: '3 days ago'
      }
    ],
    mandatoryDocs: [
      {
        type: 'LAND_DEED',
        name: '1. Land Ownership & Registration Title Deed',
        category: 'Land & Legal',
        description: 'Registered sale/gift deed establishing contiguous unencumbered campus land area.',
        status: 'UPLOADED_VALID',
        fileName: 'Apex_Land_Deed_Karnataka.pdf',
        fileSize: '3.6 MB',
        uploadDate: '2026-10-20',
        expiryDate: 'Perpetual',
        isExpired: false,
        tamperRiskScore: 8,
        ocrConfidence: 96.2,
        aiMessage: '✓ Land records verified against Karnataka Bhoomi registry.'
      },
      {
        type: 'FIRE_NOC',
        name: '2. State Fire & Rescue Services Safety NOC',
        category: 'Safety & Environment',
        description: 'Mandatory annual fire safety clearance certificate covering active academic session.',
        status: 'UPLOADED_EXPIRED',
        fileName: 'Karnataka_Fire_NOC_2024.pdf',
        fileSize: '1.9 MB',
        uploadDate: '2026-10-21',
        expiryDate: '2026-05-09',
        isExpired: true,
        daysExpiredOrLeft: -172,
        tamperRiskScore: 52,
        ocrConfidence: 94.0,
        aiMessage: '⚠️ DOCUMENT LAPSED: Expired on 2026-05-09 (172 days ago). You must upload an active renewal order!'
      },
      {
        type: 'BUILDING_STABILITY',
        name: '3. Building Structural Stability Certificate',
        category: 'Infrastructure',
        description: 'Certified structural engineer stability certificate confirming earthquake/safety fitness.',
        status: 'UPLOADED_VALID',
        fileName: 'Building_Stability_Certificate.pdf',
        fileSize: '4.1 MB',
        uploadDate: '2026-10-21',
        expiryDate: '2027-11-20',
        isExpired: false,
        daysExpiredOrLeft: 388,
        tamperRiskScore: 6,
        ocrConfidence: 97.4,
        aiMessage: '✓ Building stability certified by BBMP licensed engineer.'
      },
      {
        type: 'ARCHITECTURAL_PLAN',
        name: '4. Approved Master Plan & Carpet Area Blueprint',
        category: 'Infrastructure',
        description: 'Municipal / DTCP sanctioned blueprint validating instructional and administrative carpet area.',
        status: 'UPLOADED_VALID',
        fileName: 'BDA_Approved_Carpet_Blueprint.pdf',
        fileSize: '5.1 MB',
        uploadDate: '2026-10-21',
        expiryDate: 'Approved Plan',
        isExpired: false,
        tamperRiskScore: 5,
        ocrConfidence: 96.8,
        aiMessage: '✓ 15,200 sq.m instructional built-up area approved.'
      },
      {
        type: 'FACULTY_ROLL',
        name: '5. Teaching Faculty Roll & Form-16 Salary Register',
        category: 'Faculty & Cadre',
        description: 'Roster of all faculty with Aadhaar/PAN hashes and PFMS/bank salary disbursement proof.',
        status: 'UPLOADED_VALID',
        fileName: 'Faculty_Declaration_Apex_2026.pdf',
        fileSize: '4.2 MB',
        uploadDate: '2026-10-22',
        expiryDate: 'Active AY 2026-27',
        isExpired: false,
        tamperRiskScore: 12,
        ocrConfidence: 92.5,
        aiMessage: 'Cadre warning: Severe deficit in full Professor positions (Only 1 Professor for 960 students).'
      },
      {
        type: 'POLLUTION_NOC',
        name: '6. State Pollution Control Board (PCB) Consent',
        category: 'Safety & Environment',
        description: 'Consent to Operate (CTO) for campus Sewage Treatment Plant (STP) & e-waste management.',
        status: 'UPLOADED_VALID',
        fileName: 'KSPCB_Consent_Letter.pdf',
        fileSize: '2.4 MB',
        uploadDate: '2026-10-21',
        expiryDate: '2027-12-31',
        isExpired: false,
        daysExpiredOrLeft: 429,
        tamperRiskScore: 5,
        ocrConfidence: 98.1,
        aiMessage: '✓ Valid KSPCB environmental clearance.'
      },
      {
        type: 'WATER_SANITATION',
        name: '7. Potable Water Purity & Sanitation Hygiene Certificate',
        category: 'Health & Safety',
        description: 'Public health laboratory test report confirming bacteriologically safe drinking water.',
        status: 'MISSING',
        aiMessage: '❌ MISSING MANDATORY DOCUMENT: Water & Sanitation Hygiene Certificate has not been submitted.'
      },
      {
        type: 'AUDITED_FINANCIALS',
        name: '8. Audited Balance Sheet & Financial Audit Statements',
        category: 'Financial & Solvency',
        description: 'Chartered Accountant audited balance sheet, income/expenditure, and Form 10B/ITR.',
        status: 'UPLOADED_VALID',
        fileName: 'Audit_Report_Form10B_Apex.pdf',
        fileSize: '3.8 MB',
        uploadDate: '2026-10-21',
        expiryDate: 'FY 2025-26',
        isExpired: false,
        tamperRiskScore: 6,
        ocrConfidence: 97.2,
        aiMessage: '✓ CA certified audited financials submitted.'
      },
      {
        type: 'LAB_LIBRARY_FACILITY',
        name: '9. Laboratory Equipment & Computing Facility Ledger',
        category: 'Academics & Labs',
        description: 'Stock register bills showing licensed software, computer terminals, and lab machinery.',
        status: 'UPLOADED_VALID',
        fileName: 'Apex_Library_Computing_Stock.pdf',
        fileSize: '2.9 MB',
        uploadDate: '2026-10-22',
        expiryDate: 'Active AY 2026-27',
        isExpired: false,
        tamperRiskScore: 7,
        ocrConfidence: 96.5,
        aiMessage: '✓ Computing terminal count meets minimum AICTE norms.'
      },
      {
        type: 'ANTI_RAGGING_AFFIDAVIT',
        name: '10. Anti-Ragging Committee Constitution & CCTV Undertaking',
        category: 'Governance & Discipline',
        description: 'Statutory affidavit undertaking compliance with Supreme Court of India anti-ragging mandates.',
        status: 'MISSING',
        aiMessage: '❌ MISSING MANDATORY DOCUMENT: Anti-Ragging Committee resolution & CCTV undertaking missing.'
      }
    ]
  },
  {
    id: 'app-vanguard-03',
    collegeName: 'Vanguard Technical Academy & Management Campus',
    collegeCode: 'AICTE-1-99214732',
    loginId: 'college.vanguard@aicte.gov.in',
    state: 'Maharashtra',
    district: 'Pune Rural',
    category: 'Management & Polytechnic',
    applicationType: 'New Course Addition',
    submissionDate: '2026-10-25',
    reviewStatus: 'UNDER_AICTE_REVIEW',
    overallScore: 18,
    riskLevel: 'CRITICAL',
    totalStudents: 780,
    totalFaculty: 26,
    campusAreaAcres: 3.4,
    builtUpAreaSqM: 8100,
    notifications: [
      {
        id: 'n-31',
        title: 'FRAUD ALERT: Land Deed Tampered',
        message: 'AI Error Level Analysis detected Photoshop clone-stamping on Acreage numbers (ELA score 94%).',
        type: 'danger',
        timestamp: '1 day ago'
      },
      {
        id: 'n-32',
        title: 'FRAUD ALERT: Ghost Faculty Detected',
        message: '3 faculty members found simultaneously receiving full-time payroll at another college.',
        type: 'danger',
        timestamp: '1 day ago'
      }
    ],
    mandatoryDocs: [
      {
        type: 'LAND_DEED',
        name: '1. Land Ownership & Registration Title Deed',
        category: 'Land & Legal',
        description: 'Registered sale/gift deed establishing contiguous unencumbered campus land area.',
        status: 'UPLOADED_TAMPERED',
        fileName: 'Pune_Collector_Land_Record.pdf',
        fileSize: '3.1 MB',
        uploadDate: '2026-10-24',
        expiryDate: 'Perpetual',
        isExpired: false,
        tamperRiskScore: 94,
        ocrConfidence: 86.3,
        aiMessage: '🚨 FRAUD DETECTED: Acreage altered from 1.4 Acres to 3.4 Acres. Cloned official stamp identified.'
      },
      {
        type: 'FIRE_NOC',
        name: '2. State Fire & Rescue Services Safety NOC',
        category: 'Safety & Environment',
        description: 'Mandatory annual fire safety clearance certificate covering active academic session.',
        status: 'UPLOADED_VALID',
        fileName: 'Pune_Rural_Fire_Safety.pdf',
        fileSize: '2.0 MB',
        uploadDate: '2026-10-24',
        expiryDate: '2027-02-28',
        isExpired: false,
        daysExpiredOrLeft: 123,
        tamperRiskScore: 14,
        ocrConfidence: 95.1,
        aiMessage: '✓ Fire NOC verified active until Feb 2027.'
      },
      {
        type: 'BUILDING_STABILITY',
        name: '3. Building Structural Stability Certificate',
        category: 'Infrastructure',
        description: 'Certified structural engineer stability certificate confirming earthquake/safety fitness.',
        status: 'UPLOADED_VALID',
        fileName: 'PMC_Approved_Blueprint.pdf',
        fileSize: '5.2 MB',
        uploadDate: '2026-10-24',
        expiryDate: '2028-10-10',
        isExpired: false,
        daysExpiredOrLeft: 712,
        tamperRiskScore: 10,
        ocrConfidence: 96.0,
        aiMessage: '✓ Structural certificate submitted.'
      },
      {
        type: 'ARCHITECTURAL_PLAN',
        name: '4. Approved Master Plan & Carpet Area Blueprint',
        category: 'Infrastructure',
        description: 'Municipal / DTCP sanctioned blueprint validating instructional and administrative carpet area.',
        status: 'UPLOADED_VALID',
        fileName: 'Master_Campus_Blueprint.pdf',
        fileSize: '4.7 MB',
        uploadDate: '2026-10-24',
        expiryDate: 'Sanctioned',
        isExpired: false,
        tamperRiskScore: 9,
        ocrConfidence: 96.4,
        aiMessage: '✓ Sanctioned campus plan.'
      },
      {
        type: 'FACULTY_ROLL',
        name: '5. Teaching Faculty Roll & Form-16 Salary Register',
        category: 'Faculty & Cadre',
        description: 'Roster of all faculty with Aadhaar/PAN hashes and PFMS/bank salary disbursement proof.',
        status: 'UPLOADED_TAMPERED',
        fileName: 'Staff_Aadhaar_PAN_Ledger.pdf',
        fileSize: '2.8 MB',
        uploadDate: '2026-10-25',
        expiryDate: 'Active AY 2026-27',
        isExpired: false,
        tamperRiskScore: 88,
        ocrConfidence: 89.0,
        aiMessage: '🚨 GHOST FACULTY FRAUD: 3 faculty members drawing concurrent full-time salaries at another college.'
      },
      {
        type: 'POLLUTION_NOC',
        name: '6. State Pollution Control Board (PCB) Consent',
        category: 'Safety & Environment',
        description: 'Consent to Operate (CTO) for campus Sewage Treatment Plant (STP) & e-waste management.',
        status: 'MISSING',
        aiMessage: '❌ MISSING MANDATORY DOCUMENT: State Pollution Control Board Consent is missing.'
      },
      {
        type: 'WATER_SANITATION',
        name: '7. Potable Water Purity & Sanitation Hygiene Certificate',
        category: 'Health & Safety',
        description: 'Public health laboratory test report confirming bacteriologically safe drinking water.',
        status: 'UPLOADED_VALID',
        fileName: 'Drinking_Water_Purity_Certificate.pdf',
        fileSize: '1.5 MB',
        uploadDate: '2026-10-24',
        expiryDate: '2027-01-30',
        isExpired: false,
        daysExpiredOrLeft: 94,
        tamperRiskScore: 4,
        ocrConfidence: 98.7,
        aiMessage: '✓ Drinking water parameters meet standards.'
      },
      {
        type: 'AUDITED_FINANCIALS',
        name: '8. Audited Balance Sheet & Financial Audit Statements',
        category: 'Financial & Solvency',
        description: 'Chartered Accountant audited balance sheet, income/expenditure, and Form 10B/ITR.',
        status: 'MISSING',
        aiMessage: '❌ MISSING MANDATORY DOCUMENT: Audited Financial Statements not uploaded.'
      },
      {
        type: 'LAB_LIBRARY_FACILITY',
        name: '9. Laboratory Equipment & Computing Facility Ledger',
        category: 'Academics & Labs',
        description: 'Stock register bills showing licensed software, computer terminals, and lab machinery.',
        status: 'UPLOADED_VALID',
        fileName: 'Lab_Equipment_Ledger.pdf',
        fileSize: '2.2 MB',
        uploadDate: '2026-10-25',
        expiryDate: 'Current Session',
        isExpired: false,
        tamperRiskScore: 6,
        ocrConfidence: 97.0,
        aiMessage: '✓ Lab machinery stock verified.'
      },
      {
        type: 'ANTI_RAGGING_AFFIDAVIT',
        name: '10. Anti-Ragging Committee Constitution & CCTV Undertaking',
        category: 'Governance & Discipline',
        description: 'Statutory affidavit undertaking compliance with Supreme Court of India anti-ragging mandates.',
        status: 'MISSING',
        aiMessage: '❌ MISSING MANDATORY DOCUMENT: Anti-Ragging Affidavit not uploaded.'
      }
    ]
  }
];

export const INSTITUTIONS_PRESETS: Institution[] = [
  {
    id: 'inst-1',
    name: 'SRM Institute of Engineering & Technology',
    code: 'AICTE-1-49281902',
    state: 'Tamil Nadu',
    district: 'Chennai',
    category: 'Engineering & Technology (UG & PG)',
    applicationType: 'Extension of Approval (EoA)',
    submissionDate: '2026-10-25',
    overallScore: 98,
    riskLevel: 'LOW',
    status: 'VERIFIED',
    totalStudents: 1200,
    totalFaculty: 82,
    campusAreaAcres: 12.5,
    builtUpAreaSqM: 28400,
    documentsCount: 10,
    flaggedIssuesCount: 0,
  },
  {
    id: 'inst-2',
    name: 'Apex Global College of Engineering & Research',
    code: 'AICTE-1-83921045',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    category: 'Engineering & Technology',
    applicationType: 'Intake Increase',
    submissionDate: '2026-10-22',
    overallScore: 52,
    riskLevel: 'MEDIUM',
    status: 'SUSPICIOUS',
    totalStudents: 960,
    totalFaculty: 49,
    campusAreaAcres: 7.2,
    builtUpAreaSqM: 15200,
    documentsCount: 10,
    flaggedIssuesCount: 3,
  },
  {
    id: 'inst-3',
    name: 'Vanguard Technical Academy & Management Campus',
    code: 'AICTE-1-99214732',
    state: 'Maharashtra',
    district: 'Pune Rural',
    category: 'Management & Polytechnic',
    applicationType: 'New Course Addition',
    submissionDate: '2026-10-25',
    overallScore: 18,
    riskLevel: 'CRITICAL',
    status: 'FLAGGED',
    totalStudents: 780,
    totalFaculty: 26,
    campusAreaAcres: 3.4,
    builtUpAreaSqM: 8100,
    documentsCount: 10,
    flaggedIssuesCount: 5,
  }
];

export const MOCK_DOCUMENTS: Record<string, VerificationDocument[]> = {
  'inst-1': [
    {
      id: 'doc-101',
      title: 'State Fire & Rescue Services NOC (Renewal)',
      category: 'Safety & Fire',
      fileName: 'Fire_Safety_NOC_2026_Chennai_Div.pdf',
      fileSize: '2.4 MB',
      uploadDate: '2026-10-12',
      status: 'VERIFIED',
      ocrConfidence: 99.2,
      tamperRiskScore: 4,
      metadataAnalysis: {
        softwareUsed: 'Adobe Acrobat DC 22.0 (Official Govt Scanner)',
        originalCreationDate: '2026-09-20 11:32:04',
        modifiedDate: '2026-09-20 11:32:04',
        anomalyDetected: false,
      },
      elaForensics: {
        elaScore: 3,
        tamperedRegionsCount: 0,
      },
      extractedFields: {
        'NOC Number': 'FRS/TN/CHN/2026/8942',
        'Valid Until': '2027-09-30',
        'Hydrant Pressure': '4.2 bar (Compliant)',
        'Approved Occupancy': '1,800 persons',
        'Issuing Officer': 'Station Officer, Guindy Division'
      },
      rulesChecked: [
        {
          ruleId: 'R-FIRE-01',
          ruleName: 'Validity Check',
          clause: 'APH 2024-27 Sec 6.4.1',
          passed: true,
          details: 'NOC valid till 30-Sep-2027 (covers complete academic year)'
        }
      ]
    },
    {
      id: 'doc-102',
      title: 'Registered Land Sale Deed & Encumbrance Certificate',
      category: 'Land & Legal',
      fileName: 'Land_Registration_Deed_SubRegistrar.pdf',
      fileSize: '5.1 MB',
      uploadDate: '2026-10-14',
      status: 'VERIFIED',
      ocrConfidence: 98.7,
      tamperRiskScore: 2,
      metadataAnalysis: {
        softwareUsed: 'Canon imageRUNNER ADVANCE Scanner',
        originalCreationDate: '2026-08-11 14:15:00',
        modifiedDate: '2026-08-11 14:15:00',
        anomalyDetected: false,
      },
      elaForensics: {
        elaScore: 2,
        tamperedRegionsCount: 0,
      },
      extractedFields: {
        'Survey Numbers': 'Survey Nos. 142/1, 142/2B, 143/4',
        'Total Contiguous Area': '12.50 Acres (50,585 Sq. Meters)',
        'Land Use Conversion': 'Educational / Institutional Approved',
        'Mortgage / Encumbrance': 'Nil (Clean Title Deed)'
      },
      rulesChecked: [
        {
          ruleId: 'R-LAND-01',
          ruleName: 'Contiguity & Area Sufficiency',
          clause: 'APH 2024-27 Chapter IV Norms',
          passed: true,
          details: '12.5 Acres exceeds urban threshold minimum of 7.5 Acres'
        }
      ]
    }
  ],

  'inst-2': [
    {
      id: 'doc-201',
      title: 'State Fire & Emergency Services NOC',
      category: 'Safety & Fire',
      fileName: 'Fire_NOC_Karnataka_Station_West.pdf',
      fileSize: '1.9 MB',
      uploadDate: '2026-10-21',
      status: 'FLAGGED',
      ocrConfidence: 94.1,
      tamperRiskScore: 52,
      metadataAnalysis: {
        softwareUsed: 'PDF-XChange Editor v9.1',
        originalCreationDate: '2024-05-10 10:20:00',
        modifiedDate: '2026-09-18 16:44:11',
        anomalyDetected: true,
        anomalyDetails: 'Document expired on 2026-05-09 (172 days ago). Renewal order missing.'
      },
      elaForensics: {
        elaScore: 45,
        tamperedRegionsCount: 1,
        suspiciousDescription: 'Bounding box [X:340, Y:610] around validity date shows local high-frequency noise variance.'
      },
      extractedFields: {
        'NOC Number': 'K-FIRE/BLR/2024/0931',
        'Valid Until': '2026-05-09 (EXPIRED 172 DAYS AGO)',
        'Extracted Extension Stamp': 'Unverified handwritten endorsement'
      },
      rulesChecked: [
        {
          ruleId: 'R-FIRE-01',
          ruleName: 'Validity Check',
          clause: 'APH 2024-27 Sec 6.4.1',
          passed: false,
          details: 'Document has lapsed. Renewal application receipt provided without final approval certification.'
        }
      ]
    }
  ],

  'inst-3': [
    {
      id: 'doc-301',
      title: 'Land Ownership Registry & Municipal Mutation Order',
      category: 'Land & Legal',
      fileName: 'Pune_Collector_Office_Land_Mutation_7-12.pdf',
      fileSize: '3.1 MB',
      uploadDate: '2026-10-24',
      status: 'REJECTED',
      ocrConfidence: 86.3,
      tamperRiskScore: 94,
      metadataAnalysis: {
        softwareUsed: 'Adobe Photoshop 2024 (Macintosh)',
        originalCreationDate: '2023-01-14 08:11:00',
        modifiedDate: '2026-10-23 23:45:12 (Night before submission)',
        anomalyDetected: true,
        anomalyDetails: 'Direct metadata traces from Adobe Photoshop CC with history state: "Clone Stamp Tool" on acreage numerical values.'
      },
      elaForensics: {
        elaScore: 94,
        tamperedRegionsCount: 3,
        suspiciousDescription: 'Acreage number "3.4 Acres" was pasted over original text "1.4 Acres". Official Government Tehsildar rubber stamp has cloned pixel artifacts.'
      },
      extractedFields: {
        'Survey Number': 'Gat No. 89/1B, Haveli Taluk',
        'Claimed Area': '3.40 Acres',
        'True Government Revenue Record': '1.40 Acres (DEFICIT OF 2.0 ACRES)',
        'Tamper Assessment': 'HIGH CERTAINTY FORGERY'
      },
      rulesChecked: [
        {
          ruleId: 'R-LAND-01',
          ruleName: 'Land Acreage AICTE Threshold',
          clause: 'APH 2024-27 Chapter IV Table 4.1',
          passed: false,
          details: 'Institutional land fails minimum requirements. Document contains fraudulent alteration.'
        }
      ]
    }
  ]
};

export const MOCK_GHOST_FACULTY: GhostFacultyAlert[] = [
  {
    id: 'gf-1',
    facultyName: 'Dr. Ramesh Chandra Verma',
    designation: 'Professor & Head (Computer Science)',
    department: 'Computer Science & Engineering',
    aadhaarHash: 'SHA256:7b92...8f31',
    panNumber: 'ABC***782K',
    institutionsInvolved: [
      {
        institutionName: 'Vanguard Technical Academy (Pune)',
        role: 'Full-Time Professor & HOD',
        reportedSalary: '₹1,65,000 / month',
        overlapPeriod: 'Jan 2025 - Present (Concurrent)'
      },
      {
        institutionName: 'Sahyadri Institute of Technology (Navi Mumbai)',
        role: 'Full-Time Dean (Academics)',
        reportedSalary: '₹1,80,000 / month',
        overlapPeriod: 'Aug 2023 - Present (Concurrent)'
      }
    ],
    severity: 'CRITICAL',
    status: 'PROVEN_DUPLICATE'
  },
  {
    id: 'gf-2',
    facultyName: 'Dr. Sunita K. Deshmukh',
    designation: 'Associate Professor (Electrical Engg)',
    department: 'Electrical & Electronics',
    aadhaarHash: 'SHA256:4a19...99bc',
    panNumber: 'BTP***419Q',
    institutionsInvolved: [
      {
        institutionName: 'Vanguard Technical Academy (Pune)',
        role: 'Associate Professor',
        reportedSalary: '₹1,15,000 / month',
        overlapPeriod: 'June 2025 - Present'
      },
      {
        institutionName: 'Marathwada Engineering College (Aurangabad)',
        role: 'Associate Professor',
        reportedSalary: '₹1,20,000 / month',
        overlapPeriod: 'Feb 2024 - Present'
      }
    ],
    severity: 'CRITICAL',
    status: 'PROVEN_DUPLICATE'
  },
  {
    id: 'gf-3',
    facultyName: 'Prof. Ankit Rajesh Sharma',
    designation: 'Assistant Professor (Mechanical)',
    department: 'Mechanical Engineering',
    aadhaarHash: 'SHA256:1f42...009a',
    panNumber: 'CKL***112M',
    institutionsInvolved: [
      {
        institutionName: 'Apex Global College of Engineering (Bengaluru)',
        role: 'Assistant Professor',
        reportedSalary: '₹68,000 / month',
        overlapPeriod: 'Sept 2025 - Present'
      },
      {
        institutionName: 'Kaveri Valley Institute of Tech (Mysuru)',
        role: 'Assistant Professor',
        reportedSalary: '₹65,000 / month',
        overlapPeriod: 'Oct 2024 - Present'
      }
    ],
    severity: 'HIGH',
    status: 'PENDING_EXPLANATION'
  }
];

export const MOCK_REGULATORY_RULES: Record<string, RegulatoryRule[]> = {
  'inst-1': [
    {
      id: 'RULE-1',
      code: 'AICTE-APH-SFR-UG',
      name: 'Student-to-Faculty Ratio (SFR)',
      handbookSection: 'APH 2024-27 Chapter VII Clause 7.1',
      category: 'Faculty & Cadre',
      formulaOrNorm: 'Intake / Approved Full-Time Faculty <= 15.0',
      institutionValue: '1:14.6',
      thresholdValue: '<= 1:15.0',
      passed: true,
      variance: '+2.6% safety margin',
      severity: 'CRITICAL'
    },
    {
      id: 'RULE-2',
      code: 'AICTE-APH-CADRE',
      name: 'Cadre Proportion Ratio',
      handbookSection: 'APH 2024-27 Chapter VII Clause 7.4',
      category: 'Faculty & Cadre',
      formulaOrNorm: '1 Professor : 2 Assoc. Professor : 6 Asst. Professor',
      institutionValue: '1 : 2.0 : 3.8',
      thresholdValue: '1 : 2 : 6',
      passed: true,
      variance: 'Sufficient senior doctorates',
      severity: 'MAJOR'
    },
    {
      id: 'RULE-3',
      code: 'AICTE-APH-LAND',
      name: 'Minimum Contiguous Land Area',
      handbookSection: 'APH 2024-27 Chapter IV Table 4.1',
      category: 'Land & Built-up',
      formulaOrNorm: 'Urban >= 7.5 Acres | Mega/Metro >= 2.5 Acres',
      institutionValue: '12.5 Acres',
      thresholdValue: '>= 7.5 Acres',
      passed: true,
      variance: '+5.0 Acres above norm',
      severity: 'CRITICAL'
    },
    {
      id: 'RULE-4',
      code: 'AICTE-APH-FIRE-NOC',
      name: 'Statutory Fire Safety Compliance',
      handbookSection: 'APH 2024-27 Section 6.4',
      category: 'Safety & Environment',
      formulaOrNorm: 'Valid State Fire & Rescue Services NOC covering academic session',
      institutionValue: 'Valid until Sept 2027',
      thresholdValue: 'Active & Unexpired',
      passed: true,
      variance: 'Fully compliant',
      severity: 'CRITICAL'
    }
  ],
  'inst-2': [
    {
      id: 'RULE-1',
      code: 'AICTE-APH-SFR-UG',
      name: 'Student-to-Faculty Ratio (SFR)',
      handbookSection: 'APH 2024-27 Chapter VII Clause 7.1',
      category: 'Faculty & Cadre',
      formulaOrNorm: 'Intake / Approved Full-Time Faculty <= 15.0',
      institutionValue: '1:19.5',
      thresholdValue: '<= 1:15.0',
      passed: false,
      variance: '-30% deficient faculty staff',
      severity: 'CRITICAL'
    },
    {
      id: 'RULE-2',
      code: 'AICTE-APH-FIRE-NOC',
      name: 'Statutory Fire Safety Compliance',
      handbookSection: 'APH 2024-27 Section 6.4',
      category: 'Safety & Environment',
      formulaOrNorm: 'Valid State Fire & Rescue Services NOC',
      institutionValue: 'Expired 2026-05-09 (172 days ago)',
      thresholdValue: 'Active & Unexpired',
      passed: false,
      variance: 'Expired 172 days ago',
      severity: 'CRITICAL'
    }
  ],
  'inst-3': [
    {
      id: 'RULE-1',
      code: 'AICTE-APH-LAND',
      name: 'Minimum Contiguous Land Area',
      handbookSection: 'APH 2024-27 Chapter IV Table 4.1',
      category: 'Land & Built-up',
      formulaOrNorm: 'Non-Metro >= 5.0 Acres',
      institutionValue: '1.40 Acres Actual (3.4 claimed fraudulently)',
      thresholdValue: '>= 5.0 Acres',
      passed: false,
      variance: '-3.6 Acres deficit + Land Deed Tampered',
      severity: 'CRITICAL'
    },
    {
      id: 'RULE-2',
      code: 'AICTE-APH-GHOST',
      name: 'Faculty Authenticity & Deduplication',
      handbookSection: 'AICTE Anti-Fraud Directive 2025/11',
      category: 'Faculty & Cadre',
      formulaOrNorm: 'Zero overlap in full-time regulatory appointments',
      institutionValue: '3 Concurrent Ghost Faculty Detected',
      thresholdValue: '0 Conflicts',
      passed: false,
      variance: 'Illegal concurrent employment',
      severity: 'CRITICAL'
    }
  ]
};
