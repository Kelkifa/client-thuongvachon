import "./notifice.scss";

import {AiFillCheckCircle} from "react-icons/ai";
import {FaExclamation} from "react-icons/fa";
import React from "react";

// import PropTypes from "prop-types";

const Fail = ({text = ""}) => {
	return (
		<div className="notifice notifice__danger">
			<FaExclamation className="notifice__icon notifice__danger__icon" /> {text}
		</div>
	);
};

const Success = ({text = ""}) => {
	return (
		<div className="notifice notifice__success">
			<AiFillCheckCircle className="notifice__icon notifice__success__icon" />
			{text}
		</div>
	);
};

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
	// Props notifice: {isProcessing: false, error: undefined}
	ProcessNotifice({
		notifice = {isProcessing: false, error: undefined},
		successText = "",
	}) {
		const {isProcessing, error} = notifice;
		return (
			<>
				{isProcessing === true || error === undefined ? null : error ===
				  false ? (
					<Success text={successText} />
				) : (
					<Fail text={error} />
				)}
			</>
		);
	},
};

export default Notifice;
