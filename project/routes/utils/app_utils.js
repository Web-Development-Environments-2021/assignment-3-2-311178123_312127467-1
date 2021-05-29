/*
The method will format datetime as YY-MM-DD HH:MM:SS.nano
*/
exports.formatDateTime = function formatDateTime(dateObj){
    return dateObj.toISOString().replace("Z","").replace("T", " ")
}