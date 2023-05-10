import React, {useEffect, useState} from "react";
import {View, ScrollView, StyleSheet} from "react-native";
import {BikeObject} from "../../../../../../.types/bike";
import {getBikeAvailable, getBikeByCustomer, getBikeData, requestBikeByCustomer} from "../../../../../../.api/bike-api";
import {Button, Card, Text} from "@rneui/themed";
import {defaultBikeLogo} from "../../../../../../image";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {formatDateWithTime} from "../../../../../../utils/date";
import moment from "moment";
import {getBikeStatus} from "../../../../../../utils/bike";
import * as DocumentPicker from 'expo-document-picker';
import {success} from "../../../../../../style";
import { RFPercentage } from "react-native-responsive-fontsize";
import { handleUploadReceiptCustomer } from "../../../../../../.api/customer-api";
import {uploadToS3} from "../../../../../../.api/aws/s3";
const RequestNow = ({route, navigation}: any) => {
    const {bikeId, setBikes, setPage, setBikeRequested} = route.params;
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
    const [totalHours, setTotalHours] = useState(0);
    const [dateStartOpen, setDateStartOpen] = useState(false);
    const [dateEndOpen, setDateEndOpen] = useState(false);
    const [timeStartOpen, setTimeStartOpen] = useState(false);
    const [timeEndOpen, setTimeEndOpen] = useState(false)
    const [dateStart, setDateStart] = useState<Date | undefined>(new Date());
    const [dateEnd, setDateEnd] = useState<Date | undefined>(new Date());
    const [timeStart, setTimeStart] = useState<Date | undefined>(new Date());
    const [timeEnd, setTimeEnd] = useState<Date | undefined>(new Date());
    const [receipt, setReceipt] = useState<any>();

    const [bike, setBike] = useState<BikeObject>({
        brand: '',
        size: 0,
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        code: '',
        bikePictures: [],
        status: 0,
        isAvailable: true
    });

    useEffect(() => {
        getBikeData(bikeId).then((e: BikeObject) => {
            setBike(e);
        })
    }, []);

    useEffect(() => {
        const tempEndBarrow = moment(dateEnd);
        const tempStartBarrow = moment(dateStart);

        const minutesDiff = tempEndBarrow.diff(tempStartBarrow, 'minutes');
        let totalHour = Math.floor(minutesDiff / 60);
        const excessMinutes = minutesDiff % 60 <= 0 ? 0 : 1;

        totalHour += excessMinutes;

        setTotalHours(totalHour)
        setEstimatedPrice(totalHour * bike.price)
    }, [dateStart, dateEnd, timeEnd, timeStart])

    const _handleRequestBike = async () => {
        let success = false;
        bike.startBarrow = dateStart;
        bike.endBarrow = dateEnd;
        await requestBikeByCustomer(bike).then(ignored => {
            success = true
            getBikeAvailable('', 1, 10).then(bikes => {
                setPage(1);
                setBikes(bikes)
                getBikeByCustomer('').then(bikes => {
                    const tempBikeRequested: BikeObject[] = [];
                    bikes.forEach((bike: BikeObject) => {
                        if (bike.status === getBikeStatus.FOR_REQUEST) {
                            tempBikeRequested.push(bike);
                        }
                    })
                    setBikeRequested(tempBikeRequested)

                });
            })
        }).catch((ignored) => {
            alert('Please Cancel Your Request Bike')
        });
        
        // will uncomment if answer find
        if(success && receipt !== ''){
            await uploadToS3(receipt,null).then(name => {
                alert('Successfully ' + name)
                handleUploadReceiptCustomer(name).then(ignored => {
                    alert('Bike rent request success');
                    navigation.goBack();
                })
            });
        }

    }

    const _handleChangeDateStart = (e: any, date: Date | undefined, index: number) => {
        // index === 1 means start
        if (index === 1) {
            setDateStart(date)
            setDateStartOpen(false);
        } else {
            setDateEnd(date);
            setDateEndOpen(false)
        }
    }

    const _handleChangeTimeStart = (e: any, date: Date | undefined, index: number) => {
        // index === 1 means start
        if (index === 1) {
            setTimeStartOpen(false);
            setTimeStart(date)
            let tempDateStart: Date | undefined = dateStart;
            tempDateStart?.setHours(date?.getHours() ? date?.getHours() : 12);
            tempDateStart?.setMinutes(date?.getMinutes() ? date?.getMinutes() : 0);
            setDateStart(tempDateStart);

        } else {
            setTimeEnd(date);
            setTimeEndOpen(false)
            let tempDateEnd: Date | undefined = dateEnd;
            tempDateEnd?.setHours(date?.getHours() ? date?.getHours() : 12);
            tempDateEnd?.setMinutes(date?.getMinutes() ? date?.getMinutes() : 0);
            setDateEnd(tempDateEnd);
        }

    }


    const _uploadReceipt = async () => {
        let result: any = await DocumentPicker.getDocumentAsync({});

        setReceipt(result);
    }

    return <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={{
            marginBottom: 20
        }}>
            <View style={{
                alignItems: 'center'
            }}>
            </View>
            <Card>
                <Card.Title style={
                    {
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        fontSize: RFPercentage(2),
                        color: 'black'
                    }}>
                    {`${bike.brand} (${bike.price}₱/hr)`}
                </Card.Title>
                <Card.Title style={
                    {
                        fontSize: RFPercentage(1.5),
                        color: 'white',
                        backgroundColor: '#333'
                    }}>
                    {`QTY: ${bike.quantity}`}
                </Card.Title>
                <Card.Image
                    style={{padding: 0}}
                    source={bike?.bikePictures.length === 0 ? defaultBikeLogo : {
                        uri: `https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike?.bikePictures[0].pictureName}`
                    }}
                />
                <Text style={{marginBottom: 5, marginTop: 5, textAlign: 'center', fontSize: RFPercentage(2)}}>
                    {
                        bike?.description
                    }
                </Text>
            </Card>
        </View>

        <ScrollView contentContainerStyle={
            {
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '3%',
                paddingRight: '3%'
            }
        }
        >
            <View style={{
                marginBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                    <View style={{marginRight: 10}}>
                        <Button titleStyle={styles.buttonTitle} containerStyle={styles.buttonSize} onPress={() => setDateStartOpen(true)}>
                            Date Start
                        </Button>
                    </View>
                    <View>
                        <Button titleStyle={styles.buttonTitle} containerStyle={styles.buttonSize} onPress={() => setTimeStartOpen(true)}>
                            Time Start
                        </Button>
                    </View>
                </View>
                {
                    !dateStartOpen ? null
                        :
                        <RNDateTimePicker mode={'date'}
                                          onChange={(event, date) => _handleChangeDateStart(event, date, 1)}
                                          minimumDate={new Date()} value={dateStart ? dateStart : new Date()}
                        />
                }
                {
                    !timeStartOpen ? null
                        :
                        <RNDateTimePicker mode="time" value={timeStart}
                                          minimumDate={new Date()}
                                          onChange={(event, date) => _handleChangeTimeStart(event, date, 1)}/>
                }
                <View>
                    <Text style={styles.dateFontSize}>
                        {formatDateWithTime(dateStart)}
                    </Text>
                </View>
            </View>

            <View style={{
                marginBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                    <View style={{marginRight: 10}}>
                        <Button titleStyle={styles.buttonTitle} containerStyle={styles.buttonSize} onPress={() => setDateEndOpen(true)}>
                            Date End
                        </Button>
                    </View>

                    <View >
                        <Button titleStyle={styles.buttonTitle} containerStyle={styles.buttonSize} onPress={() => setTimeEndOpen(true)}>
                            Time End
                        </Button>
                    </View>
                </View>
                {
                    dateEndOpen ? <RNDateTimePicker mode={'date'}
                                                    minimumDate={new Date()} value={dateEnd ? dateEnd : new Date()}
                                                    onChange={(event, date) => _handleChangeDateStart(event, date, 2)}
                    /> : null
                }
                {
                    timeEndOpen ? <RNDateTimePicker mode={'time'}
                                                    value={timeEnd}
                                                    minimumDate={new Date()}
                                                    onChange={(event, date) => _handleChangeTimeStart(event, date, 2)}

                    /> : null
                }
                <View>
                    <Text style={styles.dateFontSize}>
                        {formatDateWithTime(dateEnd)}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    borderWidth: 0.5,
                    borderColor: 'black',
                    margin: 10,
                }}
            />
            <View style={styles.normalTextContainer}>
                <Text style={styles.normalText}>
                    Total Hours:
                </Text>
                <Text style={styles.normalText}>
                    {totalHours}
                </Text>
            </View>
            <View style={styles.normalTextContainer}>
                <Text style={styles.normalText}>
                    Estimated Price:
                </Text>
                <Text style={styles.normalText}>
                    {estimatedPrice}
                </Text>
            </View>
            <View style={{
                alignItems: 'center',
                marginTop: 5,
                backgroundColor: '#e8e4c9',
                marginBottom: 10
            }}>
                {
                    receipt ? <Text style={{
                            fontWeight: 'bold',
                            color: 'green',
                            fontSize: 20
                        }}>
                            {receipt.name}
                        </Text> :
                        <Text style={{
                            fontWeight: 'bold', color: 'red', fontSize: RFPercentage(2),
                            paddingLeft: 20, paddingRight: 20
                        }}>
                            No Receipt Attached
                        </Text>
                }

            </View>
            <View style={{marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <Button containerStyle={styles.footerButtonSize} titleStyle={styles.footerButtonFontSize} onPress={_uploadReceipt}>
                    {
                        receipt ? 'Change Receipt' : 'Attached Receipt'
                    }
                </Button>
                <Button containerStyle={styles.footerButtonSize}
                titleStyle={styles.footerButtonFontSize}
                onPress={_handleRequestBike} color={success}>
                    Rent Now
                </Button>
            </View>
        </ScrollView>

    </ScrollView>
}
const styles = StyleSheet.create({
    buttonTitle: {
        color: "white",
        fontSize: RFPercentage(1.5),
    }, 
    buttonSize: {
        width: RFPercentage(10)
    },
    dateFontSize: {
        fontSize: RFPercentage(2),
        fontWeight: 'bold'
    },
    footerButtonSize: {
        width: RFPercentage(20)
    },
    footerButtonFontSize: {
        fontSize: RFPercentage(1.5)
    },
    normalText: {
        fontSize: RFPercentage(2),
        fontWeight: 'bold'
    },
    normalTextContainer: {
         marginBottom: 10,
         display: 'flex', 
         paddingLeft: 5, 
         paddingRight: 5, 
         flexDirection: 'row', 
         justifyContent: 'space-between'
    }
});

export default RequestNow