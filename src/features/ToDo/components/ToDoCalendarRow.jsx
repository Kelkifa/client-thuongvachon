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
	// PROPS
	const {className, dateList, notes} = props;

	// RENDER
	if (dateList.length !== 7) return;
	const notesInRow = notes.filter(
		note => note.from <= dateList[6] && note.to >= dateList[0]
	);
	console.log("///////////////////////////");
	console.log(`[notes]`, notes);
	notesInRow.sort((a, b) => a.layer - b.layer);
	console.log("[notesInRow]", notesInRow);
	// console.log("[notesInRow]", notesInRow);

	const maxLayer = notesInRow[notesInRow.length - 1].layer;
	const noteElement = [];

	// console.log(`[maxlayer]`, maxLayer);
	for (let i = 0; i <= maxLayer; i++) {
		const currLayer = notesInRow.filter(value => value.layer === i);
		noteElement.push(currLayer);
	}
	console.log(`[maxLayer]`, maxLayer);
	console.log(`[noteElement]`, noteElement);

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
				{noteElement.map((value, index) => (
					<div key={index} className="todo-calendar-row__note__row">
						{value.map(val => {
							const startCol =
								val.from - dateList[0] > 0
									? (val.from - dateList[0]) / (1000 * 3600 * 24) + 1
									: 1;
							const endCol =
								dateList[6] - val.to > 0
									? 8 - (dateList[6] - val.to) / (1000 * 3600 * 24)
									: 8;
							// console.log({startCol, endCol});

							return (
								<div
									// className="note__row--c5"
									key={val.to.getDate() + val.from.getDate()}
									style={{
										backgroundColor: "rgba(255, 0, 0, 0.4404)",
										gridColumn: `${startCol} / ${endCol}`,
									}}
								>
									{val.content}
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

export default ToDoCalendarRow;
