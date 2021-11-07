import BackButton from "components/MyButton/BackButton";
import DocContentDetail from "../components/DocContentDetail";
import DocTitleList from "../components/DocTitleList";
import PropTypes from "prop-types";
import React from "react";

DocDetailPage.propTypes = {
	docId: PropTypes.string,
	contentId: PropTypes.string,
	docDetail: PropTypes.object, //{_id,name, contents}
};

DocDetailPage.defaultProps = {
	docId: "",
	contentId: null,
	docDetail: {},
};

function DocDetailPage({contentId, docDetail, docId}) {
	if (!docId) return null;

	return (
		<div className="doc-title-page">
			<BackButton />
			{!contentId ? (
				<DocTitleList
					name={docDetail.name}
					contents={docDetail.contents}
					docId={docId}
				/>
			) : (
				<DocContentDetail
					docName={docDetail.name}
					content={docDetail.contents.find(
						content => content._id === contentId
					)}
				/>
			)}
		</div>
	);
}

export default DocDetailPage;
