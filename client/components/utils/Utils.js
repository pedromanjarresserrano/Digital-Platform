var moment = require('moment');

export const kbToSize = (kb, decimals = 2) => {
    if (kb === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(kb) / Math.log(k));

    return parseFloat((kb / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}


export const segFormat = (totalSeconds, letters = true) => {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return letters ? (hours > 0 ? hours + " h " : '') + (minutes > 0 ? (hours > 0 && minutes < 10 ? "0" + minutes : minutes) + " min " : '') + seconds + " seg " : (hours > 0 ? hours + ":" : '') + (minutes > 0 ? (hours > 0 && minutes < 10 ? "0" + minutes : minutes) + ":" : '') + (minutes > 0 && seconds < 10 ? "0" + seconds : seconds);
}



export const dateFormat = (date, format = "D/M/YY - h:mm:ss") => {
    return moment(date).format(format);
}