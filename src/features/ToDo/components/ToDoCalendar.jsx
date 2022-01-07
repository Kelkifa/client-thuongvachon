import "./ToDoCalendar.scss";

import {getDateList, getLayerNote} from "features/ToDo/components/coreCalendar";

import PropTypes from "prop-types";
import React from "react";
import ToDoCalendarRow from "./ToDoCalendarRow";
import ToDoCalendarSelect from "./ToDoCalendarSelect";
import TodoCalendarHeader from "./TodoCalendarHeader";
import {useMemo} from "react";
import {useState} from "react";

ToDoCalendar.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	noteList: PropTypes.array,

	selectedNote: PropTypes.object,
	setSelectedNote: PropTypes.func,

	setShowYearAndMonth: PropTypes.func,

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

	selectedNote: {},
	setSelectedNote: () => {},

	setShowYearAndMonth: () => {},

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
	selectedNote,
	setSelectedNote,
	selectedOne,
	selectedTwo,
	selectOneClick,
	selectTwoClick,
	setShowYearAndMonth,
}) {
	const now = new Date();

	/** useState */
	// Data
	const [showDate, setShowDate] = useState(now); // Showed date in calendar
	// const [activedNote, setActivedNote] = useState({});

	const [viewType, setViewType] = useState(0); // Values in (0, 1, 2, 3);

	const [currYearSelect, setCurrYearSelect] = useState(now.getFullYear());

	// PROCESS DATE
	// const showDateList = getDateList(showDate);

	const showDateList = useMemo(() => {
		return getDateList(showDate);
	}, [showDate]);

	const noteWithLayer = useMemo(() => {
		// const notesInMonth = noteList.filter(
		// 	// value =>
		// 	// 	value.from <= showDateList[showDateList.length - 1] &&
		// 	// 	value.to >= showDateList[0]
		// 	note => {
		// 		if (
		// 			note.to < showDateList[0] ||
		// 			note.from > showDateList[showDateList.length - 1]
		// 		)
		// 			return false;
		// 		return true;
		// 	}
		// );

		return getLayerNote(noteList);
	}, [noteList, showDateList]);

	// const notesInMonth = noteList.filter(
	// 	value =>
	// 		value.from <= showDateList[showDateList.length - 1] &&
	// 		value.to >= showDateList[0]
	// );

	const renderRowList = [];
	for (let i = 0; i < 6; i++) {
		renderRowList.push(
			<div className="todo-calendar__row" key={i}>
				<div className="todo-calendar__row__date">
					<ToDoCalendarRow
						currMonth={showDate.getMonth()}
						notes={noteWithLayer}
						dateList={showDateList.slice(i * 7, i * 7 + 7)}
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
		);
	}

	// HANDLE FUNCTIONS

	return (
		<TodoCalendarContext.Provider
			value={{
				currDate: showDate,
				selectedNote,
				setSelectedNote,
			}}
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
					setShowYearAndMonth={setShowYearAndMonth}
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
						{/* ROWS */}
						{renderRowList}
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
