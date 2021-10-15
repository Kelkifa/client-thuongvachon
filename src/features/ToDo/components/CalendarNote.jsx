import "./calendarNote.scss";

import PropTypes from "prop-types";
import React from "react";
import {TodoCalendarContext} from "./ToDoCalendar";
import {useContext} from "react";

// import {useState} from "react";

CalendarNote.propTypes = {
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	note: PropTypes.object,

	isActive: PropTypes.bool,
	isOver: PropTypes.bool,
};

CalendarNote.defaultProps = {
	startDate: null,
	endDate: null,
	note: null,

	isActive: false,
};

function CalendarNote(props) {
	// Context
	const {currDate, activedNote, setActivedNote} =
		useContext(TodoCalendarContext);
	// PROPS
	const {startDate, endDate, note, isActive} = props;

	// RENDER
	if (!startDate || !endDate || !note) return null;

	const startCol =
		note.from - startDate > 0
			? (note.from - startDate) / (1000 * 3600 * 24) + 1
			: 1;
	const endCol =
		endDate - note.to > 0 ? 8 - (endDate - note.to) / (1000 * 3600 * 24) : 8;

	const BORDER_RADIUS_SIZE = "6px";

	const leftBorderRadius = note.from < startDate ? "0" : BORDER_RADIUS_SIZE;
	const rightBorderRadius = note.to <= endDate ? BORDER_RADIUS_SIZE : "0";
	const borderRadius = `${leftBorderRadius} ${rightBorderRadius} ${rightBorderRadius} ${leftBorderRadius}`;

	const handleClick = () => {
		if (activedNote === note._id) {
			setActivedNote(null);
			return;
		}
		setActivedNote(note._id);
	};
	return (
		<div
			key={note.to.getDate() + note.from.getDate()}
			className={`calendar-note ${isActive ? "calendar-note--active" : ""}`}
			style={{
				borderRadius: borderRadius,
				backgroundColor: note.color,
				gridColumn: `${startCol} / ${endCol}`,
				filter:
					activedNote === note._id ? "brightness(135%)" : "brightness(100%)",
			}}
			onClick={handleClick}
		>
			{(note.from >= startDate ||
				(startDate <
					new Date(
						currDate.getFullYear(),
						currDate.getMonth(),
						currDate.getDate()
					) &&
					note.from < startDate)) &&
				`[${note.startTime.join(":")}] ${note.content}`}
			{/* {val.content} */}
		</div>
	);
}

export default CalendarNote;
