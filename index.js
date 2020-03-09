'use strict';

const {setDayEnd, setNextDayStart, watchWeekends} = require('./utils');

exports.dueDateCalculator = (start, turnaround) => {
    const startTime = Date.parse(start);
    const finishDate = watchWorkingHours(startTime, turnaround);
    return finishDate;
}

function watchWorkingHours(startTime, turnaround) {
    let dayEnd = setDayEnd(startTime);
    let nextDayStart = setNextDayStart(startTime);
    nextDayStart = watchWeekends(nextDayStart);
    if (startTime + turnaround > dayEnd) {
        let remainTurnaround = turnaround - (dayEnd - startTime);
        const dueDate = new Date(nextDayStart + remainTurnaround);
        dayEnd = setDayEnd(nextDayStart);
        if (dueDate > dayEnd) {
            return watchWorkingHours(nextDayStart, remainTurnaround);
        }
        return dueDate;
    }
    return new Date(startTime + turnaround);
}

