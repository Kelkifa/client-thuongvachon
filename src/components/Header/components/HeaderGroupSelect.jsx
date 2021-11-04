import "./HeaderGroupSelect.scss";

import {useDispatch, useSelector} from "react-redux";

import {AiOutlineDown} from "react-icons/ai";
import PropTypes from "prop-types";
import React from "react";
import {groupGet} from "features/group/groupSlice";
import {useEffect} from "react";
import {useState} from "react";

HeaderGroupSelect.propTypes = {};

function HeaderGroupSelect(props) {
	const dispatch = useDispatch();
	const [isShow, setIsShow] = useState(false);

	const authLoading = useSelector(state => state.auth.loading);

	const groupInfo = useSelector(state => state.groups.groups);

	useEffect(() => {
		const fetchGroup = async () => {
			await dispatch(groupGet());
		};
		fetchGroup();
	}, [authLoading]);

	if (authLoading) return "loading ...";

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
				<div className="header-group-select__btn__text">Group name</div>
				<div className="header-group-select__btn__icon">
					{!isShow && <AiOutlineDown />}
				</div>
			</div>

			{isShow && (
				<ul className="header-group-select__hide custom-scroll">
					<li>asdasds</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
					<li>asdasdlj askdj l</li>
				</ul>
			)}
		</div>
	);
}

export default HeaderGroupSelect;
