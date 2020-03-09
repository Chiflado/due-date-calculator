const { dueDateCalculator } = require('./index');
const { setNextDayStart, setDayEnd, watchWeekends } = require('./utils');
const oneHour = 60*60*1000;

test('calculate one hour', () => {
    const dueDate = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', oneHour);
    const parsedExpectedDate = Date.parse('Mar 09 2020 16:43:00 GMT+0100');
    expect(dueDate).toEqual(new Date(parsedExpectedDate));
});

test('calculate two day long due date', () => {
    const dueDate = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', oneHour * 2);
    const parsedExpectedDate = Date.parse('Mar 10 2020 09:43:00 GMT+0100');
    expect(dueDate).toEqual(new Date(parsedExpectedDate));
})

test('sets end of the workday time', () => {
    const parsedTime = Date.parse('Mar 09 2020 15:43:00 GMT+0100');
    const dayEnd = setDayEnd(parsedTime);
    expect(dayEnd).toEqual(Date.parse('Mar 09 2020 17:00:00 GMT+0100'));
})

test('sets start of the next workday time', () => {
    const parsedTime = Date.parse('Mar 09 2020 15:43:00 GMT+0100');
    const dayStart = setNextDayStart(parsedTime);
    expect(dayStart).toEqual(Date.parse('Mar 10 2020 09:00:00 GMT+0100'));
})

test('calculate more than two day due date', () => {
    const dueDate = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', oneHour * 10);
    const parsedExpectedDate = Date.parse('Mar 11 2020 09:43:00 GMT+0100');
    expect(dueDate).toEqual(new Date(parsedExpectedDate));
})

test('calculate due date with weekend', () => {
    
    const dueDate = dueDateCalculator('Mar 13 2020 15:43:00 GMT+0100', oneHour * 10);
    const expectedDate = Date.parse('Mar 17 2020 09:43:00 GMT+0100');
    expect(dueDate).toEqual(new Date(expectedDate));

    const dueDate2 = dueDateCalculator('Mar 13 2020 15:43:00 GMT+0100', oneHour * 2);
    const expectedDate2 = Date.parse('Mar 16 2020 09:43:00 GMT+0100');
    expect(dueDate2).toEqual(new Date(expectedDate2));
    
    const expectedDate3 = Date.parse('Mar 18 2020 15:43:00 GMT+0100');
    const dueDate3 = dueDateCalculator('Mar 11 2020 15:43:00 GMT+0100', oneHour * 40);
    expect(dueDate3).toEqual(new Date(expectedDate3));
    
    const expectedDate4 = Date.parse('Mar 26 2020 9:43:00 GMT+0100');
    const dueDate4 = dueDateCalculator('Mar 11 2020 15:43:00 GMT+0100', oneHour * 82);
    expect(dueDate4).toEqual(new Date(expectedDate4));
})

test('sets next day start if next day is weekend', () => {
    const parsedExpectedStartDate = Date.parse('Mar 16 2020 09:00:00 GMT+0100');

    const parsedStartDate = Date.parse('Mar 14 2020 09:00:00 GMT+0100');
    const nextDayStart1 = watchWeekends(parsedStartDate);
    expect(nextDayStart1).toEqual(parsedExpectedStartDate);
    
    const parsedStartDate2 = Date.parse('Mar 15 2020 09:00:00 GMT+0100');
    const nextDayStart2 = watchWeekends(parsedStartDate2);
    expect(nextDayStart2).toEqual(parsedExpectedStartDate);
})