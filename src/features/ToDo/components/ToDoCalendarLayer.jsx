import "./todoCalendarLayer.scss";

import CalendarNote from "./CalendarNote";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

ToDoCalendarLayer.propTypes = {
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	noteList: PropTypes.array,
};

ToDoCalendarLayer.defaultProps = {
	startDate: null,
	endDate: null,
	noteList: [],
};

function ToDoCalendarLayer(props) {
	// PROPS
	const {startDate, endDate, noteList} = props;
	// STATES
	const [isActive, setIsActive] = useState(false);

	if (!startDate || !endDate || !noteList.length) return null;

	// const handleClick = () => {
	// 	setIsActive(!isActive);
	// 	console.log(1);
	// };
	return (
		<div
			className={`calendar-layer ${isActive ? "calendar-layer--active" : ""}`}
			onClick={() => {
				setIsActive(!isActive);
			}}
		>
			{noteList.map(note => (
				<CalendarNote
					key={note.to.getDate() + note.from.getDate()}
					startDate={startDate}
					endDate={endDate}
					note={note}
					isActive={isActive}
				/>
			))}
		</div>
	);
}

export default ToDoCalendarLayer;
