import DocForm from "./DocForm";
import PropTypes from "prop-types";
import React from "react";

DocContent.propTypes = {};

function DocContent(props) {
	return (
		<div className="doc-content">
			<DocForm />
		</div>
	);
}

export default DocContent;
