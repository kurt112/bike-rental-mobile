import {Avatar} from "@rneui/base";
import {erickLogo} from "../../../image";
import {View} from "react-native";
import {Button, Input} from "@rneui/themed";
import {StatusBar} from "expo-status-bar";
import {useEffect, useState} from "react";
import styles from "../style/LoginStyle";
import {UserLogin} from "../../../.types/credential";
import {axiosSubmit} from "../../../.config/api";
import { path } from "../../../utils/api/endpoint";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { success } from "../../../style";
import { RFPercentage } from "react-native-responsive-fontsize";


const Login = ({
                   navigation
               }: any) => {

    const [cred, setCred] = useState<UserLogin>({
        username: '',
        password: ''
    });

    const [error,setError] = useState<string>('');

    const handlerChange = (value: string, key:string) => {
        const newCred:any = {...cred};
        newCred[key] = value;
        setCred(newCred)
    }

    const _handleLogin = async () => {
        await axiosSubmit.post(`${path.auth}/login`, cred).then(result => {            
            const {data} = result;
            const {token, user} = data;
                
             AsyncStorage.setItem(
                'user',
                JSON.stringify(user)
            );
             AsyncStorage.setItem(
                'token',
                token
            );
             AsyncStorage.setItem(
                'userID',
                user.id.toString()
            );
             AsyncStorage.setItem(
                'isRenting',
                user.isRenting.toString()
            );
             AsyncStorage.setItem(
                'userRole',
                user.userRole
            );    

            if(user.userRole === 'customer'){
                navigation.navigate('Customer Screen', {name: 'Customer Screen'})
            }else if(user.userRole === 'employee'){
            }else if(user.userRole === 'admin'){
                navigation.navigate('Admin Screen', {name: 'Admin Screen'})
            }

            setError('');

            setCred({
                username: '',
                password: ''
            })
        }).catch(error => {
            const {data} = error.response;

            setError(data.message);

            alert(data.message);
        }).finally(() => {
            
            
        })
    }


    return <View style={styles.container}>
        <Avatar
            size={"large"}
            rounded
            source={erickLogo}
        />
        <View style={styles.inputs}>
            <Input
                value={cred.username}
                placeholder='Email'
                onChangeText={(e) => handlerChange(e,'username')}
            />
            <Input
                value={cred.password}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(e) => handlerChange(e,'password')}
            />
        </View>
        <StatusBar style="auto"/>
        <Button
            title={'Login'}
            titleStyle={{fontSize: RFPercentage(2)}}
            containerStyle={{
                width: RFPercentage(40),
                marginHorizontal: 50,
                marginVertical: 10,
            }}
            onPress={_handleLogin}
        />
        <Button
            title={'Register'}
            containerStyle={{
                width: RFPercentage(40),
                marginHorizontal: 50,
                marginVertical: 10
            }}
            titleStyle={{fontSize: RFPercentage(2)}}
            style={{backgroundColor: success}}
            onPress={() => navigation.navigate('Register', {name: 'Register'})}
        />
    </View>
}


export default Login