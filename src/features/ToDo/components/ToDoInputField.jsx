import "./todoInputField.scss";

import {getFirstLastDay, randomNoteColor} from "./coreCalendar";

import PropTypes from "prop-types";
import React from "react";

ToDoInputField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	className: PropTypes.string,
	label: PropTypes.string,
	placeHolder: PropTypes.string,
	type: PropTypes.string,
	handleChangeEventColor: PropTypes.func,
};

ToDoInputField.defaultProps = {
	className: "",
	label: "",
	placeHolder: "",
	type: "text",
	handleChangeEventColor: null,
};
function ToDoInputField(props) {
	const {
		className,
		handleChangeEventColor,
		label,
		placeHolder,
		form,
		field,
		type,
	} = props;
	const handleChange = e => {
		const value = e.target.value;
		if (type === "time") {
			const hour = value.slice(0, 2);
			const minute = value.slice(2, 5).replace(":", "");

			const processedHour = parseInt(hour) > 23 ? "23" : hour;
			const processedMinute = parseInt(minute) > 59 ? "59" : minute;

			if (!minute) {
				field.onChange({
					target: {
						name: field.name,
						value: processedHour,
					},
				});
				return;
			}

			field.onChange({
				target: {
					name: field.name,
					value: `${processedHour}:${processedMinute}`,
				},
			});
			return;
		}
		if (type === "date") {
			const day = value.slice(0, 2);
			const month = value.slice(2, 5).replace("/", "");
			const year = value.slice(5, 10).replace("/", "");

			const processedDay = parseInt(day) > 32 ? "30" : day;
			const processedMonth = parseInt(month) > 12 ? "12" : month;
			if (!month) {
				field.onChange({target: {name: field.name, value: day}});
				return;
			}
			if (!year) {
				field.onChange({
					target: {
						name: field.name,
						value: `${processedDay}/${processedMonth}`,
					},
				});
				return;
			}
			if (handleChangeEventColor) {
				handleChangeEventColor(
					value,
					form.errors[field.name],
					form.setFieldValue
				);
			}
			field.onChange({
				target: {
					name: field.name,
					value: `${processedDay}/${processedMonth}/${year}`,
				},
			});
			return;
		}

		field.onChange({target: {name: field.name, value}});
	};
	return (
		<div className={`todo-input-field ${className}`}>
			<label className="todo-input-field__label">{label}</label>
			<input
				className="todo-input-field__input"
				name={field.name}
				onChange={handleChange}
				onBlur={field.onBlur}
				placeholder={placeHolder}
				value={field.value}
				type="text"
				autoComplete="off"
			/>
		</div>
	);
}

export default ToDoInputField;
