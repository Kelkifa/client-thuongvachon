import "./todoListNote.scss";

import {useDispatch, useSelector} from "react-redux";

import {AiTwotoneDelete} from "react-icons/ai";
import {MdSystemUpdateAlt} from "react-icons/md";
import PropTypes from "prop-types";
import React from "react";
import {todoDelete} from "features/ToDo/todoSlice";
import {useState} from "react";

TodoListNote.propTypes = {
	note: PropTypes.object,
};

TodoListNote.defaultProps = {
	note: null,
};

function TodoListNote(props) {
	const dispatch = useDispatch();
	// PROPS
	const {note} = props;

	// STATES
	const [isActive, setActive] = useState(false);

	const groupId = useSelector(state => state.groups.selectedGroup._id);

	// RENDER
	if (!note) return null;

	// HANDLE FUNCTIONS
	const handleUpdate = async () => {
		// scrollIntoView()
		// document.getElementById("abc").scrollIntoView();
	};
	const handleDelete = async () => {
		if (!note) return;
		if (!note._id) return;

		const data = note._id;
		console.log(`[data]`, data);
		try {
			const response = await dispatch(todoDelete({data, groupId}));
			console.log(`[response]`, response);
		} catch (err) {
			console.log(err);
		}
	};

	// RENDER PROCESS
	const [startDate, startMonth] = [
		note.from.getDate() < 10 ? `0${note.from.getDate()}` : note.from.getDate(),
		note.from.getMonth() + 1 < 10
			? `0${note.from.getMonth() + 1}`
			: note.from.getMonth() + 1,
	];
	const [endDate, endMonth] = [
		note.to.getDate() < 10 ? `0${note.to.getDate()}` : note.to.getDate(),
		note.to.getMonth() + 1 < 10
			? `0${note.to.getMonth() + 1}`
			: note.to.getMonth() + 1,
	];

	const startTimeString = `[${note.startTime.join(
		":"
	)}] [${startDate}/${startMonth}/${note.from.getFullYear()}]`;

	const endTimeString = `[${note.endTime.join(
		":"
	)}] [${endDate}/${endMonth}/${note.to.getFullYear()}]`;

	return (
		<li className="todo-list-note">
			<div
				className={`todo-list-note__text${
					isActive ? " todo-list-note__text--active" : ""
				}`}
				style={{
					backgroundColor: note.color,
					filter: isActive ? "brightness(130%)" : "brightness(100%)",
				}}
				onClick={() => {
					setActive(!isActive);
				}}
			>
				<div className="todo-list-note__text__time">
					{startTimeString} <br /> {endTimeString}
				</div>
				<div className="todo-list-note__text__content">
					<div className="todo-list-note__content__text">{note.content}</div>
				</div>
			</div>
			<div
				className="todo-list-note__btn"
				style={{
					backgroundColor: note.color,
					filter: isActive ? "brightness(130%)" : "brightness(100%)",
				}}
			>
				<div
					className={`todo-list-note__btn__container${
						isActive ? " todo-list-note__btn__container--show" : ""
					}`}
				>
					<MdSystemUpdateAlt
						className="todo-list-note__btn__container__item"
						onClick={handleUpdate}
					/>

					<AiTwotoneDelete
						className="todo-list-note__btn__container__item"
						onClick={handleDelete}
					/>
				</div>
			</div>
		</li>
	);
}

export default TodoListNote;
