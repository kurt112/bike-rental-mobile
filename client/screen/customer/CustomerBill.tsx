import {Fragment, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";
import { getCustomerBill } from "../../../.api/customer-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFPercentage } from "react-native-responsive-fontsize";

const CustomerBill = () => {
    const [bill,setBill] = useState(0);

    useEffect(() => {
        _handleGetCustomerBill().then(ignored => {})
    }, []);

    const _handleGetCustomerBill = async () => {
        const id = await AsyncStorage.getItem('userID');

        getCustomerBill(id).then(result => {
            setBill(result);
        })
    }

    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={styles.billFontSize}>
                    Current Bill
                </Text>
                <Text style={styles.billValueFontSize}>
                    {bill}
                </Text>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    billFontSize: {
        fontSize: RFPercentage(5),
        color:'black'
    },
    billValueFontSize: {
        fontSize: RFPercentage(10),
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        width: '100%'
    }
});

export default CustomerBill;