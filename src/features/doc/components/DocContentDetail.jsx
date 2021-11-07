import "../pages/DocListPage.scss";

import {Link} from "react-router-dom";
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
		<div className="doc-list-page doc-content-detail">
			<div className="doc-list-page__title">
				<h2 className="doc-list-page-title__text doc-title-page__title">
					{docName}
				</h2>
				<Link
					className="doc-list-page__title__handle"
					to={`${window.location.pathname}/content/${content._id}/update`}
				>
					Sửa
				</Link>
			</div>
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
