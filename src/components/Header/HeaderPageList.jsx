import "./headerPageList.scss";

import {FiMenu} from "react-icons/fi";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import {VscChromeClose} from "react-icons/vsc";
import clsx from "clsx";
import {useState} from "react";

HeaderPageList.propTypes = {
	pageList: PropTypes.array, // schema: {text: String, to: String}
	url: PropTypes.string,
};

HeaderPageList.defaultProps = {
	pageList: [],
	url: null,
};

function HeaderPageList({pageList, url}) {
	// useState
	const [isShow, setIsShow] = useState(false);

	return (
		<div
			className="header-page-list"
			// Number item in header + close  --itemNumber is a css variable
			style={{"--itemNumber": pageList.length + 2}}
		>
			{isShow && (
				<div className="header-page-list__mobile">
					{pageList.map(value => (
						<Link
							key={value.text}
							to={value.to}
							className="header-page-list__mobile__item"
							style={{height: `${100 / (pageList.length + 1)}%`}}
							onClick={() => {
								setIsShow(false);
							}}
						>
							{value.text}
						</Link>
					))}
					<div
						onClick={() => {
							setIsShow(false);
						}}
						className="header-page-list__mobile__item"
					>
						<VscChromeClose style={{color: "white", textdecoration: "none"}} />
					</div>
				</div>
			)}

			<div className="header-page-list__pc">
				{pageList.map((page, index) => (
					<Link
						key={index}
						to={page.to}
						className={clsx("header-page-list__pc__item", {
							"header-page-list__pc__item--active": "/" + url === page.to,
						})}
					>
						{page.text}
					</Link>
				))}
			</div>

			{!isShow && (
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
