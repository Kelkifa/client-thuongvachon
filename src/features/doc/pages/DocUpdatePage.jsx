import {FastField, Formik} from "formik";
import {defaultNotifice, handleNotificeWithResponse} from "assets/core/core";

import BackButton from "components/MyButton/BackButton";
import MyButton from "components/MyButton/MyButton";
import PageInputField from "components/Form/PageInputField";
import {ProcessNotifice} from "components/Notifice/Notifice";
import PropTypes from "prop-types";
import React from "react";
import {docUpdateDoc} from "../docSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";

DocUpdatePage.propTypes = {
	docId: PropTypes.string,
	docName: PropTypes.string,
};
DocUpdatePage.defaultProps = {
	docId: "",
	docName: "",
};

function DocUpdatePage({docId, docName}) {
	const dispatch = useDispatch();

	const initialValues = {
		name: docName,
	};
	const [notifice, setNotifice] = useState(defaultNotifice);

	const handleSubmit = async values => {
		const {name} = values;

		await handleNotificeWithResponse(
			setNotifice,
			dispatch,
			docUpdateDoc({docId, name}, undefined)
		);
	};

	if (!docId || !docName) return;
	return (
		<div className="mform doc-update-page">
			<BackButton />
			<h2 className="mform__title">Cập nhật tài liệu</h2>
			<ProcessNotifice
				successText="Cập nhật tên tài liệu thành công"
				notifice={notifice}
			/>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{formikProps => {
					const {handleSubmit} = formikProps;

					return (
						<form className="mform__form" onSubmit={handleSubmit}>
							<FastField
								name="name"
								label="Tên tài liệu"
								placeholder="Nhập tên tài liệu"
								component={PageInputField}
							/>
							<div className="mform__form__btn-container">
								<MyButton text="Cập nhật" disabled={notifice.isProcessing} />
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default DocUpdatePage;
