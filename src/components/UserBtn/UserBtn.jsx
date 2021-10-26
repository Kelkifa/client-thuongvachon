import "./userBtn.scss";

import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

UserBtn.propTypes = {
	userInfo: PropTypes.object,
	onSignOutClick: PropTypes.func,
};

UserBtn.defaultProps = {
	userInfo: {
		loading: false,
		error: null,
		isAuth: false,
		user: {},
	},

	onSignOutClick: () => {},
};

function UserBtn({userInfo, onSignOutClick}) {
	// useState
	const [isShowDropdown, setIsShowDropdown] = useState(false);

	return (
		<div className="user-btn">
			<div
				className="user-btn__btn"
				onClick={() => {
					setIsShowDropdown(!isShowDropdown);
				}}
			>
				H
			</div>
			{isShowDropdown && (
				<div className="user-btn__dropdown">
					<li className="user-btn__dropdown__item--arrow"></li>
					<li className="user-btn__dropdown__item">
						Tài khoản{" "}
						<span className="user-btn__dropdown__item__name">
							{userInfo.user.username}
						</span>
					</li>

					<li className="user-btn__dropdown__item--divider"></li>
					<li className="user-btn__dropdown__item" onClick={onSignOutClick}>
						Đăng xuất
					</li>
				</div>
			)}
		</div>
	);
}

export default UserBtn;
