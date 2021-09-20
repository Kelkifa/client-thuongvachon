import "./ToDoCalendar.scss";

import {getDateList, getLayerNote} from "features/ToDo/components/coreCalendar";

import PropTypes from "prop-types";
import React from "react";
import ToDoCalendarRow from "./ToDoCalendarRow";
import randomColor from "randomcolor";

ToDoCalendar.propTypes = {
	showDate: PropTypes.object,
};

ToDoCalendar.defaultProps = {
	showDate: new Date(),
};

const dating = [
	{
		content: "Đồ con ghẹ 1!",
		from: new Date(2021, 7, 30),
		to: new Date(2021, 8, 7),
	},
	{
		content: "Đồ con chồn 2!",
		from: new Date(2021, 8, 1),
		to: new Date(2021, 8, 27),
	},
	{
		content: "Đồ con ghẹ 3!",
		from: new Date(2021, 8, 5),
		to: new Date(2021, 8, 8),
	},
	{
		content: "Đồ con ghẹ 4!",
		from: new Date(2021, 8, 8),
		to: new Date(2021, 8, 10),
	},
	{
		content: "Đồ con chồn 5!",
		from: new Date(2021, 8, 9),
		to: new Date(2021, 8, 15),
	},
	{
		content: "Đồ con ghẹ 6!",
		from: new Date(2021, 8, 11),
		to: new Date(2021, 8, 11),
	},
];

function ToDoCalendar(props) {
	const {showDate} = props;
	const showDateList = getDateList(showDate);
	const notesInMonth = dating.filter(
		value =>
			value.from <= showDateList[showDateList.length - 1] &&
			value.to >= showDateList[0]
	);
	const noteWithLayer = getLayerNote(notesInMonth);
	console.log("[noteWithLayer]", noteWithLayer);

	const rdc = randomColor({
		luminosity: "dark",
		format: "rgba",
		alpha: 0.5, // e.g. 'rgba(9, 1, 107, 0.5)',
	});
	console.log(`[randomColor]`, rdc);

	const curMonth = showDateList[7] && showDateList[7].getMonth(); // To compare to blur showed days

	return (
		<div className="todo-calendar">
			<div className="todo-calendar__row">
				<div className="todo-calendar__row__title">
					Tháng {curMonth + 1} 2021
				</div>
			</div>
			<ul className="todo-calendar__row todo-calendar__row--day">
				<li>SUN</li>
				<li>MON</li>
				<li>TUE</li>
				<li>WED</li>
				<li>THU</li>
				<li>FRI</li>
				<li>SAT</li>
			</ul>
			<div className="todo-calendar__row">
				<div className="todo-calendar__row__date">
					<ToDoCalendarRow
						notes={noteWithLayer}
						dateList={showDateList.slice(0, 7)}
					></ToDoCalendarRow>
				</div>
			</div>
			<div className="todo-calendar__row">
				<div className="todo-calendar__row__date">
					<ToDoCalendarRow
						notes={noteWithLayer}
						dateList={showDateList.slice(7, 14)}
					></ToDoCalendarRow>
				</div>
			</div>
			<div className="todo-calendar__row">
				<div className="todo-calendar__row__date">
					<ToDoCalendarRow
						notes={noteWithLayer}
						dateList={showDateList.slice(14, 21)}
					></ToDoCalendarRow>
				</div>
			</div>
			<div className="todo-calendar__row">
				<div className="todo-calendar__row__date">
					<ToDoCalendarRow
						notes={noteWithLayer}
						dateList={showDateList.slice(21, 28)}
					></ToDoCalendarRow>
				</div>
			</div>
			<div className="todo-calendar__row">
				<div className="todo-calendar__row__date">
					<ToDoCalendarRow
						notes={noteWithLayer}
						dateList={showDateList.slice(28, 35)}
					></ToDoCalendarRow>
				</div>
			</div>
		</div>
	);
}

export default ToDoCalendar;
