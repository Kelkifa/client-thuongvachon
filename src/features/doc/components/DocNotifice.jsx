import "./docNotifice.scss";

import {AiFillCheckCircle} from "react-icons/ai";
import {FaExclamation} from "react-icons/fa";

// import PropTypes from "prop-types";

const DocNotifice = {
	Fail({text = ""}) {
		return (
			<div className="doc-notifice doc-notifice__danger">
				<FaExclamation className="doc-notifice__icon doc-notifice__danger__icon" />{" "}
				{text}
			</div>
		);
	},
	Success({text = ""}) {
		return (
			<div className="doc-notifice doc-notifice__success">
				<AiFillCheckCircle className="doc-notifice__icon doc-notifice__success__icon" />
				{text}
			</div>
		);
	},
};

export default DocNotifice;
