import "./todoList.scss";

import PropTypes from "prop-types";
import React from "react";

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
					<li style={{backgroundColor: value.color}}>
						<span>
							{`[${value.startTime.join(
								":"
							)}] [${value.from.getDate()}/${value.from.getMonth()}/${value.from.getFullYear()}]`}
							<br />
							{`[${value.endTime.join(
								":"
							)}] [${value.to.getDate()}/${value.to.getMonth()}/${value.to.getFullYear()}]`}
						</span>
						{"  "}
						<span>{value.content}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export default TodoList;
