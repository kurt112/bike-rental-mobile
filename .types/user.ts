import {Validation} from "./validation";

export interface UserCreate {
    email: string,
    firstName: string,
    lastName: string,
    middleName: string,
    gender: string,
    password?: string,
    birthdate: any,
    userRole: string,
    cellphone: string,
    isAccountNotExpired: true,
    isAccountNotLocked: true,
    isCredentialNotExpired: true,
    isEnabled:true
    isRenting: false
}

export interface UserValidationMessage {
    email: Validation,
    firstName: Validation,
    lastName: Validation,
    middleName: Validation,
    gender: Validation,
    password: Validation,
    birthdate: Validation,
    cellphone: Validation,
}

export const userInitValidation:UserValidationMessage = {
    email: {message:'', exist: false},
    birthdate: {message:'', exist: false},
    cellphone: {message:'', exist: false},
    firstName: {message:'', exist: false},
    gender:{message:'', exist: false},
    lastName:{message:'', exist: false},
    middleName:{message:'', exist: false},
    password:{message:'', exist: false},
}

//     createdAt: Date,
//     updated_at: Date
// id: number,
