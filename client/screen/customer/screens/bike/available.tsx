import React, {Fragment, useState} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";
import ScrollView = Animated.ScrollView;
import {getBikeAvailable} from "../../../../../.api/bike-api";
import BikeNavigation from "../../../../../navigation/Bike";
import BikeCard from "../../../utils/BikeCard";
import NoBikeAvailable from "../../../utils/NoBikeAvailable";

const BikeAvailable = ({
                           navigation,
                           bikes,
                           setBikes,
                           setBikeRequested
                       }: any) => {
    const [page, setPage] = useState(1);
    const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true)

    const _handleLastPage = async () => {
        const newPage = page + 1;
        setPage(newPage);
        await getBikeAvailable('', newPage, 10).then(newBikes => {
            if (newBikes.length === 0) {
                setIsLoadMoreVisible(false);
                return;
            }
            const tempBikes = [...bikes]
            tempBikes.concat(newBikes);
            setBikes(tempBikes)
        }).catch(error => {
        })

    }

    return (
        <Fragment>
            <ScrollView>
                <View style={styles.container}>
                    {
                        bikes === undefined || bikes.length === 0 ? <NoBikeAvailable/> : bikes.map((bike: any) => {
                            return <BikeCard bike={bike} key={bike.id}>
                                <Button
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0,
                                    }}
                                    onPress={() => navigation.navigate(BikeNavigation.Request.name, {
                                        setBikeRequested: setBikeRequested,
                                        setPage: setPage,
                                        setBikes: setBikes,
                                        name: BikeNavigation.Request.name,
                                        bikeId: bike.id
                                    })}
                                    title="Request Now"
                                />
                            </BikeCard>
                        })
                    }
                </View>
                {
                    isLoadMoreVisible ? <Button
                        containerStyle={{
                            width: '100%'
                        }}
                        title="Load More"
                        type="clear"
                        onPress={_handleLastPage}
                    /> : null
                }
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
export default BikeAvailable