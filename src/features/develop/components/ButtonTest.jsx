// import PropTypes from "prop-types";

import React from "react";
import {useState} from "react";

// ButtonTest.propTypes = {};

function ButtonTest(props) {
	const [count, setCount] = useState(0);

	const Component = "button";

	const buttonProps = {
		onClick() {
			setCount(count + 1);
		},
	};
	return (
		<div>
			<h2>Số lần bấm nút: {count}</h2>
			<Component {...buttonProps}> button test</Component>
		</div>
	);
}

export default ButtonTest;
