import "./header.scss";

import {Link} from "react-router-dom";
import React from "react";
import {linkStyle} from "assets/styles/styles";

function Header(props) {
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
					<Link to="/" className="header__list__group__item">
						Home
					</Link>
					<Link className="header__list__group__item" to="/playTogether">
						Game
					</Link>
					<Link className="header__list__group__item" to="/todo">
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
