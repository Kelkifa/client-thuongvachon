import "./docForm.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";

import DocInputField from "./DocInputField";
import MyButton from "components/MyButton/MyButton";
import PropTypes from "prop-types";
import React from "react";
import {docCreate} from "../docSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";

DocForm.propTypes = {
	type: PropTypes.object,
};

DocForm.defaultProps = {
	type: null,
};

const schema = yup.object().shape({
	title: yup.string().required("This field is required"),
	type: yup.string().required("This field is required"),
	content: yup.string().required("This field is required"),
});

function DocForm(props) {
	const dispatch = useDispatch();

	// PROPS
	const {type} = props;
	console.log(`[type]`, type);
	// STATES
	const [notifice, setNotifice] = useState({
		isProcessing: false,
		message: null,
		error: false,
	});

	const initialValues = {
		title: "",
		type: type ? type.type : "",
		content: "",
	};

	const handleSubmit = async values => {
		// console.log(`[values]`, values);
		try {
			setNotifice({...notifice, isProcessing: true});
			const response = await dispatch(
				docCreate({data: {...values, type: type ? type.type : values.type}})
			);
			setNotifice({...notifice, isProcessing: false});
			// console.log(response);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="doc-form">
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={handleSubmit}
			>
				{formikProps => {
					const {values, handleSubmit, setFieldValue} = formikProps;
					// console.log(`[values]`, values);
					return (
						<form className="doc-form__form" onSubmit={handleSubmit}>
							<h3 className="doc-form__form__title">
								{type ? `Tạo nội dung cho ${type.type}` : "Tạo tài liệu"}
							</h3>

							{!type && (
								<FastField
									name="type"
									inputType="input"
									label="Tên tài liệu"
									component={DocInputField}
								/>
							)}
							<FastField
								name="title"
								inputType="input"
								label="Tiêu đề"
								component={DocInputField}
							/>

							<FastField
								name="content"
								inputType="textarea"
								label="Nội dung"
								component={DocInputField}
							/>
							<div className="doc-form__form__btn">
								<MyButton />
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default DocForm;
