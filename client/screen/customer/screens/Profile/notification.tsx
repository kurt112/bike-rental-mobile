import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import {getNotifications} from "../../../../../.api/notification-api";
import {getFromNowDate} from "../../../../../utils/date";

const NotificationScreen = () => {

    const [notifications,setNotifications] = useState([])

    useEffect(() => {
        getNotifications(1,100).then(notifications => {
            setNotifications(notifications)
        })
    }, [])
    return (
        <ScrollView style={styles.scrollContainer}>
            {
                notifications.map((notification: any) => {
                    return <View style={styles.container} key={notification.id}>
                        <View style={styles.notificationIcon}>
                            <Ionicons name={`md-person`} size={30} color={'#039BE5'} />
                        </View>
                        <View>
                            <View style={{display: 'flex', flexDirection:'row'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, textTransform: 'capitalize', marginRight: 5}}>{`${notification.from.firstName} ${notification.from.lastName}`}</Text>
                                <Text>{notification.message}</Text>
                            </View>
                            <Text>{getFromNowDate(notification.createdAt)}</Text>
                        </View>
                    </View>
                })
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 3,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white'

    },
    scrollContainer: {
        width: '100%',
        backgroundColor: '#EBEBEB'
    },
    notificationIcon: {
        marginRight: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default NotificationScreen