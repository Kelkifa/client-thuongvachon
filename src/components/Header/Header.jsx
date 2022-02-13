import "./header.scss";

import HeaderAuth from "./components/HeaderAuth";
import HeaderGroupSelect from "./components/HeaderGroupSelect";
import HeaderPageList from "./HeaderPageList";
import React from "react";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

// import PropTypes from "prop-types";

// Header.propTypes = {
// 	userInfo: PropTypes.object,
// };

// Header.defaultProps = {
// 	userInfo: undefined,
// };

const headerItemList = [
	{
		text: "Icon",
		to: "/",
	},
	{
		text: "Home",
		to: "/home",
	},
	{
		text: "ToDo",
		to: "/todo",
	},
	{
		text: "Doc",
		to: "/docs",
	},
	{
		text: "Group",
		to: "/groups",
	},
];
function Header() {
	// useLocation
	const location = useLocation();
	const urlArr = location.pathname.split("/");

	const userInfo = useSelector(state => state.auth);

	const pageList = userInfo.user.isAdmin
		? [...headerItemList, {text: "Game", to: "/playTogether"}]
		: headerItemList;
	// Render
	return (
		<div className="header grid wide">
			<div className="c-10 header__list">
				<HeaderPageList url={urlArr[1]} pageList={pageList} />
				<div className="header__list__right">
					<HeaderGroupSelect />
					<HeaderAuth urlArr={urlArr} />
				</div>
			</div>
		</div>
	);
}

export default Header;
