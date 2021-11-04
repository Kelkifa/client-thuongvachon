import "./DocListPage.scss";

import {useDispatch, useSelector} from "react-redux";

import BackButton from "components/MyButton/BackButton";
import DocBtn from "../components/DocBtn";
import React from "react";
import {docGetDocs} from "../docSlice";
import {useEffect} from "react";
import {useParams} from "react-router";

function DocListPage(props) {
	const dispatch = useDispatch();

	const docInfo = useSelector(state => state.docs);
	const {loading, error} = docInfo;

	// Params
	const params = useParams();
	const {groupId} = params;

	const groupType = useSelector(state => {
		try {
			const foundGroup = state.groups.groups.data.find(
				group => group._id === groupId
			);
			return foundGroup.type;
		} catch (err) {
			return null;
		}
	});

	useEffect(() => {
		const fetchDocs = async () => {
			await dispatch(docGetDocs({groupId}));
		};

		fetchDocs();
	}, [dispatch, groupId]);

	if (!groupId) return null;
	if (loading) return "loading...";
	if (error) return <div>{error}</div>;
	return (
		<div className="doc-list-page">
			<BackButton />
			<h3 className="doc-list-page__title">Danh sách các tài liệu</h3>
			<div className="doc-list-page__list">
				{groupType !== "demo" && <DocBtn type="add" goToUrl="doc/create" />}
				{docInfo.data.map(doc => (
					<DocBtn key={doc._id} doc={doc} goToUrl={`doc/${doc._id}`} />
				))}
			</div>
		</div>
	);
}

export default DocListPage;
