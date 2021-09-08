import {Route, Switch, useRouteMatch} from "react-router";

import GameList from "./pages/GameList";
import NotFound from "components/NotFound";
import React from "react";

function Game(props) {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route path={`${match.url}`} component={GameList} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default Game;
