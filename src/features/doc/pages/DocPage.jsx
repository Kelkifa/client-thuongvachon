import "./docPage.scss";

import DocContent from "../components/DocContent";
import DocHeader from "../components/DocHeader";
import React from "react";

function DocPage(props) {
	return (
		<div className="doc-page grid wide">
			<DocHeader />
			<div className="doc-page__content">
				<DocContent />
			</div>
		</div>
	);
}

export default DocPage;
