import "./docContent.scss";

import DocCompileContent from "./DocCompileContent";
import DocForm from "./DocForm";
import PropTypes from "prop-types";
import React from "react";

DocContent.propTypes = {
	activedType: PropTypes.object,
	activedTitle: PropTypes.string,

	content: PropTypes.object,
};

DocContent.defaultProps = {
	activedType: null,
	activedTitle: null,

	content: null,
};

function DocContent(props) {
	const {activedType, activedTitle, content} = props;
	return (
		<div className="doc-content">
			{!content ? (
				<DocForm type={activedType} />
			) : (
				<DocCompileContent content={content} />
			)}
		</div>
	);
}

export default DocContent;
