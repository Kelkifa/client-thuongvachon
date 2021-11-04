import "./DocTitleBtn.scss";

import PropTypes from "prop-types";
import React from "react";

DocTitleBtn.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func,
};

DocTitleBtn.defaultProps = {
	className: "",
	text: "",
	onClick: null,
};

function DocTitleBtn({className, text, onClick}) {
	return <div className={`doc-title-btn ${className}`}>{text}</div>;
}

export default DocTitleBtn;
