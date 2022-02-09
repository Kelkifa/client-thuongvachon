import "./TodoList.scss";

import {BsCircleFill, BsPlusCircle} from "react-icons/bs";
import React, {useState} from "react";
import {todoChangeState, todoDeleteTodo} from "features/ToDo/todoSlice";
import {useDispatch, useSelector} from "react-redux";

import {BiError} from "react-icons/bi";
import {FaCheckCircle} from "react-icons/fa";
import {IoIosArrowBack} from "react-icons/io";
import PropTypes from "prop-types";
import {TiDelete} from "react-icons/ti";
import TodoListFormAdd from "./TodoListFormAdd";
import TodoManage from "./TodoManage";
import clsx from "clsx";

const TodoList = React.forwardRef(
	({selectedNote = {}, setSelectedNote}, ref) => {
		const [isManageView, setIsManageView] = useState(false);
		const height = ref.current ? ref.current.offsetHeight : 262;

		return (
			<div
				className="todo-list"
				style={{
					"--calendar-h": height + "px",
				}}
			>
				<div className="todo-list__toolbar">
					{isManageView ? (
						<IoIosArrowBack
							className="todo-list__toolbar__back-btn"
							onClick={() => {
								setIsManageView(false);
							}}
						/>
					) : (
						<button
							className="todo-list__toolbar__btn"
							onClick={() => {
								setIsManageView(!isManageView);
							}}
						>
							Quản lý
						</button>
					)}
				</div>

				{isManageView ? (
					// Manage
					<TodoManage />
				) : (
					// Todo List
					<TodoListBody
						selectedNote={selectedNote}
						setSelectedNote={setSelectedNote}
					/>
				)}
			</div>
		);
	}
);

TodoList.propTypes = {
	selectedNote: PropTypes.object,
};

TodoList.defaultProps = {
	selectedNote: {},
};

export default TodoList;

// BODY
function TodoListBody({selectedNote, setSelectedNote}) {
	const [isShowAddForm, setIsShowAddForm] = useState(false);

	const dispatch = useDispatch();
	const groupId = useSelector(state => state.groups.selectedGroup._id);

	const handleChangeState = async (state, todoId) => {
		try {
			await dispatch(
				todoChangeState({noteId: selectedNote._id, todoId, state, groupId})
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelte = async todoId => {
		try {
			await dispatch(
				todoDeleteTodo({noteId: selectedNote._id, todoId, groupId})
			);
		} catch (err) {
			console.log(err);
		}
	};

	if (!selectedNote._id)
		return (
			<div className="todo-list__text">
				<h3 className="todo-list__title">Danh Sách Công việc</h3>
				Nhấn vô 1 ghi chú trên lịch để xem danh sách các công việc
			</div>
		);

	return (
		<>
			<h3 className="todo-list__title">Danh Sách Công việc</h3>
			<ul className="todo-list__body">
				<li
					className="todo-list__body__add"
					onClick={() => {
						setIsShowAddForm(!isShowAddForm);
					}}
				>
					<BsPlusCircle className="todo-list__body__add__icon" />
					<p className="todo-list__body__add__text">Thêm công việc</p>
				</li>

				{isShowAddForm && (
					<li>
						<TodoListFormAdd
							todoId={selectedNote._id}
							setSelectedNote={setSelectedNote}
						/>
					</li>
				)}
				<ul className="todo-list__body__notes custom-scroll">
					{selectedNote.todoList.map((value, index) => (
						<li
							className={clsx("todo-list__body__notes__item", {
								"todo-list__body__notes__item--loading": value.loading,
							})}
							key={index}
						>
							<div className="todo-list__body__notes__item__left">
								{value.state ? (
									<FaCheckCircle
										className="todo-list__body__notes__item__left__cir todo-list__body__notes__item__left__cir--tick"
										onClick={() => {
											!value.loading && handleChangeState(false, value._id);
										}}
									/>
								) : (
									<BsCircleFill
										className="todo-list__body__notes__item__left__cir"
										onClick={() => {
											!value.loading && handleChangeState(true, value._id);
										}}
									/>
								)}
								<div className="todo-list__body__notes__item__left__content">
									{value.todo}
								</div>
							</div>
							<div className="todo-list__body__notes__item__right">
								{!value.loading && !value.error && (
									<TiDelete
										className="todo-list__body__notes__item__right__icon"
										onClick={() => {
											handleDelte(value._id);
										}}
									/>
								)}
								{value.error && (
									<BiError className="todo-list__body__notes__item__right__icon todo-list__body__notes__item__right__icon--error" />
								)}
							</div>
						</li>
					))}
				</ul>
			</ul>
		</>
	);
}
