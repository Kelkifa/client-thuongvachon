import "./ToDoCalendar.scss";

import {getDateList, getLayerNote} from "features/ToDo/components/coreCalendar";

import PropTypes from "prop-types";
import React from "react";
import ToDoCalendarRow from "./ToDoCalendarRow";
import ToDoCalendarSelect from "./ToDoCalendarSelect";
import TodoCalendarHeader from "./TodoCalendarHeader";
import {useState} from "react";

ToDoCalendar.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	noteList: PropTypes.array,

	selectedOne: PropTypes.object,
	selectedTwo: PropTypes.object,

	selectOneClick: PropTypes.func,
	selectTwoClick: PropTypes.func,

	handleDateClick: PropTypes.func,
};

ToDoCalendar.defaultProps = {
	className: "",
	id: undefined,
	noteList: [],

	selectedOne: undefined,
	selectedTwo: undefined,

	selectOneClick: undefined,
	selectTwoClick: undefined,
};

export const TodoCalendarContext = React.createContext();

function ToDoCalendar({
	noteList,
	id,
	className,
	selectedOne,
	selectedTwo,
	selectOneClick,
	selectTwoClick,
}) {
	const now = new Date();

	/** useState */
	// Data
	const [showDate, setShowDate] = useState(now); // Showed date in calendar
	const [activedNote, setActivedNote] = useState(null);

	const [viewType, setViewType] = useState(0); // Values in (0, 1, 2, 3);

	const [currYearSelect, setCurrYearSelect] = useState(now.getFullYear());

	// PROCESS DATE
	const showDateList = getDateList(showDate);

	const notesInMonth = noteList.filter(
		value =>
			value.from <= showDateList[showDateList.length - 1] &&
			value.to >= showDateList[0]
	);
	const noteWithLayer = getLayerNote(notesInMonth);

	// HANDLE FUNCTIONS

	return (
		<TodoCalendarContext.Provider
			value={{currDate: showDate, activedNote, setActivedNote}}
		>
			<div className={`todo-calendar ${className}`} id={id}>
				<TodoCalendarHeader
					// showDate={showDateEle[viewType]}
					className="todo-calendar__row"
					viewType={viewType}
					setViewType={setViewType}
					showDate={showDate}
					setShowDate={setShowDate}
					currYearSelect={currYearSelect}
					setCurrYearSelect={setCurrYearSelect}
				/>
				{viewType === 0 && (
					<>
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
									currMonth={showDate.getMonth()}
									notes={noteWithLayer}
									dateList={showDateList.slice(0, 7)}
									selectedOne={selectedOne}
									selectedTwo={selectedTwo}
									onCellClick={value => {
										if (typeof selectOneClick === "function") {
											selectOneClick(value);
										}
										if (typeof selectTwoClick === "function") {
											selectTwoClick(value);
										}
									}}
								></ToDoCalendarRow>
							</div>
						</div>
						<div className="todo-calendar__row">
							<div className="todo-calendar__row__date">
								<ToDoCalendarRow
									currMonth={showDate.getMonth()}
									notes={noteWithLayer}
									dateList={showDateList.slice(7, 14)}
									selectedOne={selectedOne}
									selectedTwo={selectedTwo}
									onCellClick={value => {
										if (typeof selectOneClick === "function") {
											selectOneClick(value);
										}
										if (typeof selectTwoClick === "function") {
											selectTwoClick(value);
										}
									}}
								></ToDoCalendarRow>
							</div>
						</div>
						<div className="todo-calendar__row">
							<div className="todo-calendar__row__date">
								<ToDoCalendarRow
									currMonth={showDate.getMonth()}
									notes={noteWithLayer}
									dateList={showDateList.slice(14, 21)}
									selectedOne={selectedOne}
									selectedTwo={selectedTwo}
									onCellClick={value => {
										if (typeof selectOneClick === "function") {
											selectOneClick(value);
										}
										if (typeof selectTwoClick === "function") {
											selectTwoClick(value);
										}
									}}
								></ToDoCalendarRow>
							</div>
						</div>
						<div className="todo-calendar__row">
							<div className="todo-calendar__row__date">
								<ToDoCalendarRow
									currMonth={showDate.getMonth()}
									notes={noteWithLayer}
									dateList={showDateList.slice(21, 28)}
									selectedOne={selectedOne}
									selectedTwo={selectedTwo}
									onCellClick={value => {
										if (typeof selectOneClick === "function") {
											selectOneClick(value);
										}
										if (typeof selectTwoClick === "function") {
											selectTwoClick(value);
										}
									}}
								></ToDoCalendarRow>
							</div>
						</div>
						<div className="todo-calendar__row">
							<div className="todo-calendar__row__date">
								<ToDoCalendarRow
									currMonth={showDate.getMonth()}
									notes={noteWithLayer}
									dateList={showDateList.slice(28, 35)}
									selectedOne={selectedOne}
									selectedTwo={selectedTwo}
									onCellClick={value => {
										if (typeof selectOneClick === "function") {
											selectOneClick(value);
										}
										if (typeof selectTwoClick === "function") {
											selectTwoClick(value);
										}
									}}
								></ToDoCalendarRow>
							</div>
						</div>
						<div className="todo-calendar__row">
							<div className="todo-calendar__row__date">
								<ToDoCalendarRow
									currMonth={showDate.getMonth()}
									notes={noteWithLayer}
									dateList={showDateList.slice(35, 42)}
									selectedOne={selectedOne}
									selectedTwo={selectedTwo}
									onCellClick={value => {
										if (typeof selectOneClick === "function") {
											selectOneClick(value);
										}
										if (typeof selectTwoClick === "function") {
											selectTwoClick(value);
										}
									}}
								></ToDoCalendarRow>
							</div>
						</div>
					</>
				)}

				{viewType > 0 && (
					<ToDoCalendarSelect
						currYearSelect={currYearSelect}
						setCurrYearSelect={setCurrYearSelect}
						showDate={showDate}
						setShowDate={setShowDate}
						viewType={viewType}
						setViewType={setViewType}
					/>
				)}
			</div>
		</TodoCalendarContext.Provider>
	);
}

export default ToDoCalendar;
