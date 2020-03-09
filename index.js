'use strict';

exports.dueDateCalculator = (start, turnaround) => {
    const startTime = Date.parse(start);
    const finishDate = Date(startTime + turnaround);
    return finishDate;
}
