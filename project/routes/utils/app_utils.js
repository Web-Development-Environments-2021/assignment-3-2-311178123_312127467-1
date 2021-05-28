exports.formatDateTime = function formatDateTime(dateObj){
    return dateObj.toISOString().replace("Z","").replace("T", " ")
}