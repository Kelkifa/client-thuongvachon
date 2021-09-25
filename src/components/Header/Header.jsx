import "./header.scss";

import {Link, useLocation} from "react-router-dom";

import React from "react";
import {linkStyle} from "assets/styles/styles";

// import {useRouteMatch} from "react-router";

function Header(props) {
	const location = useLocation();
	const url = location.pathname.split("/")[1];

	return (
		<div className="header grid wide">
			<div className="c-10 header__list">
				<div className="header__list__group">
					<Link
						to="?ab=1"
						className="header__list__group__item header__list__group__item--icon"
					>
						Icon
					</Link>
					<Link
						to="/home"
						className={`header__list__group__item ${
							url === "home" ? "header__list__group__item--active" : ""
						}`}
					>
						Home
					</Link>
					<Link
						className={`header__list__group__item ${
							url === "playTogether" ? "header__list__group__item--active" : ""
						}`}
						to="/playTogether"
					>
						Game
					</Link>
					<Link
						className={`header__list__group__item ${
							url === "todo" ? "header__list__group__item--active" : ""
						}`}
						to="/todo"
					>
						To Do
					</Link>
				</div>
				<div className="header__list__group header__list__group--right">
					<Link
						className="header__list__group__item header__list__group__item--auth"
						to="/auth/login"
					>
						Login | Register
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Header;
