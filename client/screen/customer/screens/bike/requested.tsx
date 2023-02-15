import {Fragment} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import {Button, Card} from "@rneui/themed";
import ScrollView = Animated.ScrollView;
import {BikeObject} from "../../../../../.types/bike";

interface props {
    bikes: BikeObject[] | undefined
}

const BikeRequested = ({
                           bikes
                       }: props) => {
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
                                    title="Cancel"
                                    color={'error'}
                                />
                            </Card>
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