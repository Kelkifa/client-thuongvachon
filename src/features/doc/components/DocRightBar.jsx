import "./docRightBar.scss";

import {AiFillCaretDown} from "react-icons/ai";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

DocRightBar.propTypes = {
	activedType: PropTypes.object,
	activedTitle: PropTypes.string,
	titles: PropTypes.array,
};

DocRightBar.defaultProps = {
	activedType: null,
	activedTitle: null,
	titles: [], // [{_id: String, }]
};
function DocRightBar(props) {
	// PROPS
	const {titles, activedType, activedTitle} = props;

	// console.log(`[activedTitle]`, activedTitle);
	// STATES
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
					{titles.map(value => (
						<Link
							key={value._id}
							to={`?type=${activedType._id ? activedType._id : ""}&title=${
								value._id
							}`}
							className="doc-rightbar__list__item"
						>
							<li
								className={
									value._id === activedTitle
										? "doc-rightbar__list__item--active"
										: ""
								}
							>
								{value.title}
							</li>
						</Link>
					))}
				</ul>
			)}
		</div>
	);
}

export default DocRightBar;
