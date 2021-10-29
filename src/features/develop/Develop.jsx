// import ButtonTest from "./components/ButtonTest";

import "./develop.scss";

import ContentDropdown from "components/Dropdown/ContentDropdown";
import React from "react";

function Develop(props) {
	return (
		<div className="grid wide develop">
			<ContentDropdown showContent="dropdown 1"> children</ContentDropdown>
			<ContentDropdown showContent="dropdown 2"> children</ContentDropdown>
		</div>
	);
}

export default Develop;
