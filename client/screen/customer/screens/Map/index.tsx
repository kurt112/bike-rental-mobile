import React from "react";
import {Dimensions, StyleSheet, Image} from "react-native";
import {Store} from "../../../../../.types/store";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import bikeMarker from '../../../../../assets/_images/bike-marker.png';
interface props {
    store: Store,
    location: any
}
const Map = ({
                     store,
                     location
                 }: props) => {
    return (
        <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
                 initialRegion={{
                     latitude: +store.latitude,
                     longitude: +store.longitude,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                 }}
                 showsCompass={true}
        >
            {
                store ? <Marker
                    coordinate={{latitude: +store.latitude, longitude: +store.longitude}}
                    title={store.name}
                    description={store.name}
                />:
                    null
            }
            {
                location ? <Marker coordinate={{latitude: +location.latitude, longitude: +location.longitude}}
                                   title={store.name}
                                   description={store.name}
                >
                        <Image source={bikeMarker} style={{height: 45, width:45 }} />
                </Marker> : null
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
    )
}
const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        flex: 1,
    }
});
export default Map;