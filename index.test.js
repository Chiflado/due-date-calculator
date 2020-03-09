const { dueDateCalculator, setNextDayStart, setDayEnd } = require('./index');
 
test('calculate one hour', () => {
    const test = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', 3600000);
    expect(test).toEqual(new Date(1583768580000));
});

test('calculate two day long due date', () => {
    const dueDate = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', 7200000);
    expect(dueDate).toEqual(new Date(1583829780000));
})

test('sets end of the workday time', () => {
    const dayEnd = setDayEnd(1583764980000);
    expect(dayEnd).toEqual(Date.parse('Mar 09 2020 17:00:00 GMT+0100'))
})

test('sets start of the next workday time', () => {
    const dayEnd = setNextDayStart(1583764980000);
    expect(dayEnd).toEqual(Date.parse('Mar 10 2020 09:00:00 GMT+0100'))
})