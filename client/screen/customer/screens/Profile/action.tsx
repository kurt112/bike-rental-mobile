import {Fragment} from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";
import AuthNavigation from "../../../../../navigation/Auth";
import {success} from "../../../../../style";

const ClientAction = ({
                          navigation
                      }: any) => {
    const _handleChangePass = () => {
        alert('to be implemented task by joselito')
    }
    return <Fragment>
        <View style={styles.buttonContainer}>
            <Button size="md" color='error' style={styles.button}
                    onPress={() => navigation.navigate(AuthNavigation.Login.name, {name: AuthNavigation.Login.name})}>
                Logout
            </Button>
            <View style={{marginTop: 10}}></View>
            <Button size="md" color={success} style={styles.button}
                    onPress={_handleChangePass}>
                Change Password
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