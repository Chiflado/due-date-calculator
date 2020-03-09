const { dueDateCalculator } = require('./index');

test('test', () => {
    const test = dueDateCalculator();
    expect(test).toBe('It works');
});