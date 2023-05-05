import { Button, Input, Text } from "@rneui/base";
import { Fragment, useState } from "react";
import { ScrollView, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CustomerCreate } from "../../../.types/customer";
import { UserCreate } from "../../../.types/user";
import { success } from "../../../style";
import styles from "../style/LoginStyle";
import { StyleSheet } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../../utils/date";
import { handleSubmitCustomer } from "../../../.api/customer-api";
import { log } from "react-native-reanimated";
import { SelectList } from "react-native-dropdown-select-list";

const Register = () => {
    const [user, setUser] = useState<UserCreate>({
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "Male",
        password: "",
        birthdate: new Date(),
        cellphone: "",
        userRole: "customer",
        isAccountNotExpired: true,
        isAccountNotLocked: true,
        isCredentialNotExpired: true,
        isEnabled: true,
        isRenting: false
    });
    const [selected, setSelected] = useState<string>("Male");
    const [reTypePassword, setRetypePassword] = useState<string>('');
    const [birthdateOpen, setBirthdayOpen] = useState<boolean>(false);

    const changeUser = (data: string, target: string) => {
        const currentUser: any = { ...user }
        currentUser[target] = data;
        setUser(currentUser);
        const currentCustomer: CustomerCreate = { ...customer };
        currentCustomer.user = currentUser;
        setCustomer(currentCustomer);
    }


    const [customer, setCustomer] = useState<CustomerCreate>({
        user: user,
        toPay: 0,
        isMember: true,
        isActive: true
    });

    const data = [
        { key: '1', value: 'Male' },
        { key: '2', value: 'Female' },
    ]

    const _handleRegister = async () => {

        if(customer.user?.password !== reTypePassword){
            return alert('Passwords do not match');
        }

        await handleSubmitCustomer(customer).then(result => {
            const { data } = result;
            setUser({
                email: "",
                firstName: "",
                lastName: "",
                middleName: "",
                gender: selected,
                password: "",
                birthdate: new Date(),
                cellphone: "",
                userRole: "customer",
                isAccountNotExpired: true,
                isAccountNotLocked: true,
                isCredentialNotExpired: true,
                isEnabled: true,
                isRenting: false
            })
            setRetypePassword('')

            alert('registered')

        }).catch(error => {
            const { email, cellphone } = error;

            if (email) {
                alert(email);
            }

            if (cellphone) {
                alert(cellphone);
            }
        });


    }

    const _handleBirthdate = (date: any) => {
        changeUser(date, 'birthdate');
        setBirthdayOpen(false);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={thisStyle.inputs}>
                    <Input
                        value={user.firstName}
                        placeholder='Firstname'
                        onChangeText={(e) => changeUser(e, 'firstName')}
                    />
                </View>
                <View style={thisStyle.inputs}>
                    <Input
                        value={user.lastName}
                        placeholder='Lastname'
                        onChangeText={(e) => changeUser(e, 'lastName')}
                    />
                </View>
                <View style={thisStyle.inputs}>
                    <Input
                        value={user.middleName}
                        placeholder='Middle Name'
                        onChangeText={(e) => changeUser(e, 'middleName')}
                    />
                </View>
                <View style={thisStyle.inputs}>
                    <Input
                        value={user.email}
                        placeholder='Email'
                        onChangeText={(e) => changeUser(e, 'email')}
                    />
                </View>
                <View style={thisStyle.inputs}>
                    <Input
                        value={user.cellphone}
                        placeholder='Cellphone'
                        onChangeText={(e) => changeUser(e, 'cellphone')}
                    />
                </View>
                <View style={thisStyle.inputs}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
                        <View>
                            <Button titleStyle={thisStyle.buttonTitle} containerStyle={thisStyle.buttonSize} onPress={() => setBirthdayOpen(true)}>
                                Birthdate
                            </Button>
                        </View>
                        {
                            birthdateOpen ?
                                <RNDateTimePicker mode={'date'}
                                    onChange={(event, date) => _handleBirthdate(date)}
                                    maximumDate={new Date()}
                                    value={user.birthdate}
                                /> : null
                        }
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: RFPercentage(2.2), fontWeight: 'bold' }}>{user.birthdate === '' ? formatDate(new Date()) : formatDate(user.birthdate)}</Text>
                        </View>
                    </View>
                </View>

                <View style={thisStyle.inputs}>
                    <Input
                        value={user.password}
                        placeholder='password'
                        secureTextEntry={true}
                        onChangeText={(e) => changeUser(e, 'password')}
                    />
                </View>

                <View style={thisStyle.inputs}>
                    <Input
                        value={reTypePassword}
                        placeholder='Re-type Password'
                        secureTextEntry={true}
                        onChangeText={(e) => setRetypePassword(e)}
                    />
                </View>
                <View style={thisStyle.inputs}>
                    <SelectList
                        searchPlaceholder='Select Gender'
                        search={false}
                        setSelected={(val:string) => setSelected(val)}
                        data={data}
                        save='value'
                        defaultOption={{ key: '1', value: 'Male' }}
                    />
                </View>

                <Button
                    title={'Register'}
                    containerStyle={{
                        width: RFPercentage(50),
                        marginHorizontal: 50,
                        marginVertical: 10,
                        backgroundColor: 'pink'
                    }}
                    titleStyle={{ fontSize: RFPercentage(2) }}
                    style={{ backgroundColor: '#1E6738' }}
                    onPress={_handleRegister}
                />
            </View>
        </ScrollView>
    )
}

const thisStyle = StyleSheet.create({
    inputs: {
        width: '90%'
    },
    buttonTitle: {
        color: "white",
        fontSize: RFPercentage(1.5),
    },
    buttonSize: {
        width: RFPercentage(15)
    }
});

export default Register;
