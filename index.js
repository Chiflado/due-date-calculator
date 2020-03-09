'use strict';

const {setDayEnd, setNextDayStart} = require('./utils');

exports.dueDateCalculator = (start, turnaround) => {
    const startTime = Date.parse(start);
    const finishDate = watchWorkingHours(startTime, turnaround);
    return finishDate;
}

function watchWorkingHours(startTime, turnaround) {
    let dayEnd = setDayEnd(startTime);
    const nextDayStart = setNextDayStart(startTime);
    if (startTime + turnaround > dayEnd) {
        let remainTurnaround = turnaround - (dayEnd - startTime);
        const dueDate = new Date(nextDayStart + remainTurnaround);
        dayEnd = setDayEnd(dueDate);
        if (dueDate > dayEnd) {
            return watchWorkingHours(nextDayStart, remainTurnaround);
        }
        return dueDate;
    }
    return new Date(startTime + turnaround);
}
