import "./todoInputField.scss";

import PropTypes from "prop-types";
import React from "react";
import ReactTooltip from "react-tooltip";

ToDoInputField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	className: PropTypes.string,
	label: PropTypes.string,
	placeHolder: PropTypes.string,
	type: PropTypes.string,

	chooseGoto: PropTypes.func,

	handleChangeEventColor: PropTypes.func,

	handleChangeValue: PropTypes.object, // {name: String, handle: Func}
	setHandleChangeValue: PropTypes.func,
};

ToDoInputField.defaultProps = {
	className: "",
	label: "",
	placeHolder: "",
	type: "text",

	chooseGoto: undefined,

	handleChangeEventColor: null,

	handleChangeValue: {},
	setHandleChangeValue: () => {},
};
function ToDoInputField(props) {
	const {
		className,
		label,
		placeHolder,
		form,
		field,
		type,
		chooseGoto,
		handleChangeEventColor,
		handleChangeValue,
		setHandleChangeValue,
	} = props;

	// console.log("[activedBtn]", activedBtn);
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
			<div className="todo-input-field__container">
				<input
					className="todo-input-field__container__input"
					name={field.name}
					onChange={handleChange}
					onBlur={field.onBlur}
					placeholder={placeHolder}
					value={field.value}
					type="text"
					autoComplete="off"
				/>
				{type === "date" && (
					<div
						className={
							handleChangeValue.name === field.name
								? "todo-input-field__container__btn todo-input-field__container__btn--active"
								: "todo-input-field__container__btn"
						}
						onClick={() => {
							if (field.name === handleChangeValue.name) {
								setHandleChangeValue({});
								return;
							}
							const value = {
								name: field.name,
								handle: form.setFieldValue,
								handleColor: handleChangeEventColor,
							};
							setHandleChangeValue(value);

							chooseGoto && chooseGoto();
						}}
						data-tip="chọn ngày trên lịch"
					>
						<ReactTooltip
							type="light"
							place="bottom"
							backgroundColor="rgba(241, 238, 179, 0.836)"
						/>
						Choose
					</div>
				)}
			</div>
		</div>
	);
}

export default ToDoInputField;
