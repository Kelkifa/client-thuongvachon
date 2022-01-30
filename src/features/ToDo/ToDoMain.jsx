import {Route, Switch, useRouteMatch} from "react-router";

import GifLoading from "components/Notifice/LoadComponents/GifLoading";
import NotFound from "components/NotFound";
import React from "react";
import ToDo from "./pages/ToDo";
import {useSelector} from "react-redux";

function ToDoMain(props) {
	const match = useRouteMatch();

	const {loading, error} = useSelector(state => {
		const {loading, error} = state.groups;
		return {loading, error};
	});

	if (error) return "Tải nhóm thất bại";
	if (loading) return <GifLoading />;

	return (
		<Switch>
			<Route exact path={`${match.url}`}>
				<ToDo />
			</Route>
			<Route component={NotFound} />
		</Switch>
	);
}

export default ToDoMain;
