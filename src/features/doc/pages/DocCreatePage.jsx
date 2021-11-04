import * as yup from "yup";

import {FastField, Formik} from "formik";

import BackButton from "components/MyButton/BackButton";
import MyButton from "components/MyButton/MyButton";
import PageInputField from "components/Form/PageInputField";
import PageTexteditorField from "components/Form/PageTexteditorField";
import {ProcessNotifice} from "components/Notifice/Notifice";
import React from "react";
import {docCreate} from "../docSlice";
import {handleNotificeWithResponse} from "assets/core/core";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import {useState} from "react";

const schema = yup.object().shape({
	name: yup.string().required("Bạn chưa điền tên tài liệu"),
	title: yup.string().required("Bạn chưa điền tiêu đề"),
	content: yup.string().required("Bạn chưa điền nội dung"),
});

function DocCreatePage(props) {
	const dispatch = useDispatch();

	const params = useParams();
	const {groupId} = params;

	const initialValues = {
		name: "",
		title: "",
		content: "",
	};

	const [notifice, setNotifice] = useState({
		isProcessing: false,
		error: undefined,
	});

	const handleSubmit = async values => {
		await handleNotificeWithResponse(
			setNotifice,
			dispatch,
			docCreate({...values, groupId}),
			undefined
		);
	};

	return (
		<div className="mform doc-create-page">
			<BackButton />
			<h3 className="mform__title">Tạo tài liệu</h3>
			<ProcessNotifice successText="Tạo thành công" notifice={notifice} />

			<Formik
				onSubmit={handleSubmit}
				initialValues={initialValues}
				validationSchema={schema}
			>
				{formikProps => {
					const {handleSubmit} = formikProps;

					return (
						<form onSubmit={handleSubmit} className="mform__form">
							<FastField
								name="name"
								label="Tên tài liệu"
								placeholder="Nhập tên tài liệu"
								component={PageInputField}
							/>
							<FastField
								name="title"
								label="Tiêu đề của nội dung"
								placeholder="Nhập tiêu đề ..."
								component={PageInputField}
							/>
							<FastField
								name="content"
								label="Nội dung"
								component={PageTexteditorField}
							/>
							<div className="mform__form__btn-container">
								<MyButton text="Tạo" disabled={notifice.isProcessing} />
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default DocCreatePage;
