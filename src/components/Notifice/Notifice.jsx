import "./notifice.scss";

import {AiFillCheckCircle} from "react-icons/ai";
import {FaExclamation} from "react-icons/fa";
import React from "react";

// import PropTypes from "prop-types";


const Notifice = {
	Fail({text = ""}) {
		return (
			<div className="notifice notifice__danger">
				<FaExclamation className="notifice__icon notifice__danger__icon" />{" "}
				{text}
			</div>
		);
	},
	Success({text = ""}) {
		return (
			<div className="notifice notifice__success">
				<AiFillCheckCircle className="notifice__icon notifice__success__icon" />
				{text}
			</div>
		);
	},
};

export default Notifice;
