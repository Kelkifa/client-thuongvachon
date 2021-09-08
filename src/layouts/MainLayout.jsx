import PropTypes from "prop-types";
import React from "react";

function MainLayout(props) {
	const {children} = props;

	// RENDER
	return <div>{children}</div>;
}

export default MainLayout;
