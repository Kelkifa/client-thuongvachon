import "./DocTitlePage.scss";

import {
	Route,
	Switch,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import DocDetailPage from "./DocDetailPage";
import {DocListPageLoad} from "./DocListPage";
import DocUpdateContent from "./DocUpdateContent";
import DocUpdatePage from "./DocUpdatePage";
import NotFound from "components/NotFound";
import React from "react";
import {docGetDetail} from "../docSlice";
import {useEffect} from "react";

function useQuery() {
	const {search} = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function DocDetailMain(props) {
	const match = useRouteMatch();

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
	if (!doc.contents) return <DocListPageLoad title="Đang tải nội dung ..." />;
	return (
		<Switch>
			<Route exact path={`${match.url}/content/:id/update`}>
				<DocUpdateContent
					docId={doc._id}
					docName={doc.name}
					contents={doc.contents}
				/>
			</Route>
			<Route exact path={`${match.url}/update`}>
				<DocUpdatePage docId={doc._id} docName={doc.name} />
			</Route>
			<Route exact path={`${match.url}`}>
				<DocDetailPage
					contentId={contentQuery}
					docDetail={doc}
					docId={doc._id}
				/>
			</Route>
			<Route content={NotFound} />
		</Switch>
	);
}

export default DocDetailMain;
