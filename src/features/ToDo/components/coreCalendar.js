import { date } from "yup";
import randomColor from "randomcolor";

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


/** Get Date List in a month
 *  Input: choose day (type Date)
 *  Output: Array of Date in a month of choosen day (type: Array)
 */
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
    // console.log(maxBeforeDay);
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
/** Random a color (rbg type)
 *  Input: 
 *  isHex: (rbg or hex type) (type: boolean [true: hex, false:rbg])
 *  nonRepeatArr: (type: Array, List color will not repeat)
 *  Output: new Color
 */
const randomNoteColor = (isHex = false, nonRepeatArr, luminosity = 'dark', opacity = 0.5) => {
    let newColor = randomColor({
        luminosity,
        format: "rgba",
        alpha: opacity, // e.g. 'rgba(9, 1, 107, 0.5)',
    });
    do {
        newColor = randomColor({
            luminosity,
            format: "rgba",
            alpha: opacity, // e.g. 'rgba(9, 1, 107, 0.5)',
        });
    } while (nonRepeatArr.includes(newColor))
    return newColor;
}

/** Input:
 * notes: list of note (type: Object, schema: {content:String, from: Date, to: Date }])
 * dates: list of date in the month (type: Array, [Date])
 *  Output:
 * Layer is of notes, sort by notes
 */
export const getLayerNote = (notes) => {
    notes.sort((a, b) => a.from - b.from);

    const layerTime = [];
    const radomedColor = [];

    const luminosityList = ['bright', 'light', 'dark'];
    const noteLayer = notes.map((value, index) => {
        const geaterNoteIndex = layerTime.findIndex(val => value.from > val);
        const color = randomNoteColor(false, radomedColor, luminosityList[index % 3], 0.5);
        radomedColor.push(color);

        if (geaterNoteIndex === -1) {
            layerTime.push(value.to);
            return { ...value, layer: layerTime.length - 1, color };
        }

        layerTime[geaterNoteIndex] = value.to;
        return { ...value, layer: geaterNoteIndex, color };
    });

    return noteLayer;
}
