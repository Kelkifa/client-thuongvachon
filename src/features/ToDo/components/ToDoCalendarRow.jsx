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
					// console.log(arr);
					const startCol =
						value.from - dateList[0] > 0
							? (value.from - dateList[0]) / (1000 * 3600 * 24) + 1
							: 1;
					const endCol = 8;
					console.log(`[start]`, {startCol, endCol});
					return (
						<div
							key={value.to.getDate() + value.from.getDate()}
							className="todo-calendar-row__note__row"
						>
							<div
								// className="note__row--c5"
								style={{
									backgroundColor: "rgba(255, 0, 0, 0.4404)",
									gridColumn: `${startCol} / ${endCol}`,
								}}
							>
								{value.content}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ToDoCalendarRow;
