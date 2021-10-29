import "./headerAuth.scss";

import {useDispatch, useSelector} from "react-redux";

import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import UserBtn from "components/UserBtn/UserBtn";
import {docSignOut} from "features/auth/authSlice";

HeaderAuth.propTypes = {
	// To handle underline of login in register link
	urlArr: PropTypes.array,
};

HeaderAuth.defaultProps = {
	urlArr: [],
};

function HeaderAuth({urlArr}) {
	// useDispatch for handle sign out
	const dispatch = useDispatch();

	// schema: {loading:Boolean, error: Boolean, isAuth: Boolean, user: Object}
	const userInfo = useSelector(state => state.auth);

	// Handle Functions
	const handleSignOut = () => {
		dispatch(docSignOut());
	};

	return (
		<div className="header-auth">
			{userInfo.loading === false && userInfo.isAuth === false ? (
				<div className="header-auth__auth-link">
					<Link
						to="/auth/login"
						style={{
							color: "unset",
							textDecoration: urlArr.includes("login") ? "underline" : "none",
						}}
					>
						Login
					</Link>
					<span> | </span>
					<Link
						to="/auth/register"
						style={{
							color: "unset",
							textDecoration: urlArr.includes("register")
								? "underline"
								: "none",
						}}
					>
						Register
					</Link>
				</div>
			) : (
				<div className="header-auth__user-btn">
					<UserBtn
						loading={userInfo.loading}
						userData={userInfo.user}
						onSignOutClick={handleSignOut}
					/>
				</div>
			)}
		</div>
	);
}

export default HeaderAuth;
