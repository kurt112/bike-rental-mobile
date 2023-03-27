import {Text, View} from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

const NoBikeAvailable = () => {
    return <View style={{
        height: RFPercentage(60),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    }}>
        <Text style={{
            fontSize: RFPercentage(4),
        }}>
            No Bikes Available
        </Text>
    </View>
}

export default NoBikeAvailable