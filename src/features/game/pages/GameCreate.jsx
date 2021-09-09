import "features/admin/components/adminCreate.scss";
import "assets/scss/components/btn.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";
import React, {useState} from "react";

import AdminNotifice from "features/admin/components/AdminNotifice";
import InputField from "components/Form/InputField";
import {gameCreate} from "../gameSlice";
import {useDispatch} from "react-redux";

// import LoadNotifice from "components/Dialog/LoadNotifice";




const schema = yup.object().shape({
	data: yup.string().required("This field is required"),
	type: yup.string().oneOf(["image", "video"]).required(""),
});

function GameCreate(props) {
	const dispatch = useDispatch();
	const [notifice, setNotifice] = useState({
		loading: false,
		error: null,
		message: null,
		isShow: false,
	});

	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		setNotifice({
			loading: true,
			error: null,
			message: null,
			isShow: false,
		});

		const newGame = {data: values.data.split("\n"), type: values.type};
		try {
			const response = await dispatch(gameCreate({data: newGame}));

			if (!response.payload.success) {
				setNotifice({
					isShow: true,
					loading: false,
					error: true,
					message: response.payload.message,
				});
			}

			setNotifice({
				isShow: true,
				loading: false,
				error: false,
				message: `${
					values.type == "image"
						? "Thêm hình ảnh thành công"
						: "Thêm video thành công"
				}`,
			});
		} catch (error) {
			console.log(error);
			setNotifice({
				isShow: true,
				loading: false,
				error: true,
				message: error.message,
			});
		}
	};

	return (
		<div className="admin-create">
			<AdminNotifice
				className="admin-layout-fluid admin-create__notifice"
				notificeInfo={notifice}
			/>
			<div className="admin-layout-fluid admin-create__content">
				<h3 className="admin-create__content__header">Create Game Image</h3>

				<Formik
					initialValues={{imgs: "", type: "image"}}
					validationSchema={schema}
					onSubmit={handleSubmit}
				>
					{formikProps => {
						const {
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
							setFieldValue,
						} = formikProps;

						return (
							<form
								onSubmit={handleSubmit}
								className="grid admin-create__content__form"
							>
								<FastField
									name="type"
									label="type"
									inputEle="select"
									options={[
										{value: "image", label: "Image"},
										{value: "video", label: "Video"},
									]}
									component={InputField}
								/>
								<FastField
									className=""
									name="data"
									placeholder="Data 1&#10;Data 2&#10; ..."
									label="Data"
									component={InputField}
									inputEle="textarea"
								/>
								<div className="row admin-create__content__form__btn">
									<button
										className="btn-auth admin-create__form__btn"
										type="submit"
									>
										Submit
									</button>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}

export default GameCreate;
