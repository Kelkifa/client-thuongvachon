import "./docMain.scss";

import {Route, Switch, useRouteMatch} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import DocGroupPage from "./pages/DocGroupPage";
import NotFound from "components/NotFound";
import React from "react";
import {docGetGroups} from "./docSlice";
import {useEffect} from "react";

// import {useEffect} from "react";

function DocMain(props) {
	const match = useRouteMatch();

	const dispatch = useDispatch();
	const groupInfo = useSelector(state => state.docs);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				await dispatch(docGetGroups());
			} catch (err) {}
		};

		fetchGroups();
	}, [dispatch]);
	return (
		<div className="doc-main grid wide">
			<Switch>
				<Route exact path={`${match.url}/group/:id`}>
					null
				</Route>
				<Route exact path={`${match.url}`}>
					<DocGroupPage
						loading={groupInfo.loading}
						error={groupInfo.error}
						groups={groupInfo.groups.map(value => ({
							name: value.name,
							_id: value._id,
							users: value.users,
							type: value.type,
						}))}
					/>
				</Route>
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default DocMain;
