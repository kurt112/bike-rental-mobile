import {Fragment, useEffect, useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomerProfile from "../../Profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BikeAvailable from "../../bike/available";
import BikeRequested from "../../bike/requested";
import {getBikeAvailable, getBikeByCustomer} from "../../../../../../.api/bike-api";
import {getBikeStatus} from "../../../../../../utils/bike";
import {BikeObject} from "../../../../../../.types/bike";
import {LogBox} from "react-native";
const Tab = createBottomTabNavigator();
const NotRentingScreens = (props:any) => {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const [available,setAvailable] = useState<BikeObject[]>();
    const [requested,setRequested] = useState<BikeObject[]>();

    useEffect(() => {
        getBikeByCustomer('').then(bikes => {
            const tempBikeRequested:BikeObject[] = [];
            bikes.forEach((bike: BikeObject) => {
                if (bike.status === getBikeStatus.FOR_REQUEST) {
                    tempBikeRequested.push(bike);
                }
            })
            setRequested(tempBikeRequested)
        })

        getBikeAvailable('', 1, 10).then(bikes => {
            setAvailable(bikes)
        })

    }, [])

    return (
        <Fragment>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: () => {
                        let iconName;

                        switch (route.name){
                            case 'Available':
                                iconName = 'bicycle-outline'
                                break;
                            case 'Requested':
                                iconName = 'reader-outline'
                                break;
                            case 'Profile':
                                iconName = 'person-circle-outline'
                                break;
                            default:
                                iconName = 'help-outline'
                                break;
                        }


                        // You can return any component that you like here!
                        return <Ionicons name={`${iconName}`} size={30} color={'white'} />;
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'white',
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#205adc',
                    tabBarInactiveBackgroundColor: '#2089dc'
                })}>
                <Tab.Screen
                    name={'Available'}
                    children={() => <BikeAvailable bikes={available}
                                                   setBikes={setAvailable}
                                                   setBikeRequested={setRequested}
                                                   {...props}
                    />
                }
                />
                <Tab.Screen
                    name={'Requested'}
                    children={()=><BikeRequested bikes={requested} setBikes={setRequested} {...props} />}
                />
                <Tab.Screen
                    name={'Profile'}
                    component={CustomerProfile}
                />

            </Tab.Navigator>
        </Fragment>
    )
}

export default NotRentingScreens