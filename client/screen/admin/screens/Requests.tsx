import React, {Fragment, useEffect, useState} from "react";
import {BikeObject} from "../../../../.types/bike";
import {getBikes, handleApproveRequestByCustomer} from "../../../../.api/bike-api";
import {Alert, Animated, Linking, View} from "react-native";
import BikeCard from "../../utils/BikeCard";
import {Button} from "@rneui/themed";
import ScrollView = Animated.ScrollView;
import {getBikeStatus} from "../../../../utils/bike";
import NoBikeAvailable from "../../utils/NoBikeAvailable";
import styles from "../../style/style";
import {info, success} from "../../../../style";

const Requests = ({
                      navigation
                  }: any) => {

    const [bikes, setBikes] = useState<BikeObject[]>([])
    const [page, setPage] = useState(1);
    const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true)

    useEffect(() => {
        getBikes('', page, 10, getBikeStatus.FOR_REQUEST).then(bikes => {
            setBikes(bikes)
            setPage(page + 1)
        })
    }, [])

    const _handleLastPage = async () => {
        await getBikes('', page, 10, getBikeStatus.FOR_REQUEST).then(newBikes => {
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

    const _handleApprove = (userId: string, bikeId: string) => {
        Alert.alert('Approval;', `You're about to approve this rent`, [
            {
                text: 'Yes',
                onPress: () => {
                    handleApproveRequestByCustomer(userId,bikeId).then(ignored => {
                        getBikes('', 1, 10, getBikeStatus.FOR_REQUEST).then(bikes => {
                            setBikes(bikes)
                            setPage(1)
                        })
                    })
                },
                style: 'cancel',
            },
            {text: 'Cancel', onPress: () => console.log('OK Pressed')},
        ]);
    }

    return <Fragment>
        <ScrollView>
            <View style={styles.bikeContainer}>
                {
                    bikes.length === 0 ?
                        <NoBikeAvailable/>
                        :
                        bikes.map((bike: any) => {
                            const {assignedCustomer} = bike;
                            const {user} = assignedCustomer;
                            const {firstName, lastName} = user
                            return <BikeCard bike={bike} key={bike.id}>
                                <Button
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 5,
                                        backgroundColor: success
                                    }}
                                    onPress={() => _handleApprove(user.id,bike.id)}
                                    title="Approve"
                                />
                                <Button
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 5,
                                        backgroundColor: info
                                    }}
                                    onPress={() => Linking.openURL(`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike.customerReceipt.picture}`)}
                                    title="View Receipt"
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
export default Requests