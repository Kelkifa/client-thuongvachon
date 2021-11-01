import {Route, Switch, useRouteMatch} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import GroupCreatePage from "./pages/GroupCreatePage";
import GroupPage from "./pages/GroupPage";
import NotFound from "components/NotFound";
import React from "react";
import {groupGet} from "./groupSlice";
import {useEffect} from "react";

function GroupMain(props) {
	const match = useRouteMatch();

	const dispatch = useDispatch();
	const groupInfo = useSelector(state => state.groups.groups);
	const {loading, error, data} = groupInfo;

	useEffect(() => {
		if (!loading && !error) return;
		const fetchGroups = async () => {
			try {
				await dispatch(groupGet());
			} catch (err) {}
		};

		fetchGroups();
	}, [dispatch, loading, error]);

	if (error) return <div>{error}</div>;
	if (loading) return <div>Loading...</div>;

	return (
		<div className="bg-page grid wide">
			<Switch>
				<Route path={`${match.url}/create`} component={GroupCreatePage} />
				<Route path={`${match.url}`}>
					<GroupPage groups={data} />
				</Route>
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default GroupMain;
