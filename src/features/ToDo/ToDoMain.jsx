import {Route, Switch, useRouteMatch} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import GifLoading from "components/Notifice/LoadComponents/GifLoading";
import NotFound from "components/NotFound";
import React from "react";
import ToDo from "./pages/ToDo";
import {todoGet} from "./todoSlice";
import {useEffect} from "react";

function ToDoMain(props) {
	const match = useRouteMatch();

	const dispatch = useDispatch();

	const {loading, error, selectedGroup} = useSelector(state => {
		const {loading, error, selectedGroup} = state.groups;
		return {loading, error, selectedGroup};
	});

	useEffect(() => {
		if (!selectedGroup._id) return;
		if (loading || error) return;
		const fetchTodo = async () => {
			try {
				await dispatch(todoGet({groupId: selectedGroup._id}));
			} catch (err) {
				console.log(`[todo get err]`, err);
			}
		};

		fetchTodo();
	}, [dispatch, loading, error, selectedGroup._id]);

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
