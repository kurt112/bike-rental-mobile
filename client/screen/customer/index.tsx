import {Fragment, useEffect, useState} from "react";
import RentingScreens from "./screens/Main/rentingScreens";
import NotRentingScreens from "./screens/Main/notRentingScreens";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerMainScreen = ({
                                navigation
                            }: any) => {

    const [isRenting, setIsRenting] = useState<boolean>(false);

    useEffect(() => {
        renting().then((renting: any) => {
            setIsRenting(JSON.parse(renting));
        })
    }, [])

    const renting = async () => {
        return await AsyncStorage.getItem('isRenting');
    }

    return (
        <Fragment>
            {
                isRenting ? <RentingScreens navigation={navigation}/> :
                    <NotRentingScreens navigation={navigation}/>
            }

        </Fragment>
    )
}

export default CustomerMainScreen;