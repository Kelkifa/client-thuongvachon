import PropTypes from "prop-types";
import React from "react";
import {roundedDown} from "./coreCalendar";

ToDoCalendarSelect.propTypes = {
	currYearSelect: PropTypes.number,
	setCurrYearSelect: PropTypes.func,

	showDate: PropTypes.object,
	setShowDate: PropTypes.func,

	viewType: PropTypes.number,
	setViewType: PropTypes.func,
};

ToDoCalendarSelect.defaultProps = {
	currYearSelect: new Date().getFullYear(),
	setCurrYearSelect: () => {},

	showDate: new Date(),
	setShowDate: () => {},

	viewType: 1,
	setViewType: () => {},
};

function ToDoCalendarSelect(props) {
	// PROPS
	const {
		currYearSelect,
		setCurrYearSelect,
		showDate,
		setShowDate,
		viewType,
		setViewType,
	} = props;

	const handleYearClick = year => {
		if (year === undefined) return;
		setShowDate(new Date(year, showDate.getMonth(), showDate.getDate()));
		setCurrYearSelect(year);
		setViewType(1);
	};

	// ViewType===2
	if (viewType === 2) {
		const yearList = [];
		const roundedDownYear = roundedDown(currYearSelect);

		for (let i = 1; i < 11; i++) {
			yearList.push(
				<li
					key={i}
					onClick={() => {
						handleYearClick(roundedDownYear + i);
					}}
				>
					{roundedDownYear + i}
				</li>
			);
		}
		return <ul className="todo-calendar__select-month">{yearList}</ul>;
	}
	const handleMonthClick = month => {
		setShowDate(new Date(currYearSelect, month, showDate.getDate()));
		setViewType(0);
	};

	// ViewType === 1
	const monthList = [];
	for (let i = 0; i < 12; i++) {
		monthList.push(
			<li
				key={i}
				onClick={() => {
					handleMonthClick(i);
				}}
			>
				Tháng {i + 1}
			</li>
		);
	}
	return <ul className="todo-calendar__select-month">{monthList}</ul>;
}

export default ToDoCalendarSelect;
