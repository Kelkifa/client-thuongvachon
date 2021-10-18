import "./docForm.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";
import {docCreateContent, docCreateDoc} from "../docSlice";

import DivButton from "components/MyButton/DivButton";
import DocInputField from "./DocInputField";
import LoadIcon from "components/LoadIcon";
import MyButton from "components/MyButton/MyButton";
import PropTypes from "prop-types";
import React from "react";
import {useDispatch} from "react-redux";
import {useState} from "react";

DocFormCreate.propTypes = {
	isDataLoading: PropTypes.bool,
	type: PropTypes.object,
	handleCancel: PropTypes.func,
};

DocFormCreate.defaultProps = {
	isDataLoading: false,
	type: null,
	handleCancel: () => {},
};

function DocFormCreate({type, isDataLoading, handleCancel}) {
	const dispatch = useDispatch();

	// useState
	const [notifice, setNotifice] = useState({
		isProcessing: false,
		message: null,
		error: false,
	});

	const initialValues = {
		title: "",
		type: "",
		content: "",
	};

	const schema = yup.object().shape({
		title: yup.string().required("This field is required"),
		type: type ? yup.string() : yup.string().required("This field is required"),
		content: yup.string().required("This field is required"),
	});

	// HANDLE FUNCTIONS
	// Submit
	const handleSubmit = async values => {
		console.log(`[submit]`, values);
		try {
			setNotifice({...notifice, isProcessing: true});

			// Create new doc
			if (type === null) {
				// const response = await
				const response = await dispatch(docCreateDoc({...values}));
				console.log(response);
			}
			// Create new Content of doc
			else {
				const response = await dispatch(
					docCreateContent({...values, type: type._id})
				);
				console.log(response);
			}

			setNotifice({...notifice, isProcessing: false});
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
					const {handleSubmit, handleClick} = formikProps;

					// console.log(`[values]`, values);
					// console.log(`[errors]`, errors);

					// console.log(`[errors]`, errors);
					return (
						<form className="doc-form__form" onSubmit={handleSubmit}>
							<h3 className="doc-form__form__title">
								{type ? `Tạo nội dung cho ${type.type}` : "Tạo tài liệu"}{" "}
								{isDataLoading && (
									<div className="doc-form__form__title__notifice">
										(
										<span className="doc-form__form__title__notifice__text">
											Đang tải dữ liệu{" "}
										</span>{" "}
										<LoadIcon />)
									</div>
								)}
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
								<DivButton text="Cancel" onClick={handleCancel} />
								<MyButton
									type="submit"
									name="type"
									value="React Native"
									handleClick={handleClick}
									disabled={notifice.isProcessing || isDataLoading}
								/>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default DocFormCreate;
