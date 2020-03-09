'use strict';

exports.setDayEnd = (startTime) => {
    const startDate = new Date(startTime);
    const dayEnd = startDate.setHours(17, 0, 0, 0);
    return dayEnd;
}

exports.setNextDayStart = (startTime) => {
    const startDate = new Date(startTime);
    startDate.setHours(9, 0, 0, 0);
    let nextDayStart = startDate.setDate(startDate.getDate() + 1);
    return nextDayStart;
}

exports.watchWeekends = (nextDayStart) => {
    const nextDayStartDate = new Date(nextDayStart);
    if (nextDayStartDate.getDay() === 6) {
        return nextDayStartDate.setDate(nextDayStartDate.getDate() + 2);
    }
    if (nextDayStartDate.getDay() === 0) {
        return nextDayStartDate.setDate(nextDayStartDate.getDate() + 1);
    }
    return nextDayStart;
}