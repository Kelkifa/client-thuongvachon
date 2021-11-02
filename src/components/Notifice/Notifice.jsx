import "./notifice.scss";

import {AiFillCheckCircle} from "react-icons/ai";
import {FaExclamation} from "react-icons/fa";
import React from "react";

// import PropTypes from "prop-types";


// import PropTypes from "prop-types";

function Fail({text = ""}) {
	return (
		<div className="notifice notifice__danger">
			<FaExclamation className="notifice__icon notifice__danger__icon" /> {text}
		</div>
	);
}

function Success({text = ""}) {
	return (
		<div className="notifice notifice__success">
			<AiFillCheckCircle className="notifice__icon notifice__success__icon" />
			{text}
		</div>
	);
}

export const ProcessNotifice = ({
	notifice = {isProcessing: false, error: undefined},
	successText = "",
}) => {
	const {isProcessing, error} = notifice;
	return (
		<>
			{isProcessing === true || error === undefined ? null : error === false ? (
				<Success text={successText} />
			) : (
				<Fail text={error} />
			)}
		</>
	);
};

// ProcessNotifice.propTypes = {
// 	notifice: PropTypes.object,
// 	successText: PropTypes.string,
// };

// ProcessNotifice.defaultProps = {
// notifice:
// }
