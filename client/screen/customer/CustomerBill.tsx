import {Fragment, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";

const CustomerBill = () => {
    const [bill,setBill] = useState(0);
    return (
        <Fragment>
            <View style={styles.container}>
                <Text>
                    Current Bill: {bill}
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
    }
});

export default CustomerBill;