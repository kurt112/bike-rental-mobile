import {getBikeStatus} from "../utils/bike";
import {axiosCreate, graphQl} from "../.config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BikeObject} from "../.types/bike";
import {  URLSearchParams } from 'react-native-url-polyfill';

export const getBikeAvailable = async (search: any, page: any, size: any) => {
    const query = () => {
        return {
            query: `query{
                            bikes(search:"${search}",page:${page}, size: ${size}, status:${getBikeStatus.NOT_RENTED}) {  
                                brand,
                                price,
                                name,
                                quantity,
                                id,
                                description,
                                code
                                bikePictures{
                                    id,
                                    pictureName
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.bikes;
}

export const getBikeByCustomer = async (search: any) => {

    const token = await AsyncStorage.getItem('token');
    const query = () => {
        return {
            query: `query{
                        getBikeByCustomer(search:"${search}", token:"${token}") {  
                                brand,
                                price,
                                name,
                                quantity,
                                id,
                                description,
                                code,
                                status,
                                bikePictures{
                                    id,
                                    pictureName
                                },
                                parentBike{
                                    quantity,
                                     bikePictures{
                                        id,
                                        pictureName
                                     },
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.getBikeByCustomer;
}
export const getBikes = async (search: any, page: any, size: any, status: any) => {
    const query = () => {
        return {
            query: `query{
                        bikes(search:"${search}",page:${page}, size: ${size}, status:${status}) {  
                                brand,
                                price,
                                name,
                                quantity,
                                id,
                                description,
                                code,
                                startBarrow,
                                endBarrow,
                                longitude,
                                latitude,
                                assignedCustomer{
                                    user{
                                       id, 
                                       firstName,
                                       lastName,
                                       cellphone,
                                       email,
                                       validIdPhoto
                                    }
                                },
                                 bikePictures{
                                    id,
                                    pictureName
                                },
                                customerReceipt{
                                    picture
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.bikes;
}

export const getBikeByCustomerWithLocation = async (search: any) => {
    const token = await AsyncStorage.getItem('token');
    const query = () => {
        return {
            query: `query{
                        getBikeByCustomer(search:"${search}", token:"${token}") {  
                                id,
                                longitude,
                                latitude
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.getBikeByCustomer;
}

export const getBikeData = async (id: any) => {
    const query = () => {
        return {
            query: `query{
                        bikeById(id:"${id}") {  
                                size,
                                brand,
                                price,
                                name,
                                quantity,
                                id,
                                description,
                                code,
                                isAvailable,
                                bikePictures{
                                    id,
                                    pictureName
                                },
                                parentBike{
                                    id
                                }
                             }
                        }`
        }
    };
    const {data} = await graphQl.post('', query());

    return data.data.bikeById;
}

export const requestBikeByCustomer = async (bike: BikeObject) => {

    const token = await AsyncStorage.getItem('token');

    if (!bike.endBarrow) {
        alert('need date for end barrow')
        return;
    }

    if (!bike.startBarrow) {
        alert('need date for end barrow')
        return;
    }

    if (!token) {
        alert('No Token Found');
        return;
    }

    const startDate = new Date(bike.startBarrow);
    const endDate = new Date(bike.endBarrow);

    return await axiosCreate.post("bike/request/" + token + "/" + bike.id + '/' + startDate + '/' + endDate, bike).then(newBike => {
    });
}
export const cancelRequestBikeByCustomer = async (bikeId: string) => {
    const token = await AsyncStorage.getItem('token');
    const params = new URLSearchParams();

    if (!token) {
        alert('No Token Found');
        return;
    }

    params.append("token", token);
    params.append("bikeId", bikeId);

    await axiosCreate.post("bike/cancel",params).then(ignored => {
        return alert('Success Request Cancel')
    });
}

export const handleTerminateBikeByCustomer = async (userId: string, bikeId: string) => {

    const params = new URLSearchParams();
    params.append("userId", userId);
    params.append("bikeId", bikeId);

    await axiosCreate.post("bike/terminate", params).then(ignored => {
        alert('Terminate Success')
    }).then(() => {
        alert('Terminate Failed')
    });
}

export const handleApproveRequestByCustomer = async (userId: string, bikeId: string) => {

    const params = new URLSearchParams();
    params.append("userId", userId);
    params.append("bikeId", bikeId);

    await axiosCreate.post("bike/request/approval", params).then(ignored => {
        alert('Approve Success')
    }).catch(error => {
        alert('Error Detected')
    });
}

export const handleRejectBikeRequestBYCustomer = async (userId: string, bikeId: string) => {
    const params = new URLSearchParams();
    params.append("userId", userId);
    params.append("bikeId", bikeId);

    return await axiosCreate.post("bike/request/rejected", params).then(ignored => {});
}

export const updateBikeLocationByCustomer = async (lat:string,lng: string) => {
    const token = await AsyncStorage.getItem('token');

    if(token === undefined || token === null    ) return;

    const params = new URLSearchParams();
    params.append("lat", lat);
    params.append("lng", lng);
    params.append("token", token);

    await axiosCreate.post("bike/update/location", params).then(ignored => {});
}