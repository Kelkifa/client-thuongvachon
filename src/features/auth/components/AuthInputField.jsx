import "./authInputField.scss";

import PropTypes from "prop-types";
import React from "react";

AuthInputField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	label: PropTypes.string,

	// Input Props
	placeholder: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
};

AuthInputField.defaultProps = {
	label: undefined,
	placeholder: undefined,
	type: "text",
	disabled: false,
};

function AuthInputField({form, field, label, ...inputProps}) {
	return (
		<div className="auth-input-field">
			{label && <label>{label}</label>}
			<input
				name={field.name}
				onChange={field.onChange}
				onBlur={field.onBlur}
				className="auth-input-field__input"
				{...inputProps}
			/>
			{form.errors[field.name] && form.touched[field.name] && (
				<div className="auth-input-field__error">{form.errors[field.name]}</div>
			)}
		</div>
	);
}

export default AuthInputField;
