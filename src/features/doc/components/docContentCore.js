const CONTENT_TEST =
    "asdkasjldj<b> Title code example </b>Noi dung dung của test <code>const test = 123;\n const a = (value)=>{ return value; }\n </code>";


function getRegExpFromElementList(elementList = []) {
    if (!elementList || elementList.length === 0) return undefined;

    const startElementRegArr = elementList.map(value => {

        if (value === null || value === "") return '';

        return `<${value}>(.*|\n*)(.|\n)*</${value}>`;
    });

    return `(${startElementRegArr.join("|")})`;

}


/**
 *  Not alow two element in a same line
 */
export const getArrElementStr = (inputStr = CONTENT_TEST, startElements = []) => {

    // const startElements = ['b', 'code', 'img'];


    const startElementRegExp = getRegExpFromElementList(startElements);

    // const testRegex = new RegExp(/(<b>.*\s*.*\s*<\/b>|<code>.*\s*.*\s*<\/code>)/, 'i');
    const testRegex = new RegExp(startElementRegExp, 'gi');

    return inputStr.split(testRegex);

}

export const getElementNameAndContent = (inputStr = null) => {
    // const foundElementName = inputStr.match(/<.+>(?=.+)/i);
    // console.log(`[foundElementName]`, foundElementName);
    if (inputStr === null || inputStr === "") return { name: null, content: null };

    const closeCharacterIndex = inputStr.indexOf('>');
    if (closeCharacterIndex === -1) return { name: null, content: inputStr };

    const name = inputStr.substring(0, closeCharacterIndex).replace('<', '');
    // console.log(`[character]`, inputStr);
    // console.log(`[name]`, name)
    const content = inputStr.replace(`<${name}>`, '').replace(`</${name}>`, '');
    return { name, content };
}

export const processDownLine = (text = null) => {
    if (text === null || text === '') return;

    let splitedText = text.split(/(\n)/gi);
    for (let i = 1; i < splitedText.length; i += 2) {
        splitedText[i] = <br />
    }
    if (splitedText[0] === "" && splitedText.length > 1) {
        splitedText[1] = "";
    }
    if (splitedText[splitedText.length - 1] === "" && splitedText.length <= 2) {
        splitedText[splitedText.length - 2] = "";
    }
    // console.log(`[splitedText]`, splitedText);
    return splitedText;
}



/** ORIGIN */

export const layoutString = (textInput = CONTENT_TEST, startElements = []) => {

    const startRegExp = new RegExp(startElements.join('|'));
    // const endRegExp = new RegExp(endElements.join('|'));

    const layout = [];
    let i = 0;
    let step = 0;
    while (i < textInput.length) {
        const foundStartEle = startRegExp.exec(textInput.substring(i));
        const endRegExp = foundStartEle ? new RegExp(getCloseEle(foundStartEle[0])) : null;
        const foundEndEle = endRegExp ? endRegExp.exec(textInput.substring(i)) : null;

        // Tìm được cả thẻ đóng và thẻ mở thì push thẻ chuỗi đó từ index thẻ mở đến index thẻ đóng + độ dài thẻ đóng vào layout
        if (foundStartEle !== null && foundEndEle !== null) {
            if (foundStartEle.index > 0) {
                layout.push({ type: 'text', value: textInput.substring(i, foundStartEle.index + i) });
                // layout.push(toElement('text', textInput.substring(i, foundStartEle.index + i)));
            }
            const subEle = textInput.substring(foundStartEle.index + i, foundEndEle.index + foundEndEle[0].length + i);
            layout.push({ type: foundStartEle[0], value: subEle.replace(foundStartEle[0], "").replace(foundEndEle[0], "") });
            // layout.push(toElement(foundStartEle[0], subEle.replace(foundStartEle[0], "").replace(foundEndEle[0], "")));

            i = foundEndEle.index + foundEndEle[0].length + i;
        }
        // Không tìm được thẻ đóng hoặc thẻ mở thì push phần còn lại vào layout
        else {
            layout.push({ type: 'text', value: textInput.substring(i) });
            // layout.push(toElement('text', textInput.substring(i)));
            break;
        }

        if (step === 100) break;
        step++;
    }

    return layout;

}

function getCloseEle(openEle) {
    if (openEle[0] !== '<' || openEle[openEle.length - 1] !== '>') return null;
    return `${openEle[0]}/${openEle.substring(1)}`;
}

// function toElement(elemStr, content) {
//     if (!content) return null;
//     switch (elemStr) {
//         case 'text':
//             // const createdEle = <div>{content}</div>
//             // console.log(`[createdEle]`, createdEle);
//             return <div>{content}</div>;
//         case '<b>':
//             return <b>{content}</b>
//         case '<code>':
//             return <code>{content}</code>
//         case '<img>':
//             return <img alt='err' src={content} />;

//         default:
//             return <div>{content}</div>;
//     }
// }
