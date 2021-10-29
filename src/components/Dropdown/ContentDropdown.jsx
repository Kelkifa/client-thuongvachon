import "./contentDropdown.scss";

import {AiOutlineDown} from "react-icons/ai";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

ContentDropdown.propTypes = {
	showContent: PropTypes.string,
	className: PropTypes.string,
};

ContentDropdown.defaultProps = {
	showContent: "",
	className: "",
};

function ContentDropdown({className, children, showContent}) {
	// useState
	const [isShow, setIsShow] = useState(false);

	return (
		<div className={`content-dropdown ${className}`}>
			<div
				className="content-dropdown__show"
				onClick={() => {
					setIsShow(!isShow);
				}}
			>
				<span>{showContent}</span>{" "}
				{!isShow && <AiOutlineDown className="content-dropdown__show__icon" />}
			</div>
			{isShow && <div className="content-dropdown__toggle">{children}</div>}
		</div>
	);
}

export default ContentDropdown;
