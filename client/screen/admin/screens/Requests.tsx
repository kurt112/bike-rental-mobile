import React, {Fragment, useEffect, useState} from "react";
import {BikeObject} from "../../../../.types/bike";
import {getBikes, handleApproveRequestByCustomer, handleRejectBikeRequestBYCustomer} from "../../../../.api/bike-api";
import {Alert, Animated, Linking, View} from "react-native";
import BikeCard from "../../utils/BikeCard";
import {Button, Text} from "@rneui/themed";
import ScrollView = Animated.ScrollView;
import {getBikeStatus} from "../../../../utils/bike";
import NoBikeAvailable from "../../utils/NoBikeAvailable";
import styles from "../../style/style";
import {danger, info, primary, success} from "../../../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import {formatDateWithTime} from "../../../../utils/date";
import { RFPercentage } from "react-native-responsive-fontsize";
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

    const _handleReject = async (userId: string, bikeId: string) => {
        Alert.alert('Rejection;', `You're about to reject this request?`, [
            {
                text: 'Yes',
                onPress: () => {
                    handleRejectBikeRequestBYCustomer(userId, bikeId).then(ignored => {
                        getBikes('', page, 10, getBikeStatus.FOR_REQUEST).then(bikes => {
                            setBikes(bikes)
                            setPage(1)
                        })
                    })
                },
                style: 'cancel',
            },
            {text: 'Cancel', onPress: () =>{}},
        ]);
    }

    const _handleApprove = (userId: string, bikeId: string) => {
        Alert.alert('Approval;', `You're about to approve this rent`, [
            {
                text: 'Yes',
                onPress: () => {
                    handleApproveRequestByCustomer(userId, bikeId).then(ignored => {
                        getBikes('', 1, 10, getBikeStatus.FOR_REQUEST).then(bikes => {
                            setBikes(bikes)
                            setPage(1)
                        })
                    })
                },
                style: 'cancel',
            },
            {text: 'Cancel', onPress: () => {}},
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
                            const {firstName, lastName, validIdPhoto} = user
                            return <BikeCard bike={bike} key={bike.id}>
                              <View style={{
                                                                borderTopWidth: .5,
                                                                borderColor: 'grey',
                                                                paddingTop: 10,
                                                                paddingBottom: 10
                                                            }}>

                                    <View style={{display: 'flex',justifyContent: 'space-between',flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: RFPercentage(2.2)}}>Rent Start: </Text>
                                    <Text style={{fontWeight: 'bold', fontSize: RFPercentage(2.2)}}>{formatDateWithTime(bike.startBarrow)} </Text>
                                    </View>
                                    <View style={{display: 'flex',
                                      justifyContent: 'space-between',
                                      flexDirection: 'row'
                                      }}>
                                      <Text style={{fontWeight: 'bold', fontSize: RFPercentage(2.2)}}>Rent End: </Text>
                                      <Text style={{fontWeight: 'bold', fontSize: RFPercentage(2.2)}}>{formatDateWithTime(bike.endBarrow)} </Text>
                                    </View>
                                 </View>
                                <View style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    borderTopWidth: .5,
                                    borderColor: 'grey',
                                    paddingTop: 10
                                }}>
                                    <View
                                        style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                                        {
                                            bike.customerReceipt === null || bike.customerReceipt.picture === ''?  <Text style={{color: 'red'}}>No Receipt </Text> :
                                                <Ionicons name="receipt-outline"
                                                          size={RFPercentage(2.5)}
                                                          onPress={() => Linking.openURL(`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike.customerReceipt.picture}`)}
                                                          color={info}
                                                />
                                        }

                                        {
                                            validIdPhoto === null || validIdPhoto === '' ? <Text style={{color: 'red'}}>No Valid ID</Text> :
                                                <Ionicons name="person-circle-outline"
                                                          size={RFPercentage(4.5)}
                                                          onPress={() => Linking.openURL(`https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${validIdPhoto}`)}
                                                          color={primary}
                                                />
                                        }
                                    </View>

                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'row',
                                        width: '50%'
                                    }}>
                                        <Ionicons name="checkmark-circle-outline"
                                                  size={RFPercentage(4.5)}
                                                  onPress={() => _handleApprove(user.id, bike.id)}
                                                  color={success}
                                        />
                                        <Ionicons name="trash-bin-outline"
                                                  size={RFPercentage(4.5)}
                                                  onPress={() => _handleReject(user.id, bike.id)}
                                                  color={danger}
                                        />
                                    </View>
                                </View>
                            </BikeCard>
                        })
                }
            </View>
            {
                isLoadMoreVisible && bikes.length !== 0 ?
                    <Button containerStyle={{
                        width: '100%'
                    }}
                    titleStyle={{fontSize: RFPercentage(2.5)}}
                            title="Load More"
                            type="clear"
                            onPress={_handleLastPage}
                    /> : null
            }
        </ScrollView>
    </Fragment>
}
export default Requests