import React, {Fragment, useEffect, useState} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import {BikeObject} from "../../../../../.types/bike";
import {Button, Card} from "@rneui/themed";
import ScrollView = Animated.ScrollView;
import {getBikeAvailable} from "../../../../../.api/bike-api";
import {useIsFocused} from "@react-navigation/native";

const BikeAvailable = () => {

    const [bikes, setBikes] = useState<BikeObject[]>([])
    const [page, setPage] = useState(1);
    const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true)

    useEffect(() => {
        getBikeAvailable('', page, 10).then(bikes => {
            setBikes(bikes)
            setPage(page + 1)
        })
    }, [])

    const _handleLastPage = async () => {
        await getBikeAvailable('', page, 10).then(newBikes => {
            if (newBikes.length === 0) {
                console.log(bikes.length);
                setIsLoadMoreVisible(false);
                return;
            }
            const tempBikes = [...bikes]
            tempBikes.concat(newBikes);
            const newPage = page + 1;
            setPage(newPage)
            setBikes(tempBikes)
        }).catch(error => {
            console.log(error)
        })

    }

    return (
        <Fragment>
            <ScrollView>
                <View style={styles.container}>
                    {
                        bikes?.map(bike => {
                            return <Card key={bike.id}>
                                <Card.Title>{bike.brand}</Card.Title>
                                <Card.Divider/>
                                <Card.Image
                                    style={{padding: 0}}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Text style={{marginBottom: 5, marginTop: 5, textAlign: 'center'}}>
                                    {
                                        bike.description
                                    }
                                </Text>
                                <Button
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0,
                                    }}
                                    title="Request Now"
                                />
                            </Card>
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