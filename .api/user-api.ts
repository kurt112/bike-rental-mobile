import {axiosSubmit, graphQl} from "../.config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { path } from "../utils/api/endpoint";

export const getUserDataByToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('The token', token);
    
    const query = () => {
        return {
            query: `query{
                        getUserById(token:"${token}") {  
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
                        }`
        }
    };
    const {data} = await graphQl.post('', query());
    return data.data.getUserById;
}

export const checkIfUserIsRenting = async () => {
    const token = await AsyncStorage.getItem('token');

    const {data} = await axiosSubmit.get(path.customer+'/'+token+'/isRenting').then(data => {
        if(!data.data) return 0;
        return data.data;
    }).catch(error => {
        console.log(error)
    });

    return data;
}
