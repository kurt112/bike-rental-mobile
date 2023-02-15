import {Fragment} from "react";
import {Button, Text} from "@rneui/themed";
import {StyleSheet, View} from "react-native";
import {UserCreate} from "../../../../../.types/user";

interface props {
    user: UserCreate | undefined,
    setCustomer: any,
    isEdit: boolean
}

const UserData = (
    {
        user,
        setCustomer,
        isEdit
    }: props
) => {
    return (
        <Fragment>
            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.dataTitle}>First Name:</Text>
                </View>
                <View>
                    <Text style={styles.data}>{user?.firstName}</Text>
                </View>
            </View>
            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.dataTitle}>Middle Name:</Text>
                </View>
                <View>
                    <Text style={styles.data}>{user?.middleName}</Text>
                </View>
            </View>
            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.dataTitle}>Last Name:</Text>
                </View>
                <View>
                    <Text style={styles.data}>{user?.lastName}</Text>
                </View>
            </View>
            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.dataTitle}>Email:</Text>
                </View>
                <View>
                    <Text style={styles.data}>{user?.email}</Text>
                </View>
            </View>
            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.dataTitle}>Birthdate:</Text>
                </View>
                <View>
                    <Text style={styles.data}>{user?.birthdate}</Text>
                </View>
            </View>
            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.dataTitle}>Gender :</Text>
                </View>
                <View>
                    <Text style={styles.data}>{user?.gender}</Text>
                </View>
            </View>
            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.dataTitle}>Cellphone:</Text>
                </View>
                <View>
                    <Text style={styles.data}>{user?.cellphone}</Text>
                </View>
            </View>


            <View style={styles.dataContainer}>


                <Button size={'lg'} title='Cancel' color={'error'} />
                <Button size={'lg'} title='Save' color={'success'}/>
            </View>


        </Fragment>
    )
}

const styles = StyleSheet.create({
    dataContainer: {
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5
    },
    dataTitle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    data: {
        fontSize: 15
    }
});


export default UserData