import {FaSearch} from "react-icons/fa";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

TodoManageSearchbar.propTypes = {
	onSearchClick: PropTypes.func,
};

TodoManageSearchbar.defaultProps = {
	onSearchClick: () => {},
};
function TodoManageSearchbar({onSearchClick}) {
	const [inputValue, setInputValue] = useState("");
	const handleChange = e => {
		setInputValue(e.target.value);
	};
	return (
		<div className="todo-manage__searchbar">
			<input
				type="text"
				value={inputValue}
				name="search"
				className="todo-manage__searchbar__input"
				placeholder="Nhập Sự Kiện Cần Tìm ..."
				onChange={handleChange}
			/>
			<button
				className="todo-manage__searchbar__btn"
				onClick={() => {
					onSearchClick(inputValue);
				}}
			>
				<FaSearch />
			</button>
		</div>
	);
}

export default TodoManageSearchbar;
