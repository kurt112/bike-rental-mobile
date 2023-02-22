import React, {Fragment, useEffect, useState} from "react";
import {BikeObject} from "../../../../.types/bike";
import {getBikes} from "../../../../.api/bike-api";
import {getBikeStatus} from "../../../../utils/bike";
import {ScrollView, View} from "react-native";
import styles from "../../style/style";
import NoBikeAvailable from "../../utils/NoBikeAvailable";
import BikeCard from "../../utils/BikeCard";
import {Button} from "@rneui/themed";
import BikeNavigation from "../../../../navigation/Bike";
import {danger} from "../../../../style";

const AdminRented = ({
    navigation
                     }: any) => {
    const [bikes, setBikes] = useState<BikeObject[]>([])
    const [page, setPage] = useState(1);
    const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true)

    useEffect(() => {
        getBikes('', page, 10, getBikeStatus.RENTED).then(bikes => {
            console.log(bikes);
            setBikes(bikes)
            setPage(page + 1)
        })
    }, [])

    const _handleLastPage = async () => {
        await getBikes('', page, 10, getBikeStatus.RENTED).then(newBikes => {
            if (newBikes.length === 0) {
                setIsLoadMoreVisible(false);
                return;
            }
            const tempBikes = [...bikes]
            tempBikes.concat(newBikes);
            const newPage = page + 1;
            setPage(newPage)
            setBikes(tempBikes)
        }).catch(ignored => {
        })

    }

    return <Fragment>
        <ScrollView>
            <View style={styles.bikeContainer}>
                {
                    bikes.length === 0 ?
                        <NoBikeAvailable/>
                        :
                        bikes.map(bike => {
                            return <BikeCard bike={bike} key={bike.id}>
                                <Button
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0,
                                        backgroundColor: danger
                                    }}
                                    onPress={() => navigation.navigate(BikeNavigation.Request.name, {name: BikeNavigation.Request.name})}
                                    title="Terminate"
                                />
                            </BikeCard>
                        })
                }
            </View>
            {
                isLoadMoreVisible && bikes.length !== 0 ? <Button
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
}

export default AdminRented