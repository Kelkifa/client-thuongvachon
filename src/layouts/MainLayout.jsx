import "./mainLayout.scss";

import Header from "components/Header/Header";
import PropTypes from "prop-types";
import React from "react";

function MainLayout(props) {
	const {children} = props;

	// RENDER
	return (
		<div className="main-layout__container custom-scroll">
			<div className="main-layout">
				<Header />
				<div className="main-layout__content">{children}</div>
			</div>
		</div>
	);
}

export default MainLayout;
