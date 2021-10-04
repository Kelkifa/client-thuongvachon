import DocHeader from "../components/DocHeader";
import DocRightBar from "../components/DocRightBar";
import PropTypes from "prop-types";
import React from "react";
import styleDocPage from "./styleDocPage";

DocPage.propTypes = {};

function DocPage(props) {
	return (
		<div className="grid wide" style={styleDocPage.container}>
			<DocHeader />
		</div>
	);
}

export default DocPage;
