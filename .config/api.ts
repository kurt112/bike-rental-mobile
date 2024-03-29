import axios from "axios";

// use node v16.19.0 or latest
    // https://bike-rental.herokuapp.com/
// http://192.168.1.6:5000 - ip ng local mo
export const host_url = process.env.NODE_ENV === 'development'? 'https://bike-rental.herokuapp.com':'https://bike-rental.herokuapp.com';
export const host_url_graphQl = `${host_url}/data`
export const graphQl = axios.create({
    headers: {
        'Access-Control-Allow-Origin': true,
    },
    baseURL: host_url_graphQl
})

export const axiosSubmit = axios.create({
    headers: {
        'Access-Control-Allow-Origin': true,
    },
    baseURL:`${host_url}/`
})

export const axiosCreate = axios.create({
    headers: {
        'Access-Control-Allow-Origin': true,
    },
    baseURL:`${host_url}/`
})

// this method will use get from axios
export const axiosGet = axios.create({
    headers: {
        'Access-Control-Allow-Origin': true,
    },
    baseURL:`${host_url}/`
})

