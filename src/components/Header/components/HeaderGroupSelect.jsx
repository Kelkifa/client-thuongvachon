import "./HeaderGroupSelect.scss";

import {groupChoose, groupGet} from "features/group/groupSlice";
import {useDispatch, useSelector} from "react-redux";

import {AiOutlineDown} from "react-icons/ai";
import React from "react";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useState} from "react";

// import PropTypes from "prop-types";

// HeaderGroupSelect.propTypes = {};

function HeaderGroupSelect(props) {
	const dispatch = useDispatch();
	const [isShow, setIsShow] = useState(false);

	const history = useHistory();

	const authLoading = useSelector(state => state.auth.loading);

	const groupInfo = useSelector(state => state.groups);

	useEffect(() => {
		const fetchGroup = async () => {
			await dispatch(groupGet());
		};
		fetchGroup();
	}, [dispatch, authLoading]);

	if (authLoading) return "loading ...";
	if (groupInfo.error) return "error";
	if (groupInfo.loading) return "group loading ...";

	const handleClick = group => {
		dispatch(groupChoose(group));
		// Handle path
		const gotoPath = window.location.pathname.split("/")[1];
		history.push(`/${gotoPath}`);

		setIsShow(false);
	};

	return (
		<div className="header-group-select">
			<div
				className={`header-group-select__btn ${
					isShow ? "header-group-select__btn--show" : ""
				}`}
				onClick={() => {
					setIsShow(!isShow);
				}}
			>
				<div className="header-group-select__btn__text">
					{groupInfo.selectedGroup.name}
				</div>
				<div className="header-group-select__btn__icon">
					{!isShow && <AiOutlineDown />}
				</div>
			</div>

			{isShow && (
				<ul className="header-group-select__hide custom-scroll">
					{groupInfo.groups.map(group => (
						<li
							key={group._id}
							onClick={() => {
								handleClick(group);
							}}
						>
							{group.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default HeaderGroupSelect;
