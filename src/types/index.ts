export type UserRole = 'COLLEGE' | 'AICTE_OFFICER';

export interface UserSession {
  role: UserRole;
  userId: string;
  name: string;
  institutionCode?: string;
  department?: string;
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type VerificationStatus = 'VERIFIED' | 'FLAGGED' | 'SUSPICIOUS' | 'PENDING' | 'REJECTED';
export type ApplicationReviewStatus = 
  | 'DRAFT'
  | 'SUBMITTED_TO_AICTE'
  | 'UNDER_AICTE_REVIEW'
  | 'DEFICIT_NOTICE_ISSUED'
  | 'APPROVED'
  | 'REJECTED';

export type MandatoryDocType = 
  | 'LAND_DEED'
  | 'FIRE_NOC'
  | 'BUILDING_STABILITY'
  | 'ARCHITECTURAL_PLAN'
  | 'FACULTY_ROLL'
  | 'POLLUTION_NOC'
  | 'WATER_SANITATION'
  | 'AUDITED_FINANCIALS'
  | 'LAB_LIBRARY_FACILITY'
  | 'ANTI_RAGGING_AFFIDAVIT';

export interface MandatoryDocRequirement {
  type: MandatoryDocType;
  name: string;
  category: string;
  description: string;
  status: 'UPLOADED_VALID' | 'UPLOADED_EXPIRED' | 'UPLOADED_TAMPERED' | 'MISSING';
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  expiryDate?: string;
  isExpired?: boolean;
  daysExpiredOrLeft?: number;
  aiMessage?: string;
  tamperRiskScore?: number;
  ocrConfidence?: number;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'danger' | 'warning' | 'success' | 'info';
  timestamp: string;
  relatedDoc?: string;
}

export interface InstitutionApplication {
  id: string;
  collegeName: string;
  collegeCode: string;
  loginId: string;
  password?: string;
  state: string;
  district: string;
  category: string;
  applicationType: 'Extension of Approval (EoA)' | 'New Institution' | 'Intake Increase' | 'New Course Addition';
  submissionDate: string;
  reviewStatus: ApplicationReviewStatus;
  overallScore: number;
  riskLevel: RiskLevel;
  totalStudents: number;
  totalFaculty: number;
  campusAreaAcres: number;
  builtUpAreaSqM: number;
  mandatoryDocs: MandatoryDocRequirement[];
  officerDecision?: {
    officerName: string;
    officerId: string;
    decisionDate: string;
    remarks: string;
    approvalCertificateHash?: string;
  };
  notifications: SystemNotification[];
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  category: string;
  applicationType: 'Extension of Approval (EoA)' | 'New Institution' | 'Intake Increase' | 'New Course Addition';
  submissionDate: string;
  overallScore: number;
  riskLevel: RiskLevel;
  status: VerificationStatus;
  totalStudents: number;
  totalFaculty: number;
  campusAreaAcres: number;
  builtUpAreaSqM: number;
  documentsCount: number;
  flaggedIssuesCount: number;
}

export interface VerificationDocument {
  id: string;
  title: string;
  category: 'Land & Legal' | 'Safety & Fire' | 'Faculty Ledger' | 'Building & Infrastructure' | 'Financial & Audit';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: VerificationStatus;
  ocrConfidence: number;
  tamperRiskScore: number;
  metadataAnalysis: {
    softwareUsed?: string;
    originalCreationDate?: string;
    modifiedDate?: string;
    anomalyDetected: boolean;
    anomalyDetails?: string;
  };
  elaForensics: {
    elaScore: number;
    tamperedRegionsCount: number;
    suspiciousDescription?: string;
  };
  extractedFields: Record<string, string | number>;
  rulesChecked: {
    ruleId: string;
    ruleName: string;
    clause: string;
    passed: boolean;
    details: string;
  }[];
}

export interface GhostFacultyAlert {
  id: string;
  facultyName: string;
  designation: string;
  department: string;
  aadhaarHash: string;
  panNumber: string;
  institutionsInvolved: {
    institutionName: string;
    role: string;
    reportedSalary: string;
    overlapPeriod: string;
  }[];
  severity: 'HIGH' | 'CRITICAL';
  status: 'PENDING_EXPLANATION' | 'PROVEN_DUPLICATE' | 'RESOLVED';
}

export interface RegulatoryRule {
  id: string;
  code: string;
  name: string;
  handbookSection: string;
  category: 'Faculty & Cadre' | 'Land & Built-up' | 'Safety & Environment' | 'Equipment & Labs' | 'Governance';
  formulaOrNorm: string;
  institutionValue: string | number;
  thresholdValue: string | number;
  passed: boolean;
  variance: string;
  severity: 'CRITICAL' | 'MAJOR' | 'MINOR';
}
