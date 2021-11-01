import "./GroupCreatePage.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";

import MyButton from "components/MyButton/MyButton";
import PageInputField from "components/Form/PageInputField";
import PageTextareaField from "components/Form/PageTextareaField";
import React from "react";
import {useDispatch} from "react-redux";

const schema = yup.object().shape({
	name: yup.string().required("Bạn chưa nhập tên"),
	users: yup.string(),
});

function GroupCreatePage(props) {
	const dispatch = useDispatch();

	const initialValues = {
		name: "",
		users: "",
	};

	const handleSubmit = async values => {
		const {name, users} = values;

		const userArr = users.replace(" ", "").replace("\n", "").split(",");
		console.log([`userArr`], userArr);
	};

	return (
		<div className="mform">
			<h3 className="mform__title">Tạo nhóm</h3>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={schema}
			>
				{formikProps => {
					const {handleSubmit} = formikProps;
					return (
						<form onSubmit={handleSubmit} className="group-create-page__form">
							<FastField
								name="name"
								label="Tên nhóm"
								placeholder="Nhập tên nhóm ..."
								component={PageInputField}
							/>
							<FastField
								name="users"
								label="Các thành viên"
								rows={5}
								placeholder="username1, username 2, ... "
								component={PageTextareaField}
							/>
							<div className="mform__field__btn-container">
								<MyButton text="Tạo nhóm" type="submit" />
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default GroupCreatePage;
