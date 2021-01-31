function capitalizeFirstLetter(string) {
    return string && string.length > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}

module.exports = {
    capitalizeFirstLetter
}