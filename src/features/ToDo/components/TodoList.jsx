import "./todoList.scss";

import LoadIcon from "components/LoadIcon";
import PropTypes from "prop-types";
import React from "react";
import TodoListNote from "./TodoListNote";

TodoList.propTypes = {
	isLoading: PropTypes.bool,
	noteList: PropTypes.array,
	className: PropTypes.string,
};

TodoList.defaultProps = {
	isLoading: true,
	noteList: [],
	className: "",
};

function TodoList(props) {
	const {isLoading, noteList, className} = props;
	return (
		<div className={`todo-list ${className}`}>
			<h3 className="todo-list__title">
				<span className="todo-list__title__text">Todo List</span>{" "}
				{isLoading && <LoadIcon className="todo-list__title__icon" />}
			</h3>
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
