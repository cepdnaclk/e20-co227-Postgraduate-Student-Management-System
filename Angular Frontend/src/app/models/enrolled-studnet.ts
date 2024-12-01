export interface EnrolledStudent {
    id: number;
    registrationNumber: string;
    nameWithInitials: string;
    fullName: string;
    contactNumber: string;
    email: string;
    address: string;
    publications: string;
    programOfStudy: string;
    status: string;
    registrationStatus: string;
    registeredDate: Date;
    studentIdDocument: string;
    studentIdDocumentOriginalName: string;
    birthCertificate: string;
    birthCertificateOriginalName: string;
    educationalQualifications: EducationalQualification[];
  }
  
  export interface EducationalQualification {
    id: number;
    university: string;
    fromDate: Date;
    toDate: Date;
    degree: string;
    field: string;
    attachments: FileMetadata[];
  }
  
  export interface FileMetadata {
    id: number;
    fileName: string;
    originalFileName: string;
    fileUrl: string;
  }
  