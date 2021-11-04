import "./DocBtn.scss";

import {ImPlus} from "react-icons/im";
import PropTypes from "prop-types";
import React from "react";
import {useHistory} from "react-router";

DocBtn.propTypes = {
	type: PropTypes.string, // $in :["add", "normal (default)"]
	doc: PropTypes.object,
	goToUrl: PropTypes.string,
};
DocBtn.defaultProps = {
	type: "normal",
	doc: {}, //  {_id, name}

	goToUrl: null,
};
function DocBtn({type, doc, goToUrl}) {
	const history = useHistory();
	// Handle Click
	const handleClick = () => {
		if (!goToUrl) return;
		history.push(goToUrl);
	};
	return (
		<div className="doc-btn" onClick={handleClick}>
			{type === "add" ? <ImPlus /> : doc.name}
		</div>
	);
}

export default DocBtn;
