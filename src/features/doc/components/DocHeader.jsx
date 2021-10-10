import "./docHeader.scss";

import {AiOutlinePlusSquare} from "react-icons/ai";
import DocRightBar from "./DocRightBar";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

DocHeader.propTypes = {
	titles: PropTypes.array,
	docTypes: PropTypes.array,

	activedType: PropTypes.object,
	activedTitle: PropTypes.string,
};

DocHeader.defaultProps = {
	titles: [],
	docTypes: [],

	activedType: {},
	activedTitle: null,
};

function DocHeader(props) {
	const {titles, docTypes, activedTitle, activedType} = props;

	return (
		<div className="doc-header grid">
			<div className="row cg-0 doc-header__list">
				{docTypes.map((value, index) => (
					<Link
						key={value._id}
						to={`?type=${value._id}`}
						className={`c-2 m-4 doc-header__list__item${
							activedType._id === value._id
								? " doc-header__list__item--active"
								: ""
						}`}
					>
						{value.type}
					</Link>
				))}
				<Link to="?" className="m-2 doc-header__list__item">
					<AiOutlinePlusSquare />
				</Link>
				<li className="doc-header__list__right-bar-btn">
					<DocRightBar
						activedType={activedType}
						activedTitle={activedTitle}
						titles={titles}
					/>
				</li>
			</div>
		</div>
	);
}

export default DocHeader;
