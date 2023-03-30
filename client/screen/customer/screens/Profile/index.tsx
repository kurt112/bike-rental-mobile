import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Tab, Text} from "@rneui/themed";
import UserData from "./data";
import ClientAction from "./action";
import NotificationScreen from "./notification";
import {getUserDataByToken} from "../../../../../.api/user-api";
import {UserCreate} from "../../../../../.types/user";
import { RFPercentage } from "react-native-responsive-fontsize";

const CustomerProfile = ({
                             navigation
                         }: any) => {

    const [index, setIndex] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [user, setUser] = useState<UserCreate>({
        email: '',
        firstName: '',
        lastName: '',
        middleName: '',
        gender: '',
        password: '',
        birthdate: '',
        userRole: '',
        cellphone: '',
        isAccountNotExpired: true,
        isAccountNotLocked: true,
        isCredentialNotExpired: true,
        isEnabled: true,
        isRenting: false
    });

    useEffect(() => {
        fetchData().then(ignored => {
        })
    }, [])
    const fetchData = async () => {

        await getUserDataByToken().then(result => {
            setUser(result)
        })
    }

    return (
        <View style={styles.container}>
            <Avatar
                size={RFPercentage(10)}
                rounded
                title={`${user.firstName || user.firstName.length > 0 ? user.firstName[0].toUpperCase():'E'}${user.lastName ||user.lastName.length > 0 ? user.lastName[0].toUpperCase():'B'}`}
                containerStyle={{backgroundColor: 'indigo'}}
            >
                <Avatar.Accessory size={RFPercentage(3.5)} onPress={() => setIsEdit(true)}/>
            </Avatar>

            <View style={styles.nameContainer}>
                <Text style={styles.displayName}>
                    {/*{*/}
                    {/*    `${customer.user.firstName} ${customer.user.lastName}`*/}
                    {/*}*/}
                </Text>
            </View>

            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    width: 0,
                    backgroundColor: 'white'
                }}
                variant="primary"
            >
                <Tab.Item
                    title="Personal Info"
                    titleStyle={{fontSize: RFPercentage(1.5)}}
                    icon={{name: 'help-circle-outline', type: 'ionicon', color: 'white', size: RFPercentage(4)}}
                />
                <Tab.Item
                    title="Actions"
                    titleStyle={{fontSize: RFPercentage(1.5)}}
                    icon={{name: 'hammer-outline', type: 'ionicon', color: 'white',size: RFPercentage(4)}}
                />
                <Tab.Item
                    title="Notifications"
                    titleStyle={{fontSize: RFPercentage(1.5)}}
                    icon={{name: 'notifications-circle-outline', type: 'ionicon', color: 'white',size: RFPercentage(4)}}
                />
                {/*<Tab.Item*/}
                {/*    title="Profile"*/}
                {/*    titleStyle={{fontSize: 14, color:'green'}}*/}
                {/*    icon={{name: 'person-outline', type: 'ionicon', color: 'green'}}*/}
                {/*/>*/}
                {/*<Tab.Item*/}
                {/*    title="Bill"*/}
                {/*    titleStyle={{fontSize: 14, color:'green'}}*/}
                {/*    icon={{name: 'card-outline', type: 'ionicon', color: 'green'}}*/}
                {/*/>*/}

            </Tab>

            {
                index === 0
                    ?
                    <UserData isEdit={isEdit} user={user} setCustomer={setUser}
                              navigation={navigation}/> : index === 1 ?
                        <ClientAction navigation={navigation}/> :
                        <NotificationScreen/>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%'
    },
    nameContainer: {
        padding: RFPercentage(1)
    },
    displayName: {
        fontSize: RFPercentage(2),
        fontFamily: 'sans-serif-medium'
    }
});
export default CustomerProfile