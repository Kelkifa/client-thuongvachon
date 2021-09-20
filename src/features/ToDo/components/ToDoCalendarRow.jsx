import "./todoCalendarRow.scss";

import CalendarNote from "./CalendarNote";
import PropTypes from "prop-types";
import React from "react";
import ToDoCalendarLayer from "./ToDoCalendarLayer";
import {useState} from "react";

ToDoCalendarRow.propTypes = {
	dateList: PropTypes.array,
	notes: PropTypes.array,
};

ToDoCalendarRow.defaultProps = {
	dateList: [],
	notes: [],
};
function ToDoCalendarRow(props) {
	// PROPS
	const {className, dateList, notes} = props;
	// STATES
	const [isActive, setIsActive] = useState(false);

	// RENDER
	if (dateList.length !== 7) return;
	const notesInRow = notes.filter(
		note => note.from <= dateList[6] && note.to >= dateList[0]
	);
	notesInRow.sort((a, b) => a.layer - b.layer);

	const maxLayer = notesInRow[notesInRow.length - 1]
		? notesInRow[notesInRow.length - 1].layer
		: -1;
	const noteElement = [];

	// console.log(`[maxlayer]`, maxLayer);
	for (let i = 0; i <= maxLayer; i++) {
		const currLayer = notesInRow.filter(value => value.layer === i);
		noteElement.push(currLayer);
	}

	// const handleNoteOver = e => {
	// 	e.target.style.height = "100px";
	// 	console.log(e.target.style);
	// };

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
			<div
				className="todo-calendar-row__note"
				onClick={() => {
					setIsActive(!isActive);
				}}
			>
				{noteElement.map((value, index) => (
					<ToDoCalendarLayer
						key={index}
						startDate={dateList[0]}
						endDate={dateList[6]}
						noteList={value}
					/>
				))}
			</div>
		</div>
	);
}

export default ToDoCalendarRow;
