import {
	getDateList,
	getFirstLastDay,
} from "features/ToDo/components/coreCalendar";

import PropTypes from "prop-types";
import React from "react";
import ToDoCalendar from "./components/ToDoCalendar";

ToDo.propTypes = {};

function ToDo(props) {
	// const dateList = getDateList(new Date());
	// const getLastDate = getFirstLastDay(new Date(), "last");
	// console.log("[date list]", getLastDate.toDateString());

	const dateList = getDateList(new Date(2022, 3, 1));
	// console

	return (
		<div className="grid wide">
			<div className="row">
				<div className="c-6">
					<ToDoCalendar showDate={new Date()}></ToDoCalendar>
				</div>
			</div>
		</div>
	);
}

export default ToDo;
