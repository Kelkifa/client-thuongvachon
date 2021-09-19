import {
	getDateList,
	getFirstLastDay,
} from "features/ToDo/components/coreCalendar";

import PropTypes from "prop-types";
import React from "react";
import ToDoCalendar from "./components/ToDoCalendar";

ToDo.propTypes = {};

function ToDo(props) {
	return (
		<div className="grid wide">
			<div className="row">
				<div className="c-6 m-12">
					<ToDoCalendar showDate={new Date()}></ToDoCalendar>
				</div>
			</div>
		</div>
	);
}

export default ToDo;
