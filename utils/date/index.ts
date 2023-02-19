import moment from "moment";


export const formatDate = (date:any) => {
    return moment(date).format('MMM. D, YYYY');
}

export const formatDateWithTime = (date:any) => {
    return moment(date).format('MMM. D, YYYY, h:mm a');
}

export const getFromNowDate = (created_at: any) => {
    return moment(created_at).fromNow();
}
