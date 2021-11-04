import {Redirect, Route, Switch, useRouteMatch} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import DocCreatePage from "./pages/DocCreatePage";
import DocDetailPage from "./pages/DocDetailPage";
import DocGroupPage from "./pages/DocGroupPage";
import DocListPage from "./pages/DocListPage";
import NotFound from "components/NotFound";
import React from "react";
import {groupGet} from "features/group/groupSlice";
import {useEffect} from "react";

function DocMain(props) {
	const match = useRouteMatch();
	const dispatch = useDispatch();

	// Get groups
	const groupInfo = useSelector(state => state.groups.groups);
	const isGroupLoading = groupInfo.loading;
	const isGroupError = groupInfo.error;
	const groupData = groupInfo.data;

	useEffect(() => {
		if (!isGroupLoading && !isGroupError) return;
		const fetchGroups = async () => {
			try {
				await dispatch(groupGet());
			} catch (err) {}
		};

		fetchGroups();
	}, [dispatch, isGroupLoading, isGroupError]);

	// Render
	if (isGroupLoading)
		return <div className="bg-page grid wide">loading...</div>;
	if (isGroupError) return <div className="bg-page grid wide">Loi</div>;

	return (
		<div className="bg-page grid wide">
			<Switch>
				<Route
					exact
					path={`${match.url}/groups/:groupId/doc/create`}
					component={DocCreatePage}
				/>
				<Route
					exact
					path={`${match.url}/groups/:groupId/doc/:docId`}
					component={DocDetailPage}
				/>
				<Route
					exact
					path={`${match.url}/groups/:groupId/doc`}
					component={DocListPage}
				/>
				<Route exact path={`${match.url}/groups`}>
					<DocGroupPage groups={groupData} />
				</Route>
				<Route exact path={`${match.url}`}>
					<Redirect to={`${match.url}/groups`} />
				</Route>
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default DocMain;
