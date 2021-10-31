import "./mainLayout.scss";

import Header from "components/Header/Header";
import React from "react";

// import {useSelector} from "react-redux";

// import backgroundImg = game

function MainLayout(props) {
	const {children} = props;

	// RENDER
	return (
		<div className="main-layout custom-scroll">
			{/* <div className="main-layout__background"></div> */}
			<div className="main-layout__content">
				<Header />
				<div className="main-layout__content__body">{children}</div>
			</div>
		</div>
	);
}

export default MainLayout;
