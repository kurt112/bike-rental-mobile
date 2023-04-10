import {StyleSheet, View, Text} from "react-native";
import React, {useEffect, useState} from "react"
import {getStoreData} from "../../../.api/store-api";
import {Store} from "../../../.types/store";
import * as Location from "expo-location";
import {getBikeByCustomerWithLocation, updateBikeLocationByCustomer} from "../../../.api/bike-api";
import MapView from "./screens/Map";
import Map from "./screens/Map";
const CustomerMap = () => {
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const [store, setStore] = useState<Store>({
        id: '',
        latitude: '',
        name: '',
        longitude: '',
        radius: '',
        scopeColor: '',
        scopeEdgeColor: ''
    });


    useEffect(() => {
        if (store.id === '') {
            getStoreData(1).then(store => {
                setStore(store);
            }).catch(error => {
            })
        }
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            getBikeByCustomerWithLocation('').then(bikeResult => {
            
            })
            setCurrentLocation().then();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
       if(location){
           updateBikeLocationByCustomer(location.latitude, location.longitude).then(ignored => {
           }).catch(ignored => {
               alert('Please turn on you gps')
           })
       }
    }, [location])

    const setCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});

        setLocation(location.coords);
    };
    return <View style={styles.container}>
        {
            store.id === '' ?
                <Text>No Data Found</Text> : <Map store={store} location={location}/>
        }

    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default CustomerMap