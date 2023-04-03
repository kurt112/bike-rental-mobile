import MapView, {Circle, Marker} from "react-native-maps";
import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import {Store} from "../../../../../.types/store";

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
                /> :
                    null
            }
            {
                location ? <Marker coordinate={{latitude: +location.latitude, longitude: +location.longitude}}
                                   title={store.name}
                                   description={store.name}
                /> : null
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