import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./client/screen/auth/Login";
import customerMainScreen from "./client/screen/customer";
import RequestNow from "./client/screen/customer/screens/bike/action/request-now";
import BikeNavigation from "./navigation/Bike";
import AdminMainScreen from "./client/screen/admin";
import Register from './client/screen/auth/Register';

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
                 <Stack.Screen
                    name={'Register'}
                    component={Register}
                    options={{
                        title: 'Register'
                    }}
                />
                <Stack.Screen name="Customer Screen"
                              component={customerMainScreen}
                              options={
                                  {
                                      title: 'Bike Rental',
                                      navigationBarHidden: true,
                                      headerShown: false
                                  }
                              }
                />

                <Stack.Screen name="Admin Screen"
                              component={AdminMainScreen}
                              options={
                                  {
                                      title: 'Admin Screen',
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
