import {Route, Switch, useRouteMatch} from "react-router";

import DocPage from "./pages/DocPage";
import NotFound from "components/NotFound";
import React from "react";

DocMain.propTypes = {};

function DocMain(props) {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route path={`${match.url}`} component={DocPage} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default DocMain;
