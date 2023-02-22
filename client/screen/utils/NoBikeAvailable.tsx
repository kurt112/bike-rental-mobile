import {Text, View} from "react-native";
import React from "react";

const NoBikeAvailable = () => {
    return <View style={{
        height: 600,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    }}>
        <Text style={{
            fontSize: 25,
        }}>
            No Bikes Available
        </Text>
    </View>
}

export default NoBikeAvailable