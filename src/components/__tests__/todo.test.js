const { getFirstLastDay, getDateList } = require("assets/core/coreCalendar");


// calculator.test.js
describe('First day', () => {
    const trueResult = {
        day: 3,
        date: 1,
    }
    it('First day with two params', () => {
        // Setup

        // Run
        const firstDate = getFirstLastDay(new Date(), 'first');
        // Assert
        expect(firstDate).toEqual(new Date(2021, 7, 32));
    });
})