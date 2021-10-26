import * as yup from "yup";

import {FastField, Formik} from "formik";

import AuthInputField from "features/auth/components/AuthInputField";
import MyButton from "components/MyButton/MyButton";
import React from "react";
import {authRegister} from "features/auth/authSlice";
import {useDispatch} from "react-redux";

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
	const dispatch = useDispatch();

	const initialValues = {
		fullname: "",
		username: "",
		password: "",
		confirmPassword: "",
	};

	/** Handle Functions */
	// Submit
	const handleSubmit = async values => {
		try {
			const response = await dispatch(authRegister(values));
			console.log(response);
		} catch (err) {
			console.log(`[register submit err]`, err);
		}
	};

	// Render
	return (
		<div className="auth__login">
			<h2 className="auth__form__header">Đăng ký</h2>
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
