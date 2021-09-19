import PropTypes from "prop-types";
import React from "react";

ToDoCalendarNode.propTypes = {
	date: PropTypes.number,
	className: PropTypes.string,

	value: PropTypes.object,
};

ToDoCalendarNode.defaultProps = {
	date: 1,
	className: null,

	value: {},
};

function ToDoCalendarNode(props) {
	const {className, date} = props;

	return <div className={className}>{date}</div>;
}

export default ToDoCalendarNode;
