import "./mainLayout.scss";

import Footer from "components/footer";
import Header from "components/Header/Header";
import React from "react";

// import {useSelector} from "react-redux";

// import backgroundImg = game

function MainLayout(props) {
	const {children} = props;

	// RENDER
	return (
		<div className="main-layout custom-scroll">
			<div className="main-layout__container">
				<Header />
				<div className="main-layout__body">{children}</div>
			</div>
			<Footer />
		</div>
	);
}

export default MainLayout;
