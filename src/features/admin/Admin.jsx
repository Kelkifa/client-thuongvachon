import {Redirect, Route, Switch, useRouteMatch} from "react-router";

import AdminGameList from "features/game/pages/AdminGameList";
import AdminGameTrash from "features/game/pages/AdminGameTrash";
import Databoard from "./pages/Databoard";
import GameCreate from "features/game/pages/GameCreate";
import NotFound from "components/NotFound";
import React from "react";
import {gameAdminGet} from "features/game/gameSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

function Admin(props) {
	const dispatch = useDispatch();
	const match = useRouteMatch();

	useEffect(() => {
		const fetchApiAdmin = async () => {
			try {
				const response = await dispatch(gameAdminGet());
				console.log(response);
			} catch (err) {
				console.log(err);
			}
		};

		fetchApiAdmin();
	}, []);
	return (
		<Switch>
			<Route path={`${match.url}/games/create`} component={GameCreate} />
			<Route path={`${match.url}/games/trash`} component={AdminGameTrash} />
			<Route path={`${match.url}/games/list`} component={AdminGameList} />
			<Route path={`${match.url}/databoard`} component={Databoard}></Route>
			<Route path={match.url}>
				<Redirect to="/admin/databoard" />
			</Route>
			<Route component={NotFound} />
		</Switch>
	);
}

export default Admin;
