import {Validation} from "./validation";
import {CustomerCreate} from "./customer";

export interface BikeObject{
    name: string,
    description: string,
    price: number,
    quantity: number,
    size: number,
    brand: string,
    code: string,
    bikePictures: bikePictures[],
    status: number,
    id?: string,
    startBarrow?: any | Date,
    endBarrow?: any | Date,
    parentBike?:BikeObject,
    latitude?:string,
    longitude?:string,
    assignedCustomer?: CustomerCreate,
    isAvailable: boolean
}

interface bikePictures{
    id: number,
    pictureName: string | null
}

export const bikeColumns:string[] = ['code', 'name/model', 'description', 'price/hr', 'quantity', 'profile'];

export interface BikeValidationMessage {
    name: Validation,
    description: Validation,
    price: Validation,
    quantity: Validation,
    size: Validation,
    brand: Validation,
    code: Validation,
    bikePictures: Validation,
    startBarrow?: Validation,
    endBarrow?: Validation
}
export const bikeInitValidation:BikeValidationMessage = {
    name: {message:'', exist: false},
    description: {message:'', exist: false},
    price: {message:'', exist: false},
    quantity: {message:'', exist: false},
    size:{message:'', exist: false},
    brand:{message:'', exist: false},
    code:{message:'', exist: false},
    bikePictures:{message:'', exist: false},
}
