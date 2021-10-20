import "./docForm.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";
import {docCreateContent, docCreateDoc} from "../docSlice";

import DocInputField from "./DocInputField";
import DocShowNotifice from "./DocShowNotifice";
import LoadIcon from "components/LoadIcon";
import MyButton from "components/MyButton/MyButton";
import PropTypes from "prop-types";
import React from "react";
import {changeNotifice} from "assets/core/core";
import {useDispatch} from "react-redux";
import {useRef} from "react";
import {useState} from "react";

// import DivButton from "components/MyButton/DivButton";

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
	// useRef
	const titleRef = useRef();

	// useDispatch
	const dispatch = useDispatch();

	// useState
	const [notifice, setNotifice] = useState({
		isProcessing: false,
		error: undefined,
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
		try {
			setNotifice({...notifice, isProcessing: true});

			let response = null;
			// Create new doc
			if (type === null) {
				// const response = await
				response = await dispatch(docCreateDoc({...values}));
			}
			// Create new Content of doc
			else {
				response = await dispatch(
					docCreateContent({...values, type: type._id})
				);
			}

			if (!response.payload.success) {
				setNotifice(changeNotifice.setError(response.payload.message));
				return;
			}
			titleRef.current.scrollIntoView();
			setNotifice(changeNotifice.setSuccess());
		} catch (err) {
			titleRef.current.scrollIntoView();
			setNotifice(changeNotifice.setError(err.message));
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
					const {handleSubmit} = formikProps;

					return (
						<form className="doc-form__form" onSubmit={handleSubmit}>
							<h3 className="doc-form__form__title" ref={titleRef}>
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

							<DocShowNotifice
								notifice={notifice}
								successText={`Tạo ${
									type === null ? "tài liệu" : "nội dung"
								} thành công`}
							/>

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
								inputType="texteditor"
								label="Nội dung"
								component={DocInputField}
							/>
							<div className="doc-form__form__btn">
								<MyButton text="Cancel" onClick={handleCancel} />
								<MyButton
									type="submit"
									name="type"
									value="React Native"
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
