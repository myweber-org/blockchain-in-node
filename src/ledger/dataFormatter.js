function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / secondsInUnit);
        
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }
    
    return 'just now';
}

export { formatRelativeTime };function formatDateWithTimezone(date, includeTime = true) {
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

    const timezoneOffset = -date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const offsetMinutes = Math.abs(timezoneOffset) % 60;
    const offsetSign = timezoneOffset >= 0 ? '+' : '-';

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
}

function parseFormattedDate(dateString) {
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}:\d{2})?)?$/;
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
        const timezone = match[8];

        if (timezone) {
            const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
            const offsetSign = timezone.charAt(0);
            const offsetHours = parseInt(timezone.substring(1, 3), 10);
            const offsetMinutes = parseInt(timezone.substring(4, 6), 10);
            const totalOffset = (offsetSign === '+' ? -1 : 1) * (offsetHours * 60 + offsetMinutes);

            date.setMinutes(date.getMinutes() + totalOffset);
            return date;
        }

        return new Date(year, month, day, hours, minutes, seconds);
    }

    return new Date(year, month, day);
}

export { formatDateWithTimezone, parseFormattedDate };function formatDateWithTimezone(date) {
    if (!(date instanceof Date)) {
        throw new TypeError('Input must be a Date object');
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const timezoneOffset = -date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const offsetMinutes = Math.abs(timezoneOffset) % 60;
    const offsetSign = timezoneOffset >= 0 ? '+' : '-';

    const formattedOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${formattedOffset}`;
}

function parseFormattedDate(dateString) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}:\d{2})$/;
    const match = dateString.match(regex);

    if (!match) {
        throw new Error('Invalid date format. Expected YYYY-MM-DDTHH:MM:SS±HH:MM');
    }

    const [, year, month, day, hours, minutes, seconds, offset] = match;
    const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    return date;
}

export { formatDateWithTimezone, parseFormattedDate };