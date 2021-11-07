import "./DocListPage.scss";

import {useDispatch, useSelector} from "react-redux";

import DocBtn from "../components/DocBtn";
import PropTypes from "prop-types";
import React from "react";
import {docDeleteDoc} from "../docSlice";
import {useHistory} from "react-router";
import {useState} from "react";

DocListPage.propTypes = {
	docInfo: PropTypes.object,
	groupType: PropTypes.string,
};

DocListPage.defaultProps = {
	docInfo: {loading: true, error: null, data: []},
	groupType: "demo",
};

function DocListPage({docInfo, groupType}) {
	const history = useHistory();

	const dispatch = useDispatch();

	const groupId = useSelector(state => state.groups.selectedGroup._id);

	const [isFixMode, setIsFixMode] = useState(false);

	const handleDelete = async docId => {
		if (!docId) return {success: false, message: "Không tìm thấy tài liệu"};

		try {
			const response = await dispatch(docDeleteDoc({docId, groupId}));
			if (!response.payload.success)
				return {success: false, message: response.payload.message};

			return {success: true, message: "success"};
		} catch (err) {
			console.log(`[doc delete doc err]`, err);
			return {success: false, message: err};
		}
	};

	if (docInfo.error) return "doc Error";
	if (docInfo.loading) return <DocListPageLoad />;

	return (
		<div className="doc-list-page">
			<div className="doc-list-page__title">
				<h2 className="doc-list-page__title__text">Danh sách các tài liệu</h2>
				<div
					className="doc-list-page__title__handle"
					onClick={() => {
						setIsFixMode(!isFixMode);
					}}
				>
					{isFixMode ? "Chọn" : "Sửa"}
				</div>
			</div>

			<div className="doc-list-page__list">
				{groupType !== "demo" && <DocBtn type="add" goToUrl="docs/create" />}
				{docInfo.data.map((doc, index) => (
					<DocBtn
						key={doc._id}
						text={doc.name}
						goToUrl={`/docs/${doc._id}`}
						fixMode={isFixMode}
						// defaultFixMode={index === 0 ? true : false}
						onFixLeftClick={() => {
							history.push(`/docs/${doc._id}/update`);
						}}
						onFixRightClick={() => {
							return handleDelete(doc._id);
						}}
					/>
				))}
			</div>
		</div>
	);
}

function DocListPageLoad() {
	return (
		<div className="doc-list-page">
			<h3 className="doc-list-page__title__text">Danh sách các tài liệu</h3>

			<div className="doc-list-page__list">
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
				<DocBtn type="load"></DocBtn>
			</div>
		</div>
	);
}
export default DocListPage;
