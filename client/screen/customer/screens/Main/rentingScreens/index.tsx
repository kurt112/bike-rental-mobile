import {Fragment} from "react";
import Map from "../../../map";
import CustomerBill from "../../../CustomerBill";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomerProfile from "../../Profile";
import { RFPercentage } from "react-native-responsive-fontsize";

const Tab = createBottomTabNavigator();
const RentingScreens = ({
                            navigation
                        }: any) => {
    return <Fragment>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    let iconName;

                    switch (route.name){
                        case 'Map':
                            iconName = 'map-outline'
                            break;
                        case 'Bill':
                            iconName = 'card-outline'
                            break;
                        case 'Profile':
                            iconName = 'person-circle-outline'
                            break;
                        default:
                            iconName = 'help-outline'
                            break;
                    }


                    // You can return any component that you like here!
                    return <Ionicons name={`${iconName}`} size={RFPercentage(3.5)} style={{fontSize: RFPercentage(4)}} color={'white'} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                headerShown: false,
                tabBarActiveBackgroundColor: '#205adc',
                tabBarInactiveBackgroundColor: '#2089dc'
            })}>
            <Tab.Screen
                name={'Map'}
                component={Map}
            />
            <Tab.Screen
                name={'Profile'}
                component={CustomerProfile}
            />
            <Tab.Screen
                name={'Bill'}
                component={CustomerBill}
            />

        </Tab.Navigator>
    </Fragment>
}

export default RentingScreens