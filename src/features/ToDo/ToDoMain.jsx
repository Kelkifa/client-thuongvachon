import {Route, Switch, useRouteMatch} from "react-router";

import NotFound from "components/NotFound";
import React from "react";
import ToDo from "./pages/ToDo";

function ToDoMain(props) {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${match.url}`} component={ToDo} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default ToDoMain;
