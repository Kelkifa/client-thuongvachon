import "./divButton.scss";

import PropTypes from "prop-types";
import React from "react";

DivButton.propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func,
};

DivButton.defaultProps = {
	text: "",
	onClick: () => {},
};

function DivButton(props) {
	// Props
	const {text, onClick} = props;

	// Render
	return (
		<div className="div-button" onClick={onClick}>
			{text}
		</div>
	);
}

export default DivButton;
