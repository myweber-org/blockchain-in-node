function formatDate(date, locale = 'en-US') {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    
    try {
        return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (error) {
        console.error('Invalid locale or date:', error);
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}

function getRelativeTime(date) {
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
    
    for (const [unit, seconds] of Object.entries(intervals)) {
        const count = Math.floor(diffInSeconds / seconds);
        if (count >= 1) {
            return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
        }
    }
    
    return 'just now';
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

export { formatDate, getRelativeTime, isValidDate };