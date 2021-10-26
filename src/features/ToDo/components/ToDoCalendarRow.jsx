import "./todoCalendarRow.scss";

import PropTypes from "prop-types";
import React from "react";
import ToDoCalendarLayer from "./ToDoCalendarLayer";
import {compareDate} from "./coreCalendar";
import {useState} from "react";

// import CalendarNote from "./CalendarNote";

ToDoCalendarRow.propTypes = {
	dateList: PropTypes.array,
	notes: PropTypes.array,
	currMonth: PropTypes.number,

	selectedOne: PropTypes.object,
	selectedTwo: PropTypes.object,

	onCellClick: PropTypes.func,
};

ToDoCalendarRow.defaultProps = {
	dateList: [],
	notes: [],
	currMonth: 0,

	selectedOne: undefined,
	selectedTwo: undefined,

	onCellClick: () => {},
};
function ToDoCalendarRow(props) {
	// PROPS
	const {dateList, notes, currMonth, selectedOne, selectedTwo, onCellClick} =
		props;

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

	const currDate = new Date();

	return (
		<div className="todo-calendar-row">
			<ul className="todo-calendar-row__date">
				{dateList.map(value => (
					<li
						style={
							compareDate(currDate, value)
								? {backgroundColor: "rgba(0, 0, 0, 0.387)"}
								: {}
						}
						key={value.getDate()}
						className={
							currMonth !== value.getMonth()
								? `todo-calendar-row__date__blur${
										compareDate(selectedOne, value)
											? " todo-calendar-row__date--active1"
											: ""
								  }${
										compareDate(selectedTwo, value)
											? " todo-calendar-row__date--active2"
											: ""
								  }`
								: `${
										compareDate(selectedOne, value)
											? "todo-calendar-row__date--active1"
											: ""
								  }${
										compareDate(selectedTwo, value)
											? " todo-calendar-row__date--active2"
											: ""
								  }`
						}
						onClick={() => {
							onCellClick(value);
						}}
					>
						<span>{value.getDate()}</span>
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
