const CHARACTER_SIZE = 8.974358974358974;
export const ffStrToArr = (str, width, line = 21) => {
    const resultArr = [];
    const characterNumber = Math.floor(width / CHARACTER_SIZE);

    let beginIndex = 0;
    for (let i = 0; i < line; i++) {
        const firstSlicedStr = str.slice(beginIndex, beginIndex + characterNumber);
        const lastSpaceIndex = firstSlicedStr.lastIndexOf(" ");

        const passSpace = i === 0 ? 0 : 1;


        if (str.length <= beginIndex + characterNumber) {
            const finalSlicedStr = firstSlicedStr.slice(passSpace, -1);
            resultArr.push(finalSlicedStr);
            beginIndex += firstSlicedStr.length;

            break;
        }
        const finalSlicedStr = firstSlicedStr.slice(passSpace, lastSpaceIndex);
        resultArr.push(finalSlicedStr.split(" ").map(value => ({ isTrue: null, value })));

        beginIndex += lastSpaceIndex;
    }

    // console.log(beginIndex)

    return resultArr;
}

export const ffStrToArr2 = (str, width = 560, line = 21) => {
    console.log(width);
    const characterNumber = Math.floor(width / CHARACTER_SIZE) * line;

    const slicedStr = str.slice(0, characterNumber);
    const lastSpaceIndex = slicedStr.lastIndexOf(' ');

    return str.slice(0, lastSpaceIndex).split(" ").map(value => ({ isTrue: null, value }));
}