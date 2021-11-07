import "./DocTitleBtn.scss";

import {ImPlus} from "react-icons/im";
import PropTypes from "prop-types";
import React from "react";
import {useHistory} from "react-router";

DocTitleBtn.propTypes = {
	type: PropTypes.string, // $in: ['normal', 'add];
	gotoUrl: PropTypes.string,
	className: PropTypes.string,
	text: PropTypes.string,
};

DocTitleBtn.defaultProps = {
	type: "normal",
	gotoUrl: "",
	className: "",
	text: "",
};

function DocTitleBtn({type, gotoUrl, className, text}) {
	const history = useHistory();

	const handleClick = () => {
		if (!gotoUrl) return;

		history.push(gotoUrl);
	};

	if (type === "add")
		return (
			<div className={`doc-title-btn ${className}`} onClick={handleClick}>
				<ImPlus />
			</div>
		);
	return (
		<div className={`doc-title-btn ${className}`} onClick={handleClick}>
			{text}
		</div>
	);
}

export default DocTitleBtn;
