import "./todoForm.scss";

import {FastField, Field, Formik} from "formik";
import {getFirstLastDay, randomNoteColor} from "./coreCalendar";
import {useDispatch, useSelector} from "react-redux";

import MyButton from "components/MyButton/MyButton";
import PropTypes from "prop-types";
import React from "react";
import ToDoInputField from "./ToDoInputField";
import TodoFormError from "./TodoFormError";
import {todoCreate} from "../todoSlice";
import {useState} from "react";

// import LoadIcon from "components/LoadIcon";

// import {RiContactsBookUploadFill} from "react-icons/ri";

ToDoForm.propTypes = {
	noteList: PropTypes.array,
	className: PropTypes.string,

	calendarId: PropTypes.string,

	handleChangeValue: PropTypes.object,
	setHandleChangeValue: PropTypes.func,
};

ToDoForm.defaultProps = {
	noteList: [],
	className: "",

	calendarId: undefined,

	handleChangeValue: {},
	setHandleChangeValue: () => {},
};

function ToDoForm({
	noteList,
	className,
	calendarId,
	handleChangeValue,
	setHandleChangeValue,
}) {
	const dispatch = useDispatch();

	const groupId = useSelector(state => state.groups.selectedGroup._id);

	const initialValues = {
		content: "",
		from: "",
		to: "",
		startTime: "",
		endTime: "",
		color: "transparent",
	};

	// STATES
	const [notifice, setNotifice] = useState({
		isProcessing: false,
		message: "",
		error: false,
	});

	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		const [startDay, startMonth, startYear] = values.from.split("/");

		const [endDay, endMonth, endYear] = values.to.split("/");

		const startTime = values.startTime.split(":");
		const endTime = values.endTime.split(":");
		// {
		// 	date: parseInt(endDay),
		// 	month: parseInt(endMonth),
		// 	year: parseInt(endYear),
		// }
		const data = {
			from: new Date(
				startYear,
				startMonth - 1,
				startDay,
				startTime[0],
				startTime[1]
			).toISOString(),
			to: new Date(
				endYear,
				endMonth - 1,
				endDay,
				endTime[0],
				endTime[1]
			).toISOString(),
			title: values.content,
			color: values.color,
		};
		try {
			setNotifice({...notifice, isProcessing: true});
			await dispatch(todoCreate({data, groupId}));
			setNotifice({...notifice, isProcessing: false});
		} catch (err) {
			console.log(err);
		}
	};

	const validateDate = value => {
		const [day, month, year] = value.split("/");

		if (!day || !month || !year)
			return "Thiếu thông tin ngày, tháng hoặc năm (dd/mm/yyyy)";

		if (isNaN(day) || isNaN(month) || isNaN(year))
			return `Ngày tháng hoặc năm chứa ký tự`;

		const lastDay = getFirstLastDay(
			new Date(year, month - 1, 1),
			"last"
		).getDate();
		if (day < 1 || month < 1) {
			return "Ngày và tháng phải lớn hơn 0";
		}
		if (parseInt(day) > lastDay) return "Ngày không hợp lệ";
		if (parseInt(month) > 12) return "Tháng phải nhỏ hơn 12 và lớn hơn 0";
		return null;
	};

	const validateTime = (value, type) => {
		const [hour, minute] = value.split(":");
		if (!hour || !minute) return "Thiếu thông tin giờ hoặc phút";
		if (isNaN(hour) || isNaN(minute)) return "Giờ hoặc phút chứa ký tự";

		const parsedHour = parseInt(hour, 10);
		const parsedMinute = parseInt(minute, 10);
		if (
			parsedHour < 0 ||
			parsedHour > 23 ||
			parsedMinute < 0 ||
			parsedMinute > 59
		)
			return "Thời gian không hợp lệ";
		return null;
	};

	const handleChangeEventColor = (value, error, setFieldValue) => {
		const [month, year] = value.split("/");

		if (error) {
			setFieldValue("color", "transparent");
			return;
		}
		const firstDate = getFirstLastDay(new Date(year, month - 1, 1), "first");
		const lastDate = getFirstLastDay(new Date(year, month - 1, 1), "last");
		const notesInMonth = noteList.filter(
			value => value.from <= lastDate && value.to >= firstDate
		);
		const newColor = randomNoteColor(
			false,
			notesInMonth.map(value => value.color),
			null,
			0.5
		);

		setFieldValue("color", newColor);
	};
	// RENDER
	return (
		<div className={`todo-form ${className}`}>
			<h3 className="todo-form__title">Tạo sự kiện</h3>
			<Formik onSubmit={handleSubmit} initialValues={initialValues}>
				{formikProps => {
					const {
						handleSubmit,
						errors,
						touched,
						values,
						setFieldValue,
						// setFieldError,
					} = formikProps;

					return (
						<form onSubmit={handleSubmit} className="todo-form__form grid">
							<div className="row">
								<FastField
									name="content"
									label="Tiêu đề"
									className="todo-form__form__input c-12"
									placeHolder="Nội dung..."
									component={ToDoInputField}
									type="text"
									validate={value => (!value ? "This field is required" : null)}
								/>
								{errors.content && touched.content && (
									<div className="c-12 todo-form__form__error">
										{errors.content}
									</div>
								)}
							</div>
							<div className="row">
								<Field
									name="from"
									label="Bắt đầu"
									className="todo-form__form__input c-9"
									component={ToDoInputField}
									placeHolder="dd/mm/yyyy"
									type="date"
									chooseGoto={() => {
										if (!calendarId) return;

										document.getElementById(calendarId).scrollIntoView();
									}}
									handleChangeValue={handleChangeValue}
									setHandleChangeValue={setHandleChangeValue}
									handleChangeEventColor={handleChangeEventColor}
									validate={validateDate}
								/>
								<FastField
									name="startTime"
									label="Thời gian"
									className="todo-form__form__input c-3"
									component={ToDoInputField}
									placeHolder="hh:mm"
									type="time"
									validate={value => {
										return validateTime(value, "startTime");
									}}
								/>

								<TodoFormError
									errorDate={errors.from}
									touchedData={touched.from}
									errorTime={errors.startTime}
									touchedTime={touched.startTime}
								/>
							</div>
							<div className="row">
								<Field
									name="to"
									label="Kết thúc"
									className="todo-form__form__input c-9"
									component={ToDoInputField}
									placeHolder="dd/mm/yyyy"
									type="date"
									validate={validateDate}
									chooseGoto={() => {
										if (!calendarId) return;

										document.getElementById(calendarId).scrollIntoView();
									}}
									handleChangeValue={handleChangeValue}
									setHandleChangeValue={setHandleChangeValue}
								/>
								<FastField
									name="endTime"
									label="Thời gian"
									className="todo-form__form__input c-3"
									component={ToDoInputField}
									placeHolder="hh:mm"
									type="time"
									validate={value => {
										return validateTime(value, "endTime");
									}}
								/>

								<TodoFormError
									errorDate={errors.to}
									touchedData={touched.to}
									errorTime={errors.endTime}
									touchedTime={touched.endTime}
								/>
							</div>
							<div className="row todo-form__form__color-field">
								<div className="c-5">Màu sự kiện</div>
								<div
									className="c-7 todo-form__form__color-field__color"
									style={{backgroundColor: values.color}}
									onClick={() => {
										handleChangeEventColor(
											values.from,
											errors.from,
											setFieldValue
										);
									}}
								>
									Nhấn để thay đổi
								</div>
							</div>

							<MyButton disabled={notifice.isProcessing} type="submit" />
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default ToDoForm;
