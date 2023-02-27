import React, {Fragment} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";
import ScrollView = Animated.ScrollView;
import {BikeObject} from "../../../../../.types/bike";
import BikeCard from "../../../utils/BikeCard";
import {cancelRequestBikeByCustomer} from "../../../../../.api/bike-api";
import NoBikeAvailable from "../../../utils/NoBikeAvailable";

interface props {
    bikes: BikeObject[] | undefined
}

const BikeRequested = ({
                           bikes
                       }: props) => {

    const _handleCancelBike = async (id: any) => {
        await cancelRequestBikeByCustomer(id).then(ignored => {
        })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Fragment>
            <ScrollView>
                <View style={styles.container}>
                    {
                        bikes === undefined || bikes.length === 0 ? <NoBikeAvailable/> : bikes.map(bike => {
                            return <BikeCard bike={bike} key={bike.id}>
                                <Button
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0,
                                    }}
                                    title="Cancel"
                                    color={'error'}
                                    onPress={() => _handleCancelBike(bike.id)}
                                />
                            </BikeCard>
                        })
                    }
                </View>

            </ScrollView>

        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        flex: 1,
        marginBottom: 10
    },
    fonts: {
        marginBottom: 8,
    }
});

export default BikeRequested