import {ReactNode} from "react";
import {Card} from "@rneui/themed";
import {defaultBikeLogo} from "../../../image";
import {Text} from "react-native";
import {BikeObject} from "../../../.types/bike";
import { RFPercentage } from "react-native-responsive-fontsize";

interface props {
    bike: BikeObject,
    children: ReactNode
}

const BikeCard = ({
                      bike,
                      children
                  }: props) => {
    return <Card>
        <Card.Title style={
            {
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: RFPercentage(2),
                color: 'black'
            }}>
            {`${bike.brand} (${bike.price}₱/hr)`}
        </Card.Title>
        <Card.Divider/>
        <Card.Image
            style={{padding: 0, width: '100%', height: RFPercentage(20)}}
            source={bike.bikePictures.length === 0 ? defaultBikeLogo : {
                uri: `https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike.bikePictures[0].pictureName}`
            }}
        />
        <Text style={{marginBottom: 5, marginTop: 5, textAlign: 'center', fontSize: RFPercentage(1.5)}}>
            {
                bike.description
            }
        </Text>
        {
            children
        }
    </Card>
}

export default BikeCard