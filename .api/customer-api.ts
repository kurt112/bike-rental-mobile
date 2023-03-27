import {axiosGet, axiosSubmit, graphQl} from "../.config/api";
import moment from "moment";
import {CustomerCreate} from "../.types/customer";
import {UserValidationMessage} from "../.types/user";
import {path} from '../utils/api/endpoint'
import {  URLSearchParams } from 'react-native-url-polyfill';
import AsyncStorage from "@react-native-async-storage/async-storage";
/*export const handleSubmitCustomer = async (customer:CustomerCreate) => {
    return await axiosSubmit.post(path.customer,customer).then(ignored => {
        return Swal.fire(
            'Good Job!',
            'Create Customer Success!',
            'success'
        ).then(() => {

        })
    }).catch(error => {
        throw error.response.data;
    });
}*/

export const getCustomerBill = async (userId: any) => {

    const {data} = await axiosSubmit.get(path.customer+'/'+userId).then(data => {
        if(!data.data) return 0;
        return data.data;
    }).catch(error => {
    });

    return data;
}

export const handlePatchCustomer = async (customer:CustomerCreate) => {
    if(customer.user !== undefined){
        customer.user.birthdate = customer.user.birthdate?moment(customer.user.birthdate): moment();
    }

    // await axiosSubmit.patch(path.customer,customer).then(ignored => {
    //     Swal.fire(
    //         'Good Job!',
    //         'Update Customer Success!',
    //         'success'
    //     ).then(() => {})
    // }).catch(error => {
    //     throw error.response.data;
    // });
}

/*
export const handleDeleteCustomer = async (id: any) => {

    Swal.fire({
        title: 'Are you sure you want to delete this customer?',
        text: "this action is irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const params = new URLSearchParams();
            params.append('id',id);

            axiosSubmit.delete(path.customer,{
                params
            }).then(ignored => {
                Swal.fire({
                    title: 'Delete Success',
                    timer: 2000,
                    icon: 'success'
                }).then((ignored) => {
                    history.back();
                })
            }).catch(error => {
                Swal.fire({
                    title: 'Error Found',
                    icon: 'warning',
                    text: error
                }).then((ignored) => {
                    history.back();
                })
            });
        }
    })
}*/

/*
export const handleApproveRequestByCustomer = async (userId:string, bikeId: string) => {

    const params = new URLSearchParams();

    params.append('userId',userId);
    params.append('bikeId',bikeId);


    await axiosSubmit.post(`${path.bike}/request/approved`,params).then(ignored => {
        Swal.fire(
            'Approved!',
            'The request for bike is approved',
            'success'
        ).then(() => {
            location.reload();
        })
    }).catch(error => {
    });
}
*/
export const getCustomerData = async (id:any) => {
    const query = () => {
        return {
            query: `query{
                        customerById(id:${id}) {  
                                id,
                                isActive,
                                user{
                                   id,
                                   email,
                                   firstName,
                                   middleName,
                                   lastName,
                                   gender,
                                   password,
                                   birthdate,
                                   userRole,
                                   cellphone,
                                   isAccountNotExpired,
                                   isAccountNotLocked,
                                   isCredentialNotExpired
                                }
                             }
                        }`
        }
    };
    const {data} = await graphQl.post('', query());
    return data.data.customerById;
}
export const getCustomers = async (search:any, page:any, size:any, status:any) => {
    const query = () => {
        return {
            query: `query{
                        customers(search:"${search}",page:${page}, size: ${size}, status:${status}) {  
                                user{
                                   id,
                                   email,
                                   firstName,
                                   middleName,
                                   lastName,
                                   gender,
                                   password,
                                   birthdate,
                                   userRole,
                                   cellphone,
                                   isAccountNotExpired,
                                   isAccountNotLocked,
                                   isCredentialNotExpired
                                },
                                 id,
                                 toPay,
                                 isMember,
                                 lastBilled,
                                 nextBilled,
                                 createdAt,
                                 updatedAt
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());

    return data.data.customers;
}

export const customerSettings = async () => {
    return await axiosGet.get('customer/settings').then(result => result.data.data)
}

export const validateRegisterCustomerApi  = (validation:UserValidationMessage, error: any): UserValidationMessage =>  {
    if(error['cellphone']) {
        validation.cellphone.message  = error['cellphone'];
        validation.cellphone.exist = true;
    }

    if(error['email']){
        validation.email.message  = error['email'];
        validation.email.exist = true;
    }

    return validation;
}

export const validateRegisterCustomerClient  = (validation:UserValidationMessage, customer: CustomerCreate): UserValidationMessage =>  {

    const {user} = customer;




    return validation;
}

export const validateCustomer = (validation: UserValidationMessage, customer: CustomerCreate, setValidation: any, reTypePassword: string) => {
    const tempValidation: UserValidationMessage = {...validation}

    // ui validation
    if (customer.user?.password !== reTypePassword) {
        tempValidation.password.exist = true;
        tempValidation.password.message = "Password do not match";
        setValidation(tempValidation);
        return;
    }else {
        tempValidation.password.exist = false;
    }
}

export const checkIfUserIsRenting = async () => {
    const token = await AsyncStorage.getItem('token')

    const {data} = await axiosSubmit.get(path.customer+'/'+token+'/isRenting').then(data => {
        if(!data.data) return 0;
        return data.data;
    }).catch(error => {
    });

    return data;
}

export const handleUploadReceiptCustomer = async (picture: any) => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();

    params.append('token',""+token);
    params.append('picture',picture);


    return await axiosSubmit.post(path.customer+ '/receipt',params).then(data => {
        return data;
    }).catch(error => {
    });
}
