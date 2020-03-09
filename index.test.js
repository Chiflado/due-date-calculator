const { dueDateCalculator } = require('./index');

test('calculate one hour', () => {
    const test = dueDateCalculator('Mar 09 2020 15:43:00 GMT+0100', 3600000);
    expect(test).toBe(Date(1583768580000));
});