import "./docHeader.scss";

import {Link, useLocation} from "react-router-dom";

import {AiOutlinePlusSquare} from "react-icons/ai";
import LoadIcon from "components/LoadIcon";
import React from "react";
import {useSelector} from "react-redux";

// import PropTypes from "prop-types";

// DocHeader.propTypes = {
// 	docTypeInfo: PropTypes.object,
// };

// DocHeader.defaultProps = {
// 	docTypeInfo: null,
// };

function DocHeader(props) {
	const docTypeInfo = useSelector(state => state.docs.types);
	const location = useLocation();

	return (
		<div className="doc-header grid">
			<div className="row cg-0 doc-header__list">
				{docTypeInfo.loading ? (
					<div className="c-10 m-8 doc-header__list__item--load">
						Loading <LoadIcon />
					</div>
				) : (
					docTypeInfo.data.map((value, index) => (
						<Link
							key={value._id}
							to={`/docs/${value._id}`}
							className={`c-2 m-4 doc-header__list__item${
								location.pathname.includes(`/docs/${value._id}`)
									? " doc-header__list__item--active"
									: ""
							}`}
						>
							{value.type}
						</Link>
					))
				)}
				<Link to="/docs" className="c-2 m-4 doc-header__list__item">
					<AiOutlinePlusSquare />
				</Link>
				{/* <li className="doc-header__list__right-bar-btn">
					<DocRightBar
						activedType={activedType}
						activedTitle={activedTitle}
						titles={titles}
					/>
				</li> */}
			</div>
		</div>
	);
}

export default DocHeader;
