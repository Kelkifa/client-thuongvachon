import "./myButton.scss";

import LoadIcon from "components/LoadIcon";
import PropTypes from "prop-types";
import React from "react";

MyButton.propTypes = {
	className: PropTypes.string,

	disabled: PropTypes.bool,
	text: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	handleClick: PropTypes.func,
};

MyButton.defaultProps = {
	className: "",

	disabled: false,
	text: "submit",
	name: "submit",
	type: "submit",
	value: "",
	handleClick: () => {},
};

function MyButton(props) {
	const {className, text, name, type, disabled, value, handleClick} = props;
	return (
		<button
			className={`my-button ${className}${
				disabled ? " my-button--disable" : ""
			}`}
			mame={name}
			value={value}
			type={type}
			disabled={disabled}
			onClick={handleClick}
		>
			<span className="my-button__text">{text}</span>
			{disabled && <LoadIcon />}
		</button>
	);
}

export default MyButton;
