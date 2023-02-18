 interface NavigationValue {
    name:  string,
    title: string
}

export interface BikeNavigationType{
    Requested: NavigationValue,
    Available: NavigationValue,
    Request: NavigationValue,
    Rented: NavigationValue,
    Map: NavigationValue,

}

export interface AuthNavigationType{
    Login: NavigationValue
}

export interface ClientNavigation {
    Profile: NavigationValue
    Bill: NavigationValue
}