const { dueDateCalculator } = require('./index');
const { setNextDayStart, setDayEnd } = require('./utils');
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
    const dayEnd = setNextDayStart(1583764980000);
    expect(dayEnd).toEqual(Date.parse('Mar 10 2020 09:00:00 GMT+0100'));
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
})