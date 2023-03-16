import {Dimensions, StyleSheet, View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import MapView, {Circle, Marker} from "react-native-maps";
import {getStoreData} from "../../../.api/store-api";
import {Store} from "../../../.types/store";

const CustomerMap = () => {
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
    return <View style={styles.container}>
        {
            store.id === '' ?
                <Text>No Data Found</Text> :

                <MapView style={styles.map}
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
export default CustomerMap