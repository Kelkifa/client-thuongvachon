import "./docForm.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";

import DocInputField from "./DocInputField";
import MyButton from "components/MyButton/MyButton";
import PropTypes from "prop-types";
import React from "react";
import {docUpdateContent} from "../docSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";

// import LoadIcon from "components/LoadIcon";

DocFormUpdate.propTypes = {
	content: PropTypes.object,
	isDataLoading: PropTypes.bool,
	gotoElement: PropTypes.object,

	setNotifice:
		PropTypes.func /** inputSchema: {isProcessed: boolean, type: {$in: ["success", "err message"] } } */,
};
DocFormUpdate.defaultProps = {
	content: undefined,

	gotoElement: null,

	setNotifice: undefined,
};

const schema = yup.object().shape({
	title: yup.string().required("This field is required"),
	typeId: yup.string().required("This field is required"),
	content: yup.string().required("This field is required"),
});

function DocFormUpdate({content, setNotifice, gotoElement}) {
	// console.log(`[gotoElement]`, gotoElement);
	// useState
	const [isLoading, setIsLoading] = useState(false);

	// useDispatch
	const dispatch = useDispatch();
	// useState
	const initialValues = {
		_id: content._id,
		title: content.title,
		content: content.content,
		typeId: content.typeId,
	};

	const handleSubmit = async values => {
		setIsLoading(true);
		try {
			const response = await dispatch(docUpdateContent(values));

			gotoElement.current.scrollIntoView();

			setIsLoading(false);

			if (!setNotifice) return;

			if (!response.payload.success) {
				setNotifice({isProcessed: true, type: response.payload.message});
				return;
			}

			setNotifice({isProcessed: true, type: "success"});
		} catch (err) {
			console.log(`[UPDATE DOC CONTENT ERR]`, err);
			setIsLoading(false);
			gotoElement.current.scrollIntoView();

			if (!setNotifice) return;

			setNotifice({isProcessed: true, type: err.message});
		}
		/** SUBMIT */
	};

	return (
		<div className="doc-form">
			<Formik
				onSubmit={handleSubmit}
				initialValues={initialValues}
				validationSchema={schema}
			>
				{formikProps => {
					const {handleSubmit, handleClick} = formikProps;
					return (
						<form className="doc-form__form" onSubmit={handleSubmit}>
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
								<MyButton
									type="submit"
									name="type"
									value="React Native"
									handleClick={handleClick}
									disabled={isLoading}
								/>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default DocFormUpdate;
