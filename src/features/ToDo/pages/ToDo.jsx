import "./toDo.scss";

import React from "react";
import ToDoCalendar from "../components/ToDoCalendar";
import ToDoForm from "../components/ToDoForm";
import TodoList from "../components/TodoList";
import {useSelector} from "react-redux";

ToDo.propTypes = {};

function ToDo(props) {
	const todoInfo = useSelector(state => state.todos.user);

	const noteList = todoInfo.data.map(value => ({
		_id: value._id,
		content: value.content,
		from: new Date(value.from.year, value.from.month - 1, value.from.date),
		to: new Date(value.to.year, value.to.month - 1, value.to.date),
		startTime: value.startTime,
		endTime: value.endTime,
		color: value.color,
	}));
	return (
		<div className="grid wide todo">
			<div className="row rg-30">
				<div className="c-6 m-12">
					<ToDoCalendar
						className="todo__calendar"
						noteList={noteList}
					></ToDoCalendar>
				</div>
				<div className="c-6 m-12 todo__list">
					<TodoList className="todo__list__component" noteList={noteList} />
				</div>
				<div className="c-6 m-12">
					<ToDoForm noteList={noteList} className="todo__form" />
				</div>
			</div>
		</div>
	);
}

export default ToDo;
