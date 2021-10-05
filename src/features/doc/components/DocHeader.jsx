import "./docHeader.scss";

import DocRightBar from "./DocRightBar";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

DocHeader.propTypes = {
	docTypes: PropTypes.array,
};

DocHeader.defaultProps = {
	docTypes: [
		"html",
		"javascript",
		"nodejs",
		"mongodb",
		"reactjs",
		"css",
		"mobile",
	],
};

function DocHeader(props) {
	const {docTypes} = props;

	return (
		<div className="doc-header grid">
			<div className="row doc-header__list">
				{docTypes.map((value, index) => (
					<Link
						key={index}
						to={`?doc=${value}`}
						className="c-2 m4 doc-header__list__item"
					>
						{value}
					</Link>
				))}
				<li className="doc-header__list__right-bar-btn">
					<DocRightBar />
				</li>
			</div>
		</div>
	);
}

export default DocHeader;
