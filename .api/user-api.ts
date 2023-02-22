import {graphQl} from "../.config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserDataByToken = async () => {
    const token = await AsyncStorage.getItem('token');
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