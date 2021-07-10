/*
The method will format datetime as YY-MM-DD HH:MM:SS.nano
*/
exports.formatDateTime = function formatDateTime(dateObj){
    const date = dateObj.toISOString().split("T")[0];
    var minutes = (dateObj.getMinutes() < 10? '0' : '') + dateObj.getMinutes();
    var seconds = (dateObj.getSeconds() < 10? '0' : '') + dateObj.getSeconds();
    var hours = (dateObj.getHours() < 10? '0' : '') + dateObj.getHours();
    const time = `${hours}:${minutes}:${seconds}`
    return `${date} ${time}`
}

/*
The method will exctract the date from a datetime object
*/
exports.extractDateFromDatetime = function extractDateFromDatetime(dateObj){
    return dateObj.toISOString().split("T")[0];
}

/*
The method will exctract the time from a datetime object
*/
exports.extractTimeFromISO = function extractDateFromDatetime(dateObj){
    return dateObj.toISOString().split("T")[0];
}