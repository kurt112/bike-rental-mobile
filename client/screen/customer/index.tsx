import {Fragment, useEffect, useState} from "react";
import RentingScreens from "./screens/Main/rentingScreens";
import NotRentingScreens from "./screens/Main/notRentingScreens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkIfUserIsRenting } from "../../../.api/user-api";

const CustomerMainScreen = ({
                                navigation
                            }: any) => {

    const [isRenting, setIsRenting] = useState<boolean>(false);

    useEffect(() => {
        checkIfUserIsRenting().then((result: any) => {
            setIsRenting(result);
        })
    })
    
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