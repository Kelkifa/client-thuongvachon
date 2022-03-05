import "../pages/DocListPage.scss";

import DocBtn from "./DocBtn";
import PropTypes from "prop-types";
import React from "react";
import {docDeleteContent} from "../docSlice";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {useState} from "react";

DocTitleList.propTypes = {
	docId: PropTypes.string,
	name: PropTypes.string,
	contents: PropTypes.array,
};

DocTitleList.defaultProps = {
	docId: "",
	name: "",
	contents: [], // {_id, title, content}
};

function DocTitleList({docId, name, contents}) {
	const dispatch = useDispatch();

	const history = useHistory();

	// const groupType = useSelector(state => state.groups.selectedGroup.type);

	const [isFixMode, setIsFixMode] = useState(false);

	const handleDelete = async contentId => {
		if (!contentId) return {success: false, message: "Không tìm thấy nội dung"};

		try {
			const response = await dispatch(docDeleteContent({docId, contentId}));
			if (!response.payload.success)
				return {success: false, message: response.payload.message};

			return {success: true, message: "success"};
		} catch (err) {
			console.log(`[doc delete content err]`, err);
			return {success: false, message: err};
		}
	};
	if (!docId) return null;
	return (
		<div className="doc-list-page doc-title-page">
			<div className="doc-list-page__title">
				<h2 className="doc-title-page__title">{name}</h2>

				<div
					className="doc-list-page__title__handle"
					onClick={() => {
						setIsFixMode(!isFixMode);
					}}
				>
					{isFixMode ? "Chọn" : "Sửa"}
				</div>
			</div>

			<div className="doc-title-page__list">
				<DocBtn
					type="add"
					goToUrl={`${window.location.pathname}/create`}
					borderRadius="0.5em"
				/>
				{contents.map(content => (
					<DocBtn
						key={content._id}
						borderRadius="0.5em"
						text={content.title}
						fixMode={isFixMode}
						goToUrl={`${window.location.pathname}?c=${content._id}`}
						onFixLeftClick={() => {
							history.push(
								`${window.location.pathname}/content/${content._id}/update`
							);
						}}
						onFixRightClick={() => {
							return handleDelete(content._id);
						}}
					/>
				))}
			</div>
		</div>
	);
}

export default DocTitleList;
