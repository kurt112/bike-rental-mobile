import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, View,Image} from "react-native";
import {Store} from "../../../../.types/store";
import {getStoreData} from "../../../../.api/store-api";
import {getBikes} from "../../../../.api/bike-api";
import {BikeObject} from "../../../../.types/bike";
import {getBikeStatus} from "../../../../utils/bike";
import MapView, {Circle, Marker} from "react-native-maps";
import {PROVIDER_GOOGLE} from 'react-native-maps'
import bikeMarker from '../../../../assets/_images/bike-marker.png';

const AdminMap = () => {

    const [bikes, setBikes] = useState<[BikeObject] | null>(null)

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
        const interval = setInterval(() => {
            getBikes("all", 0, 0, getBikeStatus.RENTED).then(result => {
                setBikes(result);
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [])

    return <View style={styles.container}>
        {
            store.id === '' ?
                <Text>No Data Found</Text> :

                <MapView 
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                         initialRegion={{
                             latitude: +store.latitude,
                             longitude: +store.longitude,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                         showsCompass={true}
                         
                >
                    <Marker
                        coordinate={{latitude: +store.latitude, longitude: +store.longitude}}
                        title={store.name}
                        description={store.name}
                    />
                    {
                        bikes?.map(bike => {
                            let name = 'No Customer Found';
                            if (bike.assignedCustomer?.user != undefined) {
                                const {user} = bike.assignedCustomer;
                                name = user.firstName + ' ' + user?.lastName;
                            }
                            return <Marker
                                           title={name}
                                           key={bike.id}
                                           coordinate={{
                                               latitude: bike.latitude ? +bike.latitude : 2,
                                               longitude: bike.longitude ? +bike.longitude : 1
                                           }}
                                           description={'ashdfkjlhas'}
                                    >
                                         <Image source={bikeMarker} style={{height: 45, width:45 }} />
                                    </Marker>
                        })
                    }
                    <Circle center={{
                        latitude: +store.latitude,
                        longitude: +store.longitude
                    }}
                            strokeColor={'red'}
                            fillColor={'rgba(0, 255, 0, 0.35)'}
                            radius={+store.radius}
                    />
                </MapView>
        }

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        flex: 1,
    },
});
export default AdminMap