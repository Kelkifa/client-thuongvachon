import * as yup from "yup";

import {FastField, Formik} from "formik";

import AuthInputField from "features/auth/components/AuthInputField";
import MyButton from "components/MyButton/MyButton";
import {ProcessNotifice} from "components/Notifice/Notifice";
import React from "react";
import {authRegister} from "features/auth/authSlice";
import {handleNotificeWithResponse} from "assets/core/core";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {useState} from "react";

const schema = yup.object().shape({
	fullname: yup.string().required("This field is required"),
	username: yup
		.string()
		.max(20, "Tài khoản phải từ 4 đến 20")
		.min(4, "Tài khoản phải từ 4 đến 20")
		.required("This field is required"),
	password: yup
		.string()
		.max(20, "Mật khẩu phải từ 0 đến 20")
		.min(6, "Mật khẩu phải từ 0 đến 20")
		.matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
		.required("This field is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không chính xác"),
});

function Register(props) {
	// useHistory to go home page if registe success
	const history = useHistory();

	// useDispatch to send register data to server
	const dispatch = useDispatch();

	// useState
	const [notifice, setNotifice] = useState({
		isProcessing: false,
		error: undefined,
	});

	const initialValues = {
		fullname: "",
		username: "",
		password: "",
		confirmPassword: "",
	};

	/** Handle Functions */
	// Submit
	const handleSubmit = async values => {
		await handleNotificeWithResponse(
			setNotifice,
			dispatch,
			authRegister(values),
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
			<h2 className="auth__form__header">Đăng ký</h2>
			<ProcessNotifice
				text="Đăng nhập thành công"
				notifice={notifice}
				successText="Tạo tài khoản thành công"
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
								name="fullname"
								label="Họ và tên"
								placeholder="Họ và tên"
							/>
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
							<FastField
								component={AuthInputField}
								name="confirmPassword"
								label="Nhập lại mật khẩu"
								placeholder="Xác nhận lại mật khẩu"
								type="password"
							/>
							<div>
								<MyButton
									type="submit"
									text="Đăng ký"
									className="auth__form__btn"
									disabled={notifice.isProcessing || notifice.error === false}
								/>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default Register;
