import "./header.scss";

import HeaderPageList from "./HeaderPageList";
import {Link} from "react-router-dom";
import React from "react";

// import {linkStyle} from "assets/styles/styles";

// import {useRouteMatch} from "react-router";

function Header(props) {
	// Render
	return (
		<div className="header grid wide">
			<div className="c-10 header__list">
				<HeaderPageList
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
				<div className="header__list__right">
					<Link to="/auth/login" style={{color: "unset"}}>
						Login | Register
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Header;
