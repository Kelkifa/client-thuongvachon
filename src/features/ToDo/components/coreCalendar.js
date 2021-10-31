// import { date } from "yup";

import randomColor from "randomcolor";

/**
 * Get first or last date of a month 
 * @param {Date Object} date any date in a month for get first or last day, Default: new Date().
 * @param {*} type First or Last day. Value to get first date: any, to get last date ['last', 1, true].
 * @returns Date javascript object is last or first day
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


/**
 * Get Dates in a month with a date in that month
 * @param {Date javascript object} date is a date in a mounth to get all date of that month
 * @returns  Array of Date in a month of choosen day
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
export const randomNoteColor = (isHex = false, nonRepeatArr = [], luminosity = null, opacity = 0.5) => {
    const luminosityOptions = ['bright', 'light', 'dark'];
    const selectedLuminosity = luminosity ? luminosity : luminosityOptions[Math.floor(Math.random() * luminosityOptions.length)];

    let newColor = randomColor({
        luminosity: selectedLuminosity,
        format: "rgba",
        alpha: opacity, // e.g. 'rgba(9, 1, 107, 0.5)',
    });
    do {
        newColor = randomColor({
            luminosity: selectedLuminosity,
            format: "rgba",
            alpha: opacity, // e.g. 'rgba(9, 1, 107, 0.5)',
        });
    } while (nonRepeatArr.includes(newColor))
    return newColor;
}

/** Input:
 * notes: list of note (type: Object, schema: {content:String, from: Date, to: Date }])
 *  Output:
 * Layer is of notes, sort by notes
 */
export const getLayerNote = (notes) => {
    notes.sort((a, b) => a.from - b.from);

    const layerTime = [];


    const noteLayer = notes.map((value, index) => {
        const geaterNoteIndex = layerTime.findIndex(val => value.from > val);

        if (geaterNoteIndex === -1) {
            layerTime.push(value.to);
            return { ...value, layer: layerTime.length - 1 };
        }

        layerTime[geaterNoteIndex] = value.to;
        return { ...value, layer: geaterNoteIndex };
    });

    return noteLayer;
}

export const roundedDown = (number) => {
    /**
     * Rounded donw for 10
     * e.g: 
     * input: 2021
     * output: 2020
     */
    if (!number) return 0;
    const processedNumber = parseInt(number, 10);
    if (isNaN(processedNumber)) return 0;

    const subNumber = processedNumber % 10 === 0 ? 10 : processedNumber % 10;
    return processedNumber - subNumber;
}

export const compareDate = (date1, date2) => {
    if (typeof date1 !== 'object' || typeof date2 !== 'object') return false;
    if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear())
        return true;
    return false;
}