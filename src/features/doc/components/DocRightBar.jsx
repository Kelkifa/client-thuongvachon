import "./docRightBar.scss";

import {AiFillCaretDown} from "react-icons/ai";
import {Link} from "react-router-dom";
import LoadIcon from "components/LoadIcon";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

DocRightBar.propTypes = {
	isLoading: PropTypes.bool,
	activedType: PropTypes.object,
	activedTitle: PropTypes.string,
	titles: PropTypes.array,
};

DocRightBar.defaultProps = {
	isLoading: true,
	activedType: null,
	activedTitle: null,
	titles: [], // [{_id: String, title: String}]
};
function DocRightBar(props) {
	// PROPS
	const {isLoading, titles, activedTitle} = props;

	// console.log(`[activedTitle]`, activedTitle);
	// STATES
	const [show, setShow] = useState(true);

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
					{isLoading && (
						<li className="doc-rightbar__list__item doc-rightbar__list__item--loading">
							Loading <LoadIcon />
						</li>
					)}
					{titles.map(value => (
						<Link
							to={`?title=${value._id}`}
							key={value._id}
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
