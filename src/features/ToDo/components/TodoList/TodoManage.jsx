import "./TodoManage.scss";

import {todoDelete, todoDeleteMulti} from "features/ToDo/todoSlice";
import {useDispatch, useSelector} from "react-redux";

import MultiCheckboxForm from "components/Form/MultiCheckboxForm";
import PropTypes from "prop-types";
import React from "react";
import Table from "components/Table/Table";
import clsx from "clsx";
import {todoApi} from "api/todoApi";
import {useEffect} from "react";
import {useState} from "react";

TodoManage.propTypes = {};

function setStateByResponse(isLoading, response) {
	if (isLoading) return {loading: true, error: null, data: []};

	return {
		loading: false,
		error: response.success ? null : response.message,
		data: response.success ? response.response : [],
	};
}

/* MAIN COMPONENT */
export default function TodoManage(props) {
	const [selectedTab, setSelectedTab] = useState(0); // 0: Hiện tại, 1: Đã qua, 2: Tìm kiếm

	const currNoteList = useSelector(state => {
		const {loading, err, data} = state.todos.user;
		return {loading, err, data};
	});

	const [noteInfo, setNoteInfo] = useState(currNoteList);
	console.log(noteInfo);

	const groupId = useSelector(state => state.groups.selectedGroup._id);

	const onSearchClick = async search => {
		try {
			const response = await todoApi.search({groupId, search});
			setNoteInfo(setStateByResponse(false, response));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="todo-manage">
			<Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			{selectedTab < 2 && <TodoManageTable selectedTab={selectedTab} />}
		</div>
	);
}

// Tab
function Tab({selectedTab, setSelectedTab}) {
	return (
		<ul className="todo-manage__tab">
			<li
				className={clsx(
					{
						"todo-manage__tab__item--selected": selectedTab === 0,
					},
					"todo-manage__tab__item"
				)}
				onClick={() => {
					setSelectedTab(0);
				}}
			>
				Ghi Chú Hiện Tại
			</li>
			<li
				className={clsx(
					{
						"todo-manage__tab__item--selected": selectedTab === 1,
					},
					"todo-manage__tab__item"
				)}
				onClick={() => {
					setSelectedTab(1);
				}}
			>
				Ghi Chú Đã Qua
			</li>
			<li
				className={clsx(
					{
						"todo-manage__tab__item--selected": selectedTab === 2,
					},
					"todo-manage__tab__item"
				)}
				onClick={() => {
					setSelectedTab(2);
				}}
			>
				Tìm Kiếm
			</li>
		</ul>
	);
}

// TODO LIST TABLE
function TodoManageTable({selectedTab}) {
	const dispatch = useDispatch();

	const groupId = useSelector(state => state.groups.selectedGroup._id);
	const currNoteList = useSelector(state => state.todos.user.data);

	const [passedNoteList, setPassedNoteList] = useState([]);

	useEffect(() => {
		if (selectedTab !== 1) return;
		const fetchPassedNoteList = async () => {
			try {
				const response = await todoApi.getPassedNotes({groupId});
				// console.log(response);
				if (response.success) {
					setPassedNoteList(response.response);
				}
			} catch (err) {
				console.log(err);
			}
		};
		fetchPassedNoteList();
	}, [selectedTab, groupId]);

	const handleDelete = async (noteId, index) => {
		console.log(index);
		if (!noteId) return;
		try {
			if (selectedTab === 1) {
				const copyPassedNoteList = [...passedNoteList];
				copyPassedNoteList[index].loading = true;
				setPassedNoteList(copyPassedNoteList);
			}
			const response = await dispatch(todoDelete({data: noteId, groupId}));
			if (selectedTab === 1) {
				const copyPassedNoteList = [...passedNoteList];
				if (response.payload.success) {
					copyPassedNoteList.splice(index, 1);
					setPassedNoteList(copyPassedNoteList);
					return;
				}
				copyPassedNoteList[index].loading = false;
				setPassedNoteList(copyPassedNoteList);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleDeleteMulti = async checkedNoteList => {
		console.log(checkedNoteList);
		try {
			if (checkedNoteList.lenght) return;

			// Pending
			if (selectedTab === 1) {
				setPassedNoteList(
					passedNoteList.map((note, index) => ({
						...note,
						loading: note._id === checkedNoteList[index] ? true : false,
					}))
				);
			}
			const response = await dispatch(
				todoDeleteMulti({groupId, noteList: checkedNoteList})
			);
			if (selectedTab === 1) {
				if (response.payload.success) {
					setPassedNoteList(
						passedNoteList.filter(
							(note, index) => note._id !== checkedNoteList[index]
						)
					);
					return;
				}

				setPassedNoteList(
					passedNoteList.map(note => ({...note, loading: false}))
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const tableHeader = ["", "Tên", "Từ", "Đến", "Option"];

	const TableBody = ({noteList, multiCheckboxProps}) => {
		const {handleChange, checkedData} = multiCheckboxProps;

		return (
			<>
				{noteList.length === 0 && (
					<tr>
						<td style={{textAlign: "center"}} colSpan={tableHeader.length}>
							Không có ghi chú nào
						</td>
					</tr>
				)}
				{noteList.map((note, index) => (
					<tr
						key={note._id}
						style={{backgroundColor: note.color}}
						className={clsx(
							{
								"todo-manage__table__item--loading": note.loading,
							},
							"todo-manage__table__item"
						)}
					>
						<td style={{verticalAlign: "middle"}}>
							<input
								type="checkbox"
								checked={checkedData[index] ? true : false}
								disabled={note.loading}
								onChange={e => {
									handleChange(e.target.checked, index);
								}}
							/>
						</td>
						<td>{note.title}</td>
						<td>{note.from}</td>
						<td>{note.to}</td>
						<td>
							<div
								className={clsx({
									"todo-manage__table__item__option-btn--disabled":
										note.loading,
									"todo-manage__table__item__option-btn": !note.loading,
								})}
								onClick={() => {
									if (note.loading) return;
									handleDelete(note._id, index);
								}}
							>
								Xóa
							</div>
							<div
								className={clsx({
									"todo-manage__table__item__option-btn--disabled":
										note.loading,
									"todo-manage__table__item__option-btn": !note.loading,
								})}
							>
								Sửa
							</div>
						</td>
					</tr>
				))}
			</>
		);
	};

	return (
		<div className="todo-manage__table">
			<h3 className="todo-manage__table__title">Danh Sách các sự kiện</h3>

			<MultiCheckboxForm
				dataList={
					selectedTab === 0
						? currNoteList.map(note => note._id)
						: passedNoteList.map(note => note._id)
				}
			>
				{multiCheckboxProps => {
					const {handleCheckedAll, checkedData} = multiCheckboxProps;

					return (
						<>
							<div className="todo-manage__table__control">
								{/* Control */}
								<div className="todo-manage__table__control__left">
									<input
										type="checkbox"
										onChange={e => {
											handleCheckedAll(e.target.checked);
										}}
										checked={
											checkedData.findIndex(value => value === undefined) === -1
												? true
												: false
										}
									/>{" "}
									Chọn tất cả
								</div>
								<div
									className="todo-manage__table__control__right"
									onClick={() => {
										handleDeleteMulti(checkedData);
									}}
								>
									Xóa (
									{checkedData.reduce((preValue, value) => {
										return value !== undefined ? preValue + 1 : preValue;
									}, 0)}
									)
								</div>
							</div>
							<Table
								headerList={tableHeader}
								rowHighlight="rgba(0, 0, 0, 0.274)"
								rowHover="rgba(0, 0, 0, 0.474)"
								maxHeight="470px"
							>
								{selectedTab === 0 && (
									<TableBody
										noteList={currNoteList}
										multiCheckboxProps={multiCheckboxProps}
									/>
								)}

								{selectedTab === 1 && (
									<TableBody
										noteList={passedNoteList}
										multiCheckboxProps={multiCheckboxProps}
									/>
								)}
							</Table>
						</>
					);
				}}
			</MultiCheckboxForm>
		</div>
	);
}
