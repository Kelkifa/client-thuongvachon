import "./docForm.scss";

import {FastField, Formik} from "formik";

import DocInputField from "./DocInputField";
import PropTypes from "prop-types";
import React from "react";

DocForm.propTypes = {};

function DocForm(props) {
	const initialValues = {title: "", content: ""};
	return (
		<div className="doc-form">
			<Formik initialValues={initialValues}>
				{formikProps => {
					const {values} = formikProps;
					console.log(`[values]`, values);
					return (
						<form className="doc-form__form">
							<h3 className="doc-form__form__title">Tạo tài liệu</h3>
							<FastField
								name="title"
								inputType="input"
								label="Lại tài liệu"
								component={DocInputField}
							/>
							<FastField
								name="content"
								inputType="textarea"
								label="Nội dung"
								component={DocInputField}
							/>
							<div className="doc-form__form__btn">
								<button type="submit">Submit</button>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default DocForm;
