
export function getDateKey(date) {
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

export function getCurrentDateKey() {
    const date = new Date();
    return getDateKey(date); 
}

export function getMonthYearKey(date) {
    return `${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function parseDateKey(dateKey) {
    return new Date(dateKey);
}

export function parseMonthYearKey(dateKey) {
    const splitDate = dateKey.split("-");
    return new Date(splitDate[1], splitDate[0]);
}

export function getDaysInMonth(date) {
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    return lastDay.getDate();
}

export function getStartWeekday(date) {
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return startDay.getDay();
}

