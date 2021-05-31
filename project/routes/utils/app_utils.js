/*
The method will format datetime as YY-MM-DD HH:MM:SS.nano
*/
exports.formatDateTime = function formatDateTime(dateObj){
    const date = dateObj.toISOString().split("T")[0];
    const time = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
    return `${date} ${time}`
}

/*
The method will exctract the date from a datetime object
*/
exports.ectractDateFromDatetime = function ectractDateFromDatetime(dateObj){
    return dateObj.toISOString().split("T")[0];
}