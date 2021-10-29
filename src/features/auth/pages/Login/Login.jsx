import * as yup from "yup";

import {FastField, Formik} from "formik";

import AuthInputField from "features/auth/components/AuthInputField";
import MyButton from "components/MyButton/MyButton";
import Notifice from "components/Notifice/Notifice";
import React from "react";
import {authLogin} from "features/auth/authSlice";
import {handleNotificeWithResponse} from "assets/core/core";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {useState} from "react";

// import {useHistory} from "react-router";

const schema = yup.object().shape({
	username: yup.string().required("This field is required"),
	password: yup.string().required("This field is required"),
});

function Login(props) {
	// useHistory to go to home page when log success
	const history = useHistory();

	// useDispatch for login
	const dispatch = useDispatch();

	/** useState */
	// Handle notifice
	const [notifice, setNotifice] = useState({
		isProcessing: false,
		error: undefined,
	});

	const initialValues = {
		username: "",
		password: "",
	};

	/** Handle Functions */
	// Submit
	const handleSubmit = async values => {
		await handleNotificeWithResponse(
			setNotifice,
			dispatch,
			authLogin(values),
			() => {
				setTimeout(() => {
					history.push("/");
				}, 1500);
			}
		);
	};

	// Render
	return (
		<div className="auth__form">
			<h2 className="auth__form__header">Đăng nhập</h2>
			<Notifice.ProcessNotifice
				text="Đăng nhập thành công"
				notifice={notifice}
				successText="Đang nhập thành công"
			/>
			<Formik
				onSubmit={handleSubmit}
				initialValues={initialValues}
				validationSchema={schema}
			>
				{formikProps => {
					const {handleSubmit} = formikProps;

					return (
						<form onSubmit={handleSubmit}>
							<FastField
								component={AuthInputField}
								name="username"
								label="Tài khoản"
								placeholder="username"
							/>
							<FastField
								component={AuthInputField}
								name="password"
								label="Mật khẩu"
								placeholder="Password"
								type="password"
							/>
							<div>
								<MyButton
									disabled={notifice.isProcessing || notifice.error === false}
									type="submit"
									text="Đăng nhập"
									className="auth__form__btn"
								/>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default Login;
