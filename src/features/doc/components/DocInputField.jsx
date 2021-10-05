import "./docInputField.scss";

import PropTypes from "prop-types";
import React from "react";

DocInputField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	inputType: PropTypes.string,
};

DocInputField.defaultProps = {
	label: "",
	placeholder: "",
	inputType: "input",
};

function DocInputField(props) {
	const {form, field, label, placeholder, inputType} = props;

	return (
		<div className="doc-input-field">
			{label && <label>{label}</label>}
			{inputType === "textarea" ? (
				<textarea
					className="doc-input-field__input"
					name={field.name}
					value={field.value}
					type="text"
					placeholder={placeholder}
					onChange={field.onChange}
					onBlur={field.onBlur}
					rows="6"
				/>
			) : (
				<input
					className="doc-input-field__input"
					name={field.name}
					value={field.value}
					type="text"
					placeholder={placeholder}
					onChange={field.onChange}
					onBlur={field.onBlur}
				/>
			)}
		</div>
	);
}

export default DocInputField;
