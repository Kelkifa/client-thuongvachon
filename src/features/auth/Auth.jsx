import "./auth.scss";

import {Route, Switch, useRouteMatch} from "react-router";

import Login from "./pages/Login/Login";
import NotFound from "components/NotFound";
import React from "react";
import Register from "./pages/Register/Register";

function Auth(props) {
	const match = useRouteMatch();
	return (
		<div className="grid wide auth">
			<Switch>
				<Route path={`${match.url}/login`} component={Login} />
				<Route path={`${match.url}/register`} component={Register} />
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default Auth;
