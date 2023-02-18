import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./client/screen/auth/Login";
import customerMainScreen from "./client/screen/customer";
import RequestNow from "./client/screen/customer/screens/bike/action/request-now";
import BikeNavigation from "./navigation/Bike";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={'Login'}
                    component={Login}
                    options={{
                        title: 'Login',
                        navigationBarHidden: true,
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Your Screen"
                              component={customerMainScreen}
                              options={
                                  {
                                      title: 'Bike Rental',
                                      navigationBarHidden: true,
                                      headerShown: false
                                  }
                              }
                />


                <Stack.Screen name={BikeNavigation.Request.name}
                              component={RequestNow}
                              options={{
                                  title: BikeNavigation.Request.title
                              }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
