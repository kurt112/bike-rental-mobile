import {UserCreate} from "./user";

export interface EmployeeCreate {
    user: UserCreate | undefined,
    isActive: boolean,
}


export const employeeColumns:string[] = ['First Name', 'Last Name', 'Email', 'Cellphone','Birthdate', 'Gender', 'Profile'];
