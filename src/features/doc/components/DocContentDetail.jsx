import PropTypes from "prop-types";
import React from "react";
import TextEditor from "components/TextEditor/TextEditor";

DocContentDetail.propTypes = {
	docName: PropTypes.string,
	content: PropTypes.object, //{title, content}
};

DocContentDetail.defaultProps = {
	docName: "",
	content: null,
};

function DocContentDetail({docName, content}) {
	if (!content) return <div>Không thấy nội dung</div>;
	return (
		<div className="doc-content-detail">
			<h2 className="doc-title-page__title">{docName}</h2>
			<h3>{content.title} </h3>
			<TextEditor
				disabled={true}
				hideToolbar={true}
				setContents={content.content}
			/>
		</div>
	);
}

export default DocContentDetail;
