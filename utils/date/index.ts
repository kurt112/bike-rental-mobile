import moment from "moment-timezone";


export const formatDate = (date:any) => {
    return moment.tz(date,'YYYY-MM-DD HH:mm:ss.S','UTC')
    .tz('Asia/Manila').format('MMM. D, YYYY');
}

export const formatDateWithTime = (date:any) => {
    return moment.tz(date,'YYYY-MM-DD HH:mm:ss.S','UTC')
    .tz('Asia/Manila').format('MMM. D, YYYY, h:mm a');
}

export const getFromNowDate = (created_at: any) => {
    return moment.tz(created_at,'YYYY-MM-DD HH:mm:ss.S','UTC').fromNow();
}
