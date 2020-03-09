const { dueDateCalculator } = require('./index');
const { setNextDayStart, setDayEnd, watchWeekends } = require('./utils');
const oneHour = 60*60*1000;

test('calculate one hour', () => {
    const dueDate = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', oneHour);
    expect(dueDate).toEqual(new Date(1583768580000));
});

test('calculate two day long due date', () => {
    const dueDate = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', oneHour * 2);
    expect(dueDate).toEqual(new Date(1583829780000));
})

test('sets end of the workday time', () => {
    const dayEnd = setDayEnd(1583764980000);
    expect(dayEnd).toEqual(Date.parse('Mar 09 2020 17:00:00 GMT+0100'));
})

test('sets start of the next workday time', () => {
    const dayStart = setNextDayStart(1583764980000);
    expect(dayStart).toEqual(Date.parse('Mar 10 2020 09:00:00 GMT+0100'));
})

test('calculate more than two day due date', () => {
    const dueDate = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', oneHour * 10);
    expect(dueDate).toEqual(new Date(1583916180000));
})

test('calculate due date with weekend', () => {
    const dueDate = dueDateCalculator('Mar 13 2020 15:43:00 GMT+0100', oneHour * 10);
    expect(dueDate).toEqual(new Date(1584434580000));
    const dueDate2 = dueDateCalculator('Mar 13 2020 15:43:00 GMT+0100', oneHour * 2);
    expect(dueDate2).toEqual(new Date(1584348180000));
    const expectedDate3 = Date.parse('Mar 18 2020 15:43:00 GMT+0100')
    const dueDate3 = dueDateCalculator('Mar 11 2020 15:43:00 GMT+0100', oneHour * 40);
    expect(dueDate3).toEqual(new Date(expectedDate3));
    const expectedDate4 = Date.parse('Mar 26 2020 9:43:00 GMT+0100')
    const dueDate4 = dueDateCalculator('Mar 11 2020 15:43:00 GMT+0100', oneHour * 82);
    expect(dueDate4).toEqual(new Date(expectedDate4));
})

test('sets next day start if next day is weekend', () => {
    const nextDayStart1 = watchWeekends(1584172800000);
    expect(nextDayStart1).toEqual(1584345600000);
    const nextDayStart2 = watchWeekends(1584259200000);
    expect(nextDayStart2).toEqual(1584345600000);
})