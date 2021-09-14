import "./ToDoCalendar.scss";

import PropTypes from "prop-types";
import React from "react";
import {getDateList} from "features/ToDo/components/coreCalendar";

ToDoCalendar.propTypes = {
	showDate: PropTypes.object,
};

ToDoCalendar.defaultProps = {
	showDate: new Date(),
};

function ToDoCalendar(props) {
	const {showDate} = props;
	const showDateList = getDateList(showDate);

	const curMonth = showDateList[7] && showDateList[7].getMonth(); // To compare to blur showed days

	return (
		<div className="todo-calendar grid rg-5">
			<div className="todo-calendar__title row">
				<div className="c-12 todo-calendar__title__date">
					Tháng {curMonth + 1} 2021
				</div>
			</div>

			<ul className="todo-calendar__node row-c14">
				<li className="c-2">SUN</li>
				<li className="c-2">MON</li>
				<li className="c-2">TUE</li>
				<li className="c-2">WED</li>
				<li className="c-2">THU</li>
				<li className="c-2">FRI</li>
				<li className="c-2">SAT</li>
			</ul>

			<ul className="todo-calendar__node row-c14">
				{showDateList.slice(0, 7).map(value => (
					<li
						key={value.getDate()}
						className={`c-2 ${
							value.getMonth() !== curMonth
								? "todo-calendar__node__text--blur"
								: ""
						}`}
					>
						{value.getDate()}
					</li>
				))}
			</ul>
			<ul className="todo-calendar__node row-c14">
				{showDateList.slice(7, 14).map(value => (
					<li key={value.getDate()} className="c-2">
						{value.getDate()}
					</li>
				))}
			</ul>
			<ul className="todo-calendar__node row-c14">
				{showDateList.slice(14, 21).map(value => (
					<li key={value.getDate()} className="c-2">
						{value.getDate()}
					</li>
				))}
			</ul>
			<ul className="todo-calendar__node row-c14">
				{showDateList.slice(21, 28).map(value => (
					<li key={value.getDate()} className="c-2">
						{value.getDate()}
					</li>
				))}
			</ul>
			<ul className="todo-calendar__node row-c14">
				{showDateList.slice(28, 35).map(value => (
					<li
						key={value.getDate()}
						className={`c-2 ${
							value.getMonth() !== curMonth
								? "todo-calendar__node__text--blur"
								: ""
						}`}
					>
						{value.getDate()}
					</li>
				))}
			</ul>
		</div>
	);
}

export default ToDoCalendar;
