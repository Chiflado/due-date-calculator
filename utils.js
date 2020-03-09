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