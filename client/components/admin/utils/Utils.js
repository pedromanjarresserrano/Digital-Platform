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