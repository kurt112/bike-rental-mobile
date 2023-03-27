import {Fragment, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";
import AuthNavigation from "../../../../../navigation/Auth";
import {danger, faded, info, success} from "../../../../../style";
import { RFPercentage } from "react-native-responsive-fontsize";
import {checkIfUserIsRenting} from '../../../../../.api/customer-api'
import AsyncStorage from "@react-native-async-storage/async-storage";
const ClientAction = ({
                          navigation
                      }: any) => {
                        
    useEffect(() => {
        setup().then(ignored => {})
    }, []);

    const setup = async () => {
        const isCustomer = await AsyncStorage.getItem('userRole')
        const isRenting = await AsyncStorage.getItem('isRenting')
    }

    
    return <Fragment>
        <View style={styles.buttonContainer}>
            <View style={{marginTop: 10}}></View>
            <Button size="md" color={danger} style={styles.button}
                    onPress={() => navigation.navigate(AuthNavigation.Login.name, {name: AuthNavigation.Login.name})}
                    titleStyle={{fontSize: RFPercentage(2.5)}}
                    containerStyle={{width: RFPercentage(50)}}
                    >
                Logout
            </Button>
        </View>
    </Fragment>
}
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingLeft: 10,
        paddingRight: 10,
        color: 'red'
    }
});
export default ClientAction;
