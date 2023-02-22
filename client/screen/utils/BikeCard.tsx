import {ReactNode} from "react";
import {Card} from "@rneui/themed";
import {defaultBikeLogo} from "../../../image";
import {Text} from "react-native";
import {BikeObject} from "../../../.types/bike";

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
                fontSize: 20,
                color: 'black'
            }}>{bike.brand}</Card.Title>
        <Card.Divider/>
        <Card.Image
            style={{padding: 0}}
            source={bike.bikePictures.length === 0 ? defaultBikeLogo : {
                uri: `https://bike-rental-file.s3.ap-southeast-1.amazonaws.com/${bike.bikePictures[0].pictureName}`
            }}
        />
        <Text style={{marginBottom: 5, marginTop: 5, textAlign: 'center', fontSize: 15}}>
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