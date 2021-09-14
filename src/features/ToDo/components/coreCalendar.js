/** Get First day or last day with data:currTime, type:first || last || 0 || 1 
 *  Output 
 * 0: Sunday
 * 1: Monday
 * ...
 * 6: Saturday
*/
export const getFirstLastDay = (date, type) => {
    const setDate = date ? date : new Date();

    const year = setDate.getFullYear();
    const month = setDate.getMonth();

    if (type === 'last' || type === 1 || type === true) {
        const lastDay = new Date(year, month + 1, 0);
        return lastDay;
        // return { day: lastDay.getDay(), date: lastDay.getDate() };
    }

    const firstDay = new Date(year, month, 1);
    return firstDay;
}

export const getDateList = (date) => {
    // Init
    const maxCurDay = getFirstLastDay(date, 'last');
    const year = maxCurDay.getFullYear();
    const month = maxCurDay.getMonth();

    const maxBeforeDay = getFirstLastDay(new Date(
        date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear(),
        date.getMonth() === 0 ? 11 : date.getMonth() - 1,
        1),
        'last'
    );
    const minAfterDay = getFirstLastDay(new Date(
        date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear(),
        date.getMonth() === 11 ? 0 : date.getMonth() + 1,
        1),
        'first');

    // Create before date list
    console.log(maxBeforeDay);
    const beforeTimeArr = [];
    let changeDay = maxBeforeDay.getDay() === 6 ? -1 : maxBeforeDay.getDay();
    let changeDate = maxBeforeDay.getDate();

    while (changeDay >= 0) {
        beforeTimeArr.unshift(new Date(maxBeforeDay.getFullYear(), maxBeforeDay.getMonth(), changeDate));
        changeDay -= 1;
        changeDate -= 1;
    }

    // Create After date list
    const afterTimeArr = [];
    changeDay = minAfterDay.getDay() === 0 ? 7 : minAfterDay.getDay();
    changeDate = 1;
    while (changeDay <= 6) {
        afterTimeArr.push(new Date(minAfterDay.getFullYear(), minAfterDay.getMonth(), changeDate));
        changeDay += 1;
        changeDate += 1;
    }

    // Create current date list
    const curTimeArr = [];
    changeDate = 1;
    const maxCurDate = maxCurDay.getDate();
    while (changeDate <= maxCurDate) {
        curTimeArr.push((new Date(year, month, changeDate)));
        changeDate++;
    }

    return beforeTimeArr.concat(curTimeArr, afterTimeArr);


    // return afterTimeArr;
    // return timeArr;
}
