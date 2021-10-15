import "./todoCalendarHeader.scss";

import {
	FiChevronLeft,
	FiChevronRight,
	FiChevronsLeft,
	FiChevronsRight,
} from "react-icons/fi";

import PropTypes from "prop-types";
import React from "react";
import {roundedDown} from "./coreCalendar";

TodoCalendarHeader.propTypes = {
	className: PropTypes.string,

	viewType: PropTypes.number, //0,1,2
	setViewType: PropTypes.func,

	showDate: PropTypes.object,
	setShowDate: PropTypes.func,

	currYearSelect: PropTypes.number,
	setCurrYearSelect: PropTypes.func,
};

TodoCalendarHeader.defaultProps = {
	className: "",

	viewType: 0,
	setViewType: () => {},

	showDate: new Date(),
	setShowDate: () => {},

	currYearSelect: new Date().getFullYear(),
	setCurrYearSelect: () => {},
};
function TodoCalendarHeader(props) {
	const {
		className,

		viewType,
		setViewType,

		showDate,
		setShowDate,

		currYearSelect,
		setCurrYearSelect,
	} = props;

	const year = showDate.getFullYear();
	const month = showDate.getMonth();
	const date = showDate.getDate();

	const handleShowDateClick = () => {
		if (viewType >= 2) {
			setViewType(0);
			setCurrYearSelect(year);
			return;
		}
		setViewType(viewType + 1);
	};

	// HANDLE FUNCTIONS
	const handleArrowsLeftRight = (type = "right") => {
		const step = [1, 10, 100];
		// Nếu viewType === 0 thì thay đổi cả currYearSelect và showDate states
		if (viewType === 0) {
			const newDate = new Date(
				type === "left" ? year - step[viewType] : year + step[viewType],
				month,
				date
			);
			setShowDate(newDate);
			setCurrYearSelect(newDate.getFullYear());
			return;
		}
		// Chỉ thay đổi mỗi currYearSelect
		setCurrYearSelect(
			type === "left"
				? currYearSelect - step[viewType]
				: currYearSelect + step[viewType]
		);
	};

	const handleArrowLeftRight = (direct = "right") => {
		// if (!["arrow", "arrows"].includes(type)) return;

		const step = [1, 1, 10];
		// Nếu viewType === 0 thì thay đổi cả currYearSelect và showDate states
		if (viewType === 0) {
			const newDate = new Date(
				year,
				direct === "left" ? month - 1 : month + 1,
				date
			);
			setShowDate(newDate);
			if (newDate.getFullYear() !== currYearSelect)
				setCurrYearSelect(newDate.getFullYear());
			return;
		}
		// Chỉ thay đổi mỗi currYearSelect
		setCurrYearSelect(
			direct === "left"
				? currYearSelect - step[viewType]
				: currYearSelect + step[viewType]
		);
	};
	// Header content
	let showDateEle = null;
	if (viewType === 1) showDateEle = currYearSelect;
	else if (viewType === 2) {
		const roundedDownYear = roundedDown(currYearSelect);
		showDateEle = `${roundedDownYear + 1}-${roundedDownYear + 10}`;
	} else
		showDateEle = `Tháng ${showDate.getMonth() + 1} ${showDate.getFullYear()}`;
	return (
		<div className={`todo-calendar__header ${className}`}>
			<div
				className="todo-calendar__header__btn"
				onClick={() => handleArrowsLeftRight("left")}
			>
				<FiChevronsLeft />
			</div>
			<div
				className="todo-calendar__header__btn"
				onClick={() => handleArrowLeftRight("left")}
			>
				<FiChevronLeft />
			</div>
			<div
				onClick={handleShowDateClick}
				className="todo-calendar__header__date"
			>
				{showDateEle}
			</div>
			<div
				className="todo-calendar__header__btn"
				onClick={() => handleArrowLeftRight("right")}
			>
				<FiChevronRight />
			</div>
			<div
				className="todo-calendar__header__btn"
				onClick={() => handleArrowsLeftRight("right")}
			>
				<FiChevronsRight />
			</div>
		</div>
	);
}

export default TodoCalendarHeader;
