import React, { Fragment, useEffect, useState } from "react";
import { BikeObject } from "../../../../.types/bike";
import { getBikes, handleTerminateBikeByCustomer } from "../../../../.api/bike-api";
import { getBikeStatus } from "../../../../utils/bike";
import { Alert, Linking, RefreshControl, ScrollView, Text, View } from "react-native";
import styles from "../../style/style";
import NoBikeAvailable from "../../utils/NoBikeAvailable";
import BikeCard from "../../utils/BikeCard";
import { Button } from "@rneui/themed";
import { info, primary, warning } from "../../../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFPercentage } from "react-native-responsive-fontsize";

const AdminRented = ({
    navigation
}: any) => {
    const [bikes, setBikes] = useState<BikeObject[]>([])
    const [page, setPage] = useState(1);
    const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        getBikeRented();
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

    const _handleTerminate = async (userId: string, bikeId: string) => {
        Alert.alert('Termination', `You're about to terminate this rent`, [
            {
                text: 'Yes',
                onPress: () => {
                    handleTerminateBikeByCustomer(userId, bikeId).then(ignored => {
                        getBikes('', 1, 10, getBikeStatus.RENTED).then(bikes => {
                            setBikes(bikes)
                            setPage(1)
                        })
                    })
                },
                style: 'cancel',
            },
            { text: 'Cancel', onPress: () => { } },
        ]);

    }

    const getBikeRented = () => {
        getBikes('', 1, 10, getBikeStatus.RENTED).then(bikes => {
            setBikes(bikes)
            setPage(2)
        })
    }

    return <Fragment>
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing}
                    onRefresh={getBikeRented} />
            }
        >
            <View style={styles.bikeContainer}>
                {
                    bikes.length === 0 ?
                        <NoBikeAvailable />
                        :
                        bikes.map((bike: any) => {
                            const { assignedCustomer } = bike;
                            const { user } = assignedCustomer;
                            const { firstName, lastName, validIdPhoto } = user
                            return <BikeCard bike={bike} key={bike.id}>
                                <View style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    borderTopWidth: .5,
                                    borderColor: 'grey',
                                    paddingTop: 10
                                }}>
                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 5, textAlign: 'center', fontSize: RFPercentage(1.8) }}>
                                            {`${firstName} ${lastName}`}
                                        </Text>
                                    </View>
                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        flexDirection: 'row'
                                    }}>
                                        {
                                            bike.customerReceipt === null || bike.customerReceipt.picture === '' ?
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Text style={{ color: 'red' }}>No Receipt</Text>
                                                </View> :
                                                <Ionicons name="receipt-outline"
                                                    size={RFPercentage(3.5)}
                                                    onPress={() => Linking.openURL(`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike.customerReceipt.picture}`)}
                                                    color={info}
                                                />
                                        }
                                        {
                                            validIdPhoto === null || validIdPhoto === '' ?
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Text style={{ color: 'red' }}>No Valid ID</Text>
                                                </View>
                                                :
                                                <Ionicons name="person-circle-outline"
                                                    size={RFPercentage(3.5)}
                                                    onPress={() => Linking.openURL(`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${validIdPhoto}`)}
                                                    color={primary}
                                                />
                                        }
                                        <Ionicons name="stop-circle-outline"
                                            size={RFPercentage(3.5)}
                                            onPress={() => _handleTerminate(user.id, bike.id)}
                                            color={warning}
                                        />


                                    </View>
                                </View>

                            </BikeCard>
                        })
                }
            </View>
            {
                isLoadMoreVisible && bikes.length !== 0 ? <Button
                    containerStyle={{
                        width: '100%'
                    }}
                    titleStyle={{ fontSize: RFPercentage(2) }}
                    title="Load More"
                    type="clear"
                    onPress={_handleLastPage}
                /> : null
            }
        </ScrollView>
    </Fragment>
}

export default AdminRented