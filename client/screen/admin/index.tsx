import Ionicons from "react-native-vector-icons/Ionicons";
import Map from "../customer/map";
import CustomerProfile from "../customer/screens/Profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Requests from "./screens/Requests";
import Rented from "./screens/Rented";
import AdminMap from "./screens/Map";
import { RFPercentage } from "react-native-responsive-fontsize";

const Tab = createBottomTabNavigator();
const AdminMainScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    let iconName;

                    switch (route.name){
                        case 'Map':
                            iconName = 'map-outline'
                            break;
                        case 'Requests':
                            iconName = 'bookmark-outline'
                            break;
                        case 'Rented':
                            iconName = 'bicycle-outline'
                            break;
                        case 'Profile':
                            iconName = 'person-circle-outline'
                            break;
                        default:
                            iconName = 'help-outline'
                            break;
                    }


                    // You can return any component that you like here!
                    return <Ionicons name={`${iconName}`} size={RFPercentage(3.5)} color={'white'} style={{fontSize: RFPercentage(4)}}/>;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                headerShown: false,
                tabBarActiveBackgroundColor: '#205adc',
                tabBarInactiveBackgroundColor: '#2089dc'
            })}>
            <Tab.Screen
                name={'Map'}
                component={AdminMap}
            />
            <Tab.Screen
                name={'Requests'}
                component={Requests}
            />
            <Tab.Screen
                name={'Rented'}
                component={Rented}
            />
            <Tab.Screen
                name={'Profile'}
                component={CustomerProfile}
            />

        </Tab.Navigator>
    )
}

export default AdminMainScreen;