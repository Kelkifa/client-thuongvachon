import "./toDo.scss";

import React from "react";
import ToDoCalendar from "../components/ToDoCalendar";
import ToDoForm from "../components/ToDoForm";
import TodoList from "../components/TodoList";
import {useSelector} from "react-redux";
import {useState} from "react";

ToDo.propTypes = {};

function ToDo(props) {
	/** useState
	 *  Schema: {
	 *		name: {type: String, desc: name of field form}
	 *  	handle: {type: Func, desc: func to change field form}
	 *      handleColor: {type: Func(value, error, setFieldValue), desc: func to change event color}
	 *  }
	 */
	const [handleChangeValue, setHandleChangeValue] = useState({});

	const [selectedOne, setSelectedOne] = useState();
	const [selectedTwo, setSelectedTwo] = useState();

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

	// on Date in Calendar Click
	const handleDateClick = date => {
		if (!handleChangeValue.name || !handleChangeValue.handle) return;

		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		const dateStr = `${day}/${month}/${year}`;

		handleChangeValue.handle(handleChangeValue.name, dateStr);
		if (handleChangeValue.name === "from") {
			if (typeof handleChangeValue.handleColor === "function") {
				handleChangeValue.handleColor(
					dateStr,
					undefined,
					handleChangeValue.handle
				);
			}
			setHandleChangeValue({name: "to", handle: handleChangeValue.handle});
		}
	};

	const calendarId = "todo-calendar";

	return (
		<div className="grid wide todo">
			<div className="row rg-30">
				<div className="c-6 m-12">
					<div className="row rg-30">
						<div className="c-12">
							<ToDoCalendar
								className="todo__calendar"
								id={calendarId}
								noteList={noteList}
								selectedDate={handleChangeValue}
								selectedOne={handleChangeValue.name ? selectedOne : undefined}
								selectedTwo={handleChangeValue.name ? selectedTwo : undefined}
								selectOneClick={
									handleChangeValue.name === "from"
										? value => {
												handleDateClick(value);
												setSelectedOne(value);
										  }
										: undefined
								}
								selectTwoClick={
									handleChangeValue.name === "to"
										? value => {
												handleDateClick(value);
												setSelectedTwo(value);
										  }
										: undefined
								}
							></ToDoCalendar>
						</div>

						<div className="c-12">
							<ToDoForm
								noteList={noteList}
								calendarId={calendarId}
								className="todo__form"
								// to select date on calendar
								handleChangeValue={handleChangeValue}
								setHandleChangeValue={value => {
									setHandleChangeValue(value);
									if (value.name === undefined) {
										setSelectedOne(undefined);
										setSelectedTwo(undefined);
									}
								}}
							/>
						</div>
					</div>
				</div>
				<div className="c-6 m-12 todo__list custom-scroll">
					<TodoList
						className="todo__list__component custom-scroll"
						isLoading={todoInfo.loading}
						noteList={noteList}
					/>
				</div>
			</div>
		</div>
	);
}

export default ToDo;
