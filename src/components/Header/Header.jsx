import "./header.scss";

import HeaderAuth from "./components/HeaderAuth";
import HeaderPageList from "./HeaderPageList";
import React from "react";
import {useLocation} from "react-router-dom";

// import PropTypes from "prop-types";



// Header.propTypes = {
// 	userInfo: PropTypes.object,
// };

// Header.defaultProps = {
// 	userInfo: undefined,
// };

function Header({userInfo}) {
	// useLocation
	const location = useLocation();
	const urlArr = location.pathname.split("/");

	// Render
	return (
		<div className="header grid wide">
			<div className="c-10 header__list">
				<HeaderPageList
					url={urlArr[1]}
					pageList={[
						{
							text: "Icon",
							to: "/",
						},
						{
							text: "Home",
							to: "/home",
						},
						{
							text: "Game",
							to: "/playTogether",
						},
						{
							text: "ToDo",
							to: "/todo",
						},
						{
							text: "Docs",
							to: "/docs",
						},
					]}
				/>
				<HeaderAuth urlArr={urlArr} />
			</div>
		</div>
	);
}

export default Header;
