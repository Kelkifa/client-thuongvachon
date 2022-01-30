import "./TodoManage.scss";

import {useDispatch, useSelector} from "react-redux";

import React from "react";
import TodoManageSearchbar from "./TodoManageSearchbar";
import TodoManageTable from "./TodoManageTable";
import clsx from "clsx";
import {todoApi} from "api/todoApi";
import {todoDeleteMulti} from "features/ToDo/todoSlice";
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
	const dispatch = useDispatch();
	const [selectedTab, setSelectedTab] = useState(0); // 0: Hiện tại, 1: Đã qua, 2: Tìm kiếm

	const currNoteList = useSelector(state => {
		const {loading, err, data} = state.todos.user;
		return {loading, err, data};
	});

	const [noteInfo, setNoteInfo] = useState(currNoteList);

	const groupId = useSelector(state => state.groups.selectedGroup._id);

	useEffect(() => {
		if (selectedTab !== 0) return;
		setNoteInfo(currNoteList);
	}, [currNoteList, selectedTab]);

	/** HANDLE FUNCTIONS */
	// Search
	const handleSearchClick = async search => {
		try {
			setNoteInfo(setStateByResponse(true));
			const response = await todoApi.search({groupId, search});
			setNoteInfo(setStateByResponse(false, response));
		} catch (err) {
			console.log(err);
		}
	};

	// delete notes
	const handleDelete = async noteList => {
		try {
			// Add field loading
			setNoteInfo({
				...noteInfo,
				data: noteInfo.data.map((note, index) => ({
					...note,
					loading: note._id === noteList[index] ? true : false,
				})),
			});

			const response = await dispatch(todoDeleteMulti({groupId, noteList}));

			if (response.payload.success) {
				setNoteInfo({
					...noteInfo,
					data: noteInfo.data.filter(
						(note, index) => note._id !== noteList[index]
					),
				});
				return;
			}
			setNoteInfo({
				...noteInfo,
				data: noteInfo.data.map((note, index) => ({
					...note,
					loading: note._id === noteList[index] ? false : true,
				})),
			});
		} catch (err) {
			console.log(err);
		}
	};

	// Change Tab
	const handleTabChange = async tab => {
		setSelectedTab(tab);
		if (tab === 2) {
			setNoteInfo({loading: false, error: null, data: []});
			return;
		}
		setNoteInfo(setStateByResponse(true));
		if (tab === 0) {
			setNoteInfo(currNoteList);
			return;
		}
		if (tab === 1) {
			setNoteInfo(setStateByResponse(true));
			try {
				const response = await todoApi.getPassedNotes({groupId});
				setNoteInfo(setStateByResponse(false, response));
			} catch (err) {
				console.log(err);
				return;
			}
		}
	};

	/** RENDER */
	return (
		<div className="todo-manage">
			<Tab selectedTab={selectedTab} onTabClick={handleTabChange} />
			{selectedTab === 2 && (
				<TodoManageSearchbar onSearchClick={handleSearchClick} />
			)}
			<TodoManageTable
				selectedTab={selectedTab}
				noteInfo={noteInfo}
				handleNotesDelete={handleDelete}
			/>
		</div>
	);
}

// Tab
function Tab({selectedTab, onTabClick}) {
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
					onTabClick(0);
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
					onTabClick(1);
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
					onTabClick(2);
				}}
			>
				Tìm Kiếm
			</li>
		</ul>
	);
}
