import "./docRightBar.scss";

import {AiFillCaretDown} from "react-icons/ai";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

DocRightBar.propTypes = {};

function DocRightBar(props) {
	const [show, setShow] = useState(false);
	const handleClick = () => {
		setShow(!show);
	};
	return (
		<div className="doc-rightbar">
			<div
				onClick={handleClick}
				className={`doc-rightbar__icon${
					show ? " doc-rightbar__icon--active" : ""
				}`}
			>
				<AiFillCaretDown />
			</div>
			{show && (
				<ul className="doc-rightbar__list">
					<li>1</li>
					<li>1</li>
					<li>1</li>
					<li>1</li>
					<li>1</li>
				</ul>
			)}
		</div>
	);
}

export default DocRightBar;
