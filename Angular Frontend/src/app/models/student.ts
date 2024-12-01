// export interface Student {
//     regNumber: '',
//     nameWithInitials: '',
//     contactNumber: '',
//     email: '',
//     address: '',
//     university: '',
//     programOfStudy: '',
//     status: '',
// }


// Assuming this is the structure of your Student model
export interface Student {
    regNumber: string;
    registrationNumber: string;
    nameWithInitials: string;
    programOfStudy: string;
    status: string;
    contactNumber: string;
    email: string;
    address: string;
    university: string;
    registeredDate?: Date;
  }