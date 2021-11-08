import "./GifLoading.scss";

import PropTypes from "prop-types";
import React from "react";

GifLoading.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
};

GifLoading.defaultProps = {
	width: "300px",
	height: "200px",
};

function GifLoading({width, height}) {
	return (
		<div className="gif-loading">
			<div className="gif-loading__gif" style={{width, height}}></div>
		</div>
	);
}

export default GifLoading;
