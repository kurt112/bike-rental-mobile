import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./client/screen/auth/Login";
import customerMainScreen from "./client/screen/customer";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name={'Login'}
              component={Login}
              options={{
                title: 'Login'
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
        </Stack.Navigator>
      </NavigationContainer>
  );
}
