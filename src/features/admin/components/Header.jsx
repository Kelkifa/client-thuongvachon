import "./header.scss";

import {AiOutlineMenu, AiOutlineOrderedList} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";

import {FiMail} from "react-icons/fi";
import {IoMdNotificationsOutline} from "react-icons/io";
import React from "react";
import {linkStyle} from "assets/styles/styles";

const getLinkTo = (url, value) => {
	const indexCurrUrl = url.indexOf(value) + value.length;
	return url.substr(0, indexCurrUrl);
};

function Header(props) {
	const location = useLocation();
	const url = location.pathname;
	const urlArr = url.split("/");
	urlArr.shift();

	return (
		<div className="admin-header-container">
			<div className="admin-header grid">
				<div className="row admin-header__top">
					<div className="c-6 m-12 row cg-15 admin-header__top__left">
						<AiOutlineMenu />
						<div>Databoard</div>
						<div>Users</div>
						<div>Settings</div>
					</div>

					<div className="c-6 m-12 row cg-15 admin-header__top__right">
						<IoMdNotificationsOutline />
						<AiOutlineOrderedList />
						<FiMail />
					</div>
				</div>

				<div className="admin-header__botton">
					{urlArr.map((value, index) => {
						const currUrl = getLinkTo(url, value);

						return (
							<span key={value}>
								<Link to={currUrl} style={linkStyle}>
									<span className="admin-header__botton__link">{value}</span>
								</Link>
								<span> / </span>
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Header;
