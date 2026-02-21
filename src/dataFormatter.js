function formatDateWithTimezone(date, includeTime = true) {
    if (!(date instanceof Date)) {
        throw new TypeError('Input must be a Date object');
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (!includeTime) {
        return `${year}-${month}-${day}`;
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const tzOffset = -date.getTimezoneOffset();
    const sign = tzOffset >= 0 ? '+' : '-';
    const absOffset = Math.abs(tzOffset);
    const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const offsetMinutes = String(absOffset % 60).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
}

function parseFormattedDate(dateString) {
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})([+-](\d{2}):(\d{2}))?)?$/;
    const match = dateString.match(isoRegex);

    if (!match) {
        throw new Error('Invalid date format');
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);

    if (match[4]) {
        const hours = parseInt(match[5], 10);
        const minutes = parseInt(match[6], 10);
        const seconds = parseInt(match[7], 10);
        const tzSign = match[8] ? (match[8][0] === '+' ? 1 : -1) : 0;
        const tzHours = match[9] ? parseInt(match[9], 10) : 0;
        const tzMinutes = match[10] ? parseInt(match[10], 10) : 0;

        const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
        const tzOffset = tzSign * (tzHours * 60 + tzMinutes);
        date.setMinutes(date.getMinutes() - tzOffset);

        return date;
    }

    return new Date(year, month, day);
}

export { formatDateWithTimezone, parseFormattedDate };