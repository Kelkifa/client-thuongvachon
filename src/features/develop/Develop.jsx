import {
	layoutString,
	processDownLine,
} from "features/doc/components/docContentCore";

import React from "react";

function createEleFromStr(elementObj = null, index = 0) {
	if (elementObj === null) return null;

	const {type, value} = elementObj;

	const content = processDownLine(value);
	switch (type) {
		case "<b>":
			return <b key={index}>{content}</b>;
		case "<code>":
			return <code key={index}>{content}</code>;
		case "<img>":
			return <img key={index} src={content} alt="err" />;
		default:
			return <div key={index}>{content}</div>;
	}
}

const inputData =
	"asdkasjldj<b>Title code example </b>Noi dung dung của test <code>const test = 123;\n const a = (value)=>{ return value; }\n </code>";

function Develop(props) {
	const compileElement = ["<b>", "<code>", "<img>"];
	const layoutArr = layoutString(inputData, compileElement);
	return (
		<div className="grid wide develop">
			{layoutArr.map((value, index) => createEleFromStr(value, index))}
		</div>
	);
}

export default Develop;
