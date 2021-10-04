import "./todoList.scss";

import PropTypes from "prop-types";
import React from "react";
import TodoListNote from "./TodoListNote";

TodoList.propTypes = {
	noteList: PropTypes.array,
	className: PropTypes.string,
};

TodoList.defaultProps = {
	noteList: [],
	className: "",
};

function TodoList(props) {
	const {noteList, className} = props;
	return (
		<div className={`todo-list ${className}`}>
			<h3 className="todo-list__title">Todo list</h3>
			<div className="todo-list__control">__control</div>
			<ul className="todo-list__content">
				{noteList.map(value => (
					<TodoListNote key={value._id} note={value} />
				))}
			</ul>
		</div>
	);
}

export default TodoList;
