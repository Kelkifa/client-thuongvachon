import "./DocTitlePage.scss";

import {useDispatch, useSelector} from "react-redux";

import BackButton from "components/MyButton/BackButton";
import DocContentDetail from "../components/DocContentDetail";
import DocTitleList from "../components/DocTitleList";
import React from "react";
import {docGetDetail} from "../docSlice";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useParams} from "react-router-dom";

function useQuery() {
	const {search} = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function DocTitlePage(props) {
	const dispatch = useDispatch();
	const query = useQuery();
	const contentQuery = query.get("c");

	const groupId = useSelector(state => state.groups.selectedGroup._id);

	const params = useParams();
	const docId = params.id;

	const doc = useSelector(state => {
		const foundDoc = state.docs.data.find(value => value._id === docId);
		return foundDoc ? foundDoc : {};
	});
	const {docLoading, docError} = useSelector(state => ({
		docLoading: state.docs.loading,
		docError: state.docs.error,
	}));

	useEffect(() => {
		if (doc.contents) return;
		if (!docId || !groupId || docLoading || docError) return;

		const fetchDocDetail = async () => {
			await dispatch(docGetDetail({docId, groupId}));
		};
		fetchDocDetail();
	}, [dispatch, doc.contents, docId, groupId, docLoading, docError]);

	if (!groupId) return;
	if (!doc.contents) return "loading...";
	return (
		<div className="doc-title-page">
			<BackButton />
			{!contentQuery ? (
				<DocTitleList name={doc.name} contents={doc.contents} />
			) : (
				<DocContentDetail
					docName={doc.name}
					content={doc.contents.find(content => content._id === contentQuery)}
				/>
			)}
		</div>
	);
}

export default DocTitlePage;
