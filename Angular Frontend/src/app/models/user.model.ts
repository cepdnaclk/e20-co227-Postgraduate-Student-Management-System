export interface User {
    username: '',
    name: '',
    email: '',
    contactNumber: '',
}

export interface staff {
    username: string;
    name: string;
    email: string;
    contactNumber: string;
    roles: string[]; // Add this property
}

// //To change the password
// export interface ExistingUser {
//     password: string;
//     email: string;
// }