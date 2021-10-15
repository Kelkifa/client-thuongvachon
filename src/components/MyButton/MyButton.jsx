import "./myButton.scss";

import LoadIcon from "components/LoadIcon";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

MyButton.propTypes = {
	className: PropTypes.string,

	disabled: PropTypes.bool,
	text: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func,
};

MyButton.defaultProps = {
	className: "",

	disabled: false,
	text: "submit",
	name: "submit",
	type: "submit",
	value: "",
	onClick: null,
};

function MyButton(props) {
	const {text, className, name, type, disabled, value, onClick} = props;

	const [isLoading, setIsLoading] = useState(false);

	const btnClickHandler = async () => {
		if (onClick === null) return;
		setIsLoading(true);
		await onClick();
		setIsLoading(false);
	};
	return (
		<>
			{type === "submit" ? (
				<button
					className={`my-button ${className}${
						disabled ? " my-button--disable" : ""
					}`}
					mame={name}
					value={value}
					type={type}
					disabled={disabled}
					onClick={onClick}
				>
					<span className="my-button__text">{text}</span>
					{disabled && <LoadIcon />}
				</button>
			) : (
				<div
					className={`my-button-link ${className}${
						disabled || isLoading ? " my-button-link--disable" : ""
					}`}
					onClick={btnClickHandler}
				>
					{text}
					{(disabled || isLoading) && <LoadIcon />}
				</div>
			)}
		</>
	);
}

export default MyButton;
