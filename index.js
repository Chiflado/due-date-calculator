'use strict';

const {setDayEnd, setNextDayStart} = require('./utils');

exports.dueDateCalculator = (start, turnaround) => {
    const startTime = Date.parse(start);
    const finishDate = watchWorkingHours(startTime, turnaround);
    return finishDate;
}

function watchWorkingHours(startTime, turnaround) {
    const dayEnd = setDayEnd(startTime);
    const nextDayStart = setNextDayStart(startTime);
    if (startTime + turnaround > dayEnd) {
        let remainTurnaround = turnaround - (dayEnd - startTime);
        return new Date(nextDayStart + remainTurnaround);
    }
    return new Date(startTime + turnaround);
}
