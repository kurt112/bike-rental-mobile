import {Fragment} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";
import ScrollView = Animated.ScrollView;
import {BikeObject} from "../../../../../.types/bike";
import BikeCard from "../../../utils/BikeCard";

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