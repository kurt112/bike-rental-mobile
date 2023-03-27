import React, {Fragment} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";
import ScrollView = Animated.ScrollView;
import {BikeObject} from "../../../../../.types/bike";
import BikeCard from "../../../utils/BikeCard";
import {cancelRequestBikeByCustomer, getBikeByCustomer} from "../../../../../.api/bike-api";
import NoBikeAvailable from "../../../utils/NoBikeAvailable";
import {getBikeStatus} from "../../../../../utils/bike";
import { RFPercentage } from "react-native-responsive-fontsize";

interface props {
    bikes: BikeObject[] | undefined
    setBikes: any
}

const BikeRequested = ({
                           bikes,
                           setBikes
                       }: props) => {

    const _handleCancelBike = async (id: any) => {
        await cancelRequestBikeByCustomer(id).then(ignored => {
            getBikeByCustomer('').then(bikes => {
                const tempBikeRequested:BikeObject[] = [];
                bikes.forEach((bike: BikeObject) => {
                    if (bike.status === getBikeStatus.FOR_REQUEST) {
                        tempBikeRequested.push(bike);
                    }
                })
                setBikes(tempBikeRequested)
            })
        }).catch(error => {
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
                                    titleStyle={{fontSize: RFPercentage(2)}}
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