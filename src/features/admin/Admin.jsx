import {Redirect, Route, Switch, useRouteMatch} from "react-router";

import Databoard from "./pages/Databoard";
import NotFound from "components/NotFound";
import React from "react";

function Admin(props) {
	const match = useRouteMatch();
	console.log(match.url);
	return (
		<Switch>
			<Route path={`${match.url}/databoard`} component={Databoard}></Route>
			<Route path={match.url}>
				<Redirect to="/admin/databoard" />
			</Route>
			<Route component={NotFound} />
		</Switch>
	);
}

export default Admin;
