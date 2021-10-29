import "./userBtn.scss";

import {BsThreeDots} from "react-icons/bs";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

UserBtn.propTypes = {
	loading: PropTypes.bool,
	// Schema: {_id: String, username:String, fullname: String}
	userDate: PropTypes.object,
	onSignOutClick: PropTypes.func,
};

UserBtn.defaultProps = {
	loading: true,
	userData: {},

	onSignOutClick: () => {},
};

function UserBtn({loading, userData, onSignOutClick}) {
	// useState
	const [isShowDropdown, setIsShowDropdown] = useState(false);

	return (
		<>
			{loading ? (
				// Loading
				<UserBtnLoading
					isShowDropdown={isShowDropdown}
					onClick={() => {
						setIsShowDropdown(!isShowDropdown);
					}}
				/>
			) : (
				// Success
				<div className="user-btn">
					<div
						className="user-btn__btn"
						onClick={() => {
							setIsShowDropdown(!isShowDropdown);
						}}
					>
						{userData.username[0]}
					</div>
					{isShowDropdown && (
						<div className="user-btn__dropdown">
							<li className="user-btn__dropdown__item--arrow"></li>
							<li className="user-btn__dropdown__item">
								Tài khoản{" "}
								<span className="user-btn__dropdown__item__name">
									{userData.username}
								</span>
							</li>
							{userData.isAdmin === true && (
								<div className="user-btn__dropdown__item user-btn__dropdown__item__admin">
									Admin
								</div>
							)}

							<li className="user-btn__dropdown__item--divider"></li>
							<li className="user-btn__dropdown__item" onClick={onSignOutClick}>
								Đăng xuất
							</li>
						</div>
					)}
				</div>
			)}
		</>
	);
}
export default UserBtn;

// Props loading === true
function UserBtnLoading({onClick, isShowDropdown}) {
	return (
		<div className="user-btn">
			<div className="user-btn__btn" onClick={onClick}>
				<BsThreeDots />
			</div>
			{isShowDropdown && (
				<div className="user-btn__dropdown user-btn__dropdown--loading">
					<li className="user-btn__dropdown__item--arrow"></li>

					<li className="user-btn__dropdown__item--loading"></li>
					<li className="user-btn__dropdown__item--loading"></li>
					<li className="user-btn__dropdown__item--divider--loading"></li>
					<li className="user-btn__dropdown__item--loading"></li>
				</div>
			)}
		</div>
	);
}
