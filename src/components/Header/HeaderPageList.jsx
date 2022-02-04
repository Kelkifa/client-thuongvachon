import "./headerPageList.scss";

import {FiMenu} from "react-icons/fi";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import {VscChromeClose} from "react-icons/vsc";
import {useState} from "react";

HeaderPageList.propTypes = {
	pageList: PropTypes.array, // schema: {text: String, to: String}
	url: PropTypes.string,
};

HeaderPageList.defaultProps = {
	pageList: [],
	url: null,
};

const MOBILE_SIZE = 650;
function HeaderPageList({pageList, url}) {
	// useState
	const [isShow, setIsShow] = useState(
		// window.innerWidth < MOBILE_SIZE ? false : true
		false
	);

	return (
		<div
			className="header-page-list"
			// Number item in header + close  --itemNumber is a css variable
			style={{"--itemNumber": pageList.length + 2}}
		>
			{isShow ? (
				<div className="header-page-list__list">
					{pageList.map(value => (
						<Link
							onClick={() => {
								if (window.innerWidth <= MOBILE_SIZE) setIsShow(false);
							}}
							key={value.text}
							to={value.to}
							className={`header-page-list__list__item ${
								"/" + url === value.to
									? "header-page-list__list__item--active"
									: ""
							}`}
						>
							{value.text}
						</Link>
					))}
					<div
						className="header-page-list__list__item header-page-list__list__item--close"
						onClick={() => {
							setIsShow(false);
						}}
					>
						<VscChromeClose style={{color: "white", textdecoration: "none"}} />
					</div>
				</div>
			) : (
				<div className="header-page-list__menu-icon">
					<FiMenu
						onClick={() => {
							setIsShow(true);
						}}
						className="header-page-list__list__menu-icon"
					/>
				</div>
			)}
		</div>
	);
}

export default HeaderPageList;
