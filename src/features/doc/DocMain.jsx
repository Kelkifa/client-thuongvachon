import {Route, Switch, useRouteMatch} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import DocCreateContentPage from "./pages/DocCreateContentPage";
import DocCreatePage from "./pages/DocCreatePage";
import DocListPage from "./pages/DocListPage";
import DocTitlePage from "./pages/DocTitlePage";
import DocUpdatePage from "./pages/DocUpdatePage";
import NotFound from "components/NotFound";
import React from "react";
import {docGetDocs} from "./docSlice";
import {useEffect} from "react";

function DocMain(props) {
	const match = useRouteMatch();
	const dispatch = useDispatch();

	const groupInfo = useSelector(state => {
		const {loading, error, selectedGroup} = state.groups;
		return {loading, error, selectedGroup};
	});
	// console.log(`[selected group]`, groupInfo);

	const docInfo = useSelector(state => state.docs);

	useEffect(() => {
		if (groupInfo.loading || groupInfo.error) return;

		// Chưa có selectedGroup
		if (!groupInfo.selectedGroup._id) return;

		const fetchDocs = async () => {
			try {
				await dispatch(docGetDocs({groupId: groupInfo.selectedGroup._id}));
			} catch (err) {
				console.log(`[doc get docs err]`, err);
			}
		};
		fetchDocs();
	}, [
		dispatch,
		groupInfo.loading,
		groupInfo.error,
		groupInfo.selectedGroup._id,
	]);

	// Render

	if (groupInfo.error)
		return <div className="bg-page grid wide">{groupInfo.error}</div>;
	if (groupInfo.loading)
		return <div className="bg-page grid wide">Loading</div>;
	if (!groupInfo.selectedGroup._id)
		return <div className="bg-page grid wide">Chưa chọn group</div>;

	return (
		<div className="bg-page grid wide">
			<Switch>
				<Route exact path={`${match.url}/create`} component={DocCreatePage} />
				<Route
					exact
					path={`${match.url}/:id/update`}
					component={DocUpdatePage}
				/>
				<Route
					exact
					path={`${match.url}/:id/create`}
					component={DocCreateContentPage}
				/>
				<Route exact path={`${match.url}/:id`} component={DocTitlePage} />
				<Route exact path={match.url}>
					<DocListPage
						docInfo={docInfo}
						groupType={groupInfo.selectedGroup.type}
					/>
				</Route>
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default DocMain;
