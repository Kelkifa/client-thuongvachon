import "./headerAuth.scss";

import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

HeaderAuth.propTypes = {
	urlArr: PropTypes.array,
};

HeaderAuth.defaultProps = {
	urlArr: [],
};

function HeaderAuth({urlArr}) {
	return (
		<div className="header-auth">
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
					textDecoration: urlArr.includes("register") ? "underline" : "none",
				}}
			>
				Register
			</Link>
		</div>
	);
}

export default HeaderAuth;
