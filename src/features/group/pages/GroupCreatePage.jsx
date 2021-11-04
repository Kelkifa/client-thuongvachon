import "./GroupCreatePage.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";

import BackButton from "components/MyButton/BackButton";
import MyButton from "components/MyButton/MyButton";
import PageInputField from "components/Form/PageInputField";
import PageTextareaField from "components/Form/PageTextareaField";
import {ProcessNotifice} from "components/Notifice/Notifice";
import React from "react";
import {groupCreate} from "../groupSlice";
import {handleNotificeWithResponse} from "assets/core/core";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {useState} from "react";

const schema = yup.object().shape({
	name: yup.string().required("Bạn chưa nhập tên"),
	users: yup.string(),
});

function GroupCreatePage(props) {
	const history = useHistory();

	const dispatch = useDispatch();

	const [notifice, setNotifice] = useState({
		isProcessing: false,
		error: undefined,
	});

	const initialValues = {
		name: "",
		usernames: "",
	};

	const handleSubmit = async values => {
		const {name, usernames} = values;
		try {
			const usernameArr = usernames
				.replace(" ", "")
				.replace("\n", "")
				.split(",");
			await handleNotificeWithResponse(
				setNotifice,
				dispatch,
				groupCreate({name, usernames: usernameArr})
			);
		} catch (err) {
			console.log(`[Client err]`, err);
		}
	};

	return (
		<div className="mform">
			<BackButton />
			<h3 className="mform__title">Tạo nhóm</h3>
			<ProcessNotifice notifice={notifice} successText="Tạo nhóm thành công" />
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
								name="usernames"
								label="Các thành viên"
								rows={5}
								placeholder="username1, username 2, ... "
								component={PageTextareaField}
							/>
							<div className="mform__form__btn-container">
								<MyButton
									text="Quay lại"
									type="cancel"
									onClick={() => {
										history.goBack();
									}}
								/>
								<MyButton
									text="Tạo nhóm"
									type="submit"
									disabled={notifice.isProcessing}
								/>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default GroupCreatePage;
