import "./todoCalendarRow.scss";

import PropTypes from "prop-types";
import React from "react";
import ToDoCalendarNode from "./ToDoCalendarNode";

ToDoCalendarRow.propTypes = {
	dateList: PropTypes.array,
	notes: PropTypes.array,
};

ToDoCalendarRow.defaultProps = {
	dateList: [],
	notes: [],
};
const notesToElement = notes => {
	if (!notes.length) return [];

	const noteEleArr = notes.map(value => {});
	return notes;
};
function ToDoCalendarRow(props) {
	// Props
	const {className, dateList, notes} = props;

	// Render
	if (dateList.length !== 7) return;

	const notesInRow = notes.filter(
		note => note.from < dateList[6] && note.to > dateList[0]
	);

	return (
		<div className="todo-calendar-row">
			<ul className="todo-calendar-row__date">
				{dateList.map(value => (
					<li
						key={value.getDate()}
						className={
							dateList[6].getMonth() !== value.getMonth()
								? "todo-calendar-row__date__blur"
								: ""
						}
					>
						{value.getDate()}
					</li>
				))}
			</ul>
			<div className="todo-calendar-row__note">
				{notesInRow.map(value => {
					return (
						<div className="todo-calendar-row__note__row">
							<div className="note__row--c5">Đồ con ghẹ !</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ToDoCalendarRow;
