import "./toDo.scss";

import {setSelectedNote, todoGet} from "../todoSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";

import React from "react";
import ToDoCalendar from "../components/ToDoCalendar";
import ToDoForm from "../components/ToDoForm";
import TodoList from "../components/TodoList/TodoList";

ToDo.propTypes = {};
const now = new Date();
function ToDo(props) {
	const calendarRef = useRef();

	/** useState
	 *  Schema: {
	 *		name: {type: String, desc: name of field form}
	 *  	handle: {type: Func, desc: func to change field form}
	 *      handleColor: {type: Func(value, error, setFieldValue), desc: func to change event color}
	 *  }
	 */
	const dispatch = useDispatch();

	const [handleChangeValue, setHandleChangeValue] = useState({});

	const [showYearAndMonth, setShowYearAndMonth] = useState({
		year: now.getFullYear(),
		month: now.getMonth(),
	});

	const [selectedOne, setSelectedOne] = useState();
	const [selectedTwo, setSelectedTwo] = useState();

	// const [selectedNote, setSelectedNote] = useState({});
	const selectedNote = useSelector(state => state.todos.user.selectedNote);

	const handleSetSelectedNote = note => {
		dispatch(setSelectedNote(note));
	};

	const groupId = useSelector(state => state.groups.selectedGroup._id);

	const todoInfo = useSelector(state => state.todos.user);

	const noteList = todoInfo.data.map(value => ({
		_id: value._id,
		content: value.title,
		from: new Date(value.from),
		to: new Date(value.to),
		color: value.color,
		todoList: value.todoList,
	}));

	// useEffect
	useEffect(() => {
		const fetchNoteList = async () => {
			await dispatch(todoGet({groupId, ...showYearAndMonth}));
		};

		fetchNoteList();
	}, [showYearAndMonth, dispatch, groupId]);

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
								ref={calendarRef}
								className="todo__calendar"
								id={calendarId}
								noteList={noteList}
								setShowYearAndMonth={setShowYearAndMonth}
								selectedNote={selectedNote}
								setSelectedNote={handleSetSelectedNote}
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
				<div className="c-6 m-12 todo__list">
					<TodoList
						ref={calendarRef}
						selectedNote={selectedNote}
						setSelectedNote={handleSetSelectedNote}
					/>
				</div>
			</div>
		</div>
	);
}

export default ToDo;
