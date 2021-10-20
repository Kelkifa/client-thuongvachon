import "./docInputField.scss";

import PropTypes from "prop-types";
import React from "react";
import TextEditor from "components/TextEditor/TextEditor";

DocInputField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	inputType: PropTypes.string,
	disabled: PropTypes.bool,
};

DocInputField.defaultProps = {
	label: "",
	placeholder: "",
	inputType: "input", // $in: ['input', texteditor]
	disabled: false,
};

function DocInputField(props) {
	const {form, field, label, placeholder, inputType, disabled} = props;

	return (
		<div className="doc-input-field">
			{label && <label className="doc-input-field__label">{label}</label>}
			{inputType === "texteditor" ? (
				<TextEditor
					name={field.name}
					setContents={field.value}
					onChange={field.onChange}
					onBlur={field.onBlur}
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
					disabled={disabled}
				/>
			)}
			{form.errors[field.name] && form.touched[field.name] && (
				<div className="doc-input-field__error">{form.errors[field.name]}</div>
			)}
		</div>
	);
}

export default DocInputField;
