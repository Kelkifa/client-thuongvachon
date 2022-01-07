import "./TodoManage.scss";

import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";
import {useState} from "react";

TodoManage.propTypes = {};

export default function TodoManage(props) {
	const [selectedTab, setSelectedTab] = useState(0); // 0: Hiện tại, 1: Đã qua, 2: Tìm kiếm
	return (
		<div className="todo-manage">
			<Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
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
