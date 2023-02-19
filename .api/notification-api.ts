import {graphQl} from "../.config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNotifications = async (page: any, size: any) => {
    const token = await AsyncStorage.getItem('token');

    const query = () => {
        return {
            query: `query{
                        getNotifications(page:${page}, size: ${size}, token:"${token}") {  
                                id,
                                message,
                                createdAt,
                                link,
                                from{
                                    id,
                                    firstName,
                                    lastName
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());
    return data.data.getNotifications;
}
