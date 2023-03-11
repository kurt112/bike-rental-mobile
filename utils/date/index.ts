import moment from "moment-timezone";


export const formatDate = (date:any) => {
    return moment(date).tz('Asia/Manila').format('MMM. D, YYYY');
}

export const formatDateWithTime = (date:any) => {
    return moment(date).tz('Asia/Manila').format('MMM. D, YYYY, h:mm a');
}

export const getFromNowDate = (created_at: any) => {
    return moment(created_at).tz('Asia/Manila').fromNow();
}
