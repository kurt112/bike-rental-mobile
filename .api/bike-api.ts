import {getBikeStatus} from "../utils/bike";
import {graphQl} from "../.config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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