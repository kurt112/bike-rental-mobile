import {Fragment} from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";

const ClientAction = () => {
    return <Fragment>
        <View style={styles.buttonContainer}>
            <Button size="md" color='error' style={styles.button}>
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