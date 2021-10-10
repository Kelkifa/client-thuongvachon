import {layoutString, processDownLine} from "./docContentCore";

import PropTypes from "prop-types";
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

DocCompileContent.propTypes = {
	content: PropTypes.object,
};

DocCompileContent.defaultProps = {
	content: {},
};

function DocCompileContent(props) {
	const {content} = props;
	const compileElement = ["<b>", "<code>", "<img>"];
	const layoutArr = content.content
		? layoutString(content.content, compileElement)
		: [];
	return (
		<div className="grid wide develop">
			<h2 className="doc-content__title">{content.title}</h2>
			<div className="doc-content__content">
				{layoutArr.map((value, index) => createEleFromStr(value, index))}
			</div>
		</div>
	);
}

export default DocCompileContent;
