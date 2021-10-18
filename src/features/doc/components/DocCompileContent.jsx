import "./docCompileContent.scss";

import {layoutString, processDownLine} from "./docContentCore";

import PropTypes from "prop-types";
import React from "react";

function createEleFromStr(elementObj = null, index = 0) {
	if (elementObj === null) return null;

	const {type, value} = elementObj;

	const content = processDownLine(value);
	switch (type) {
		case "<b>":
			return <b>{content}</b>;
		case "<code>":
			return <code>{content}</code>;
		case "<img>":
			return <img src={content} alt="err" />;
		default:
			return <div>{content}</div>;
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
		<div className="doc-compile-content">
			<div className="grid wide-p97 doc-compile-content__container">
				<h2 className="doc-compile-content__container__title">
					{content.title}
				</h2>
				<div className="doc-compile-content__container__content">
					{layoutArr.map((value, index) => (
						<div className="doc-compile-content__container__content__item">
							{createEleFromStr(value, index)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default DocCompileContent;
