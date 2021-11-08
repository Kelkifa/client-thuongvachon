import * as yup from "yup";

import {FastField, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";

import BackButton from "components/MyButton/BackButton";
import MyButton from "components/MyButton/MyButton";
import PageInputField from "components/Form/PageInputField";
import PageTexteditorField from "components/Form/PageTexteditorField";
import {ProcessNotifice} from "components/Notifice/Notifice";
import React from "react";
import {docCreate} from "../docSlice";
import {handleNotificeWithResponse} from "assets/core/core";
import {useRef} from "react";
import {useState} from "react";

const schema = yup.object().shape({
	name: yup.string().required("Bạn chưa điền tên tài liệu"),
	title: yup.string().required("Bạn chưa điền tiêu đề"),
	content: yup.string().required("Bạn chưa điền nội dung"),
});

function DocCreatePage(props) {
	const formTitleRef = useRef();

	const dispatch = useDispatch();

	const groupId = useSelector(state => state.groups.selectedGroup._id);

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
		formTitleRef.current.scrollIntoView();
	};

	if (!groupId) return null;
	return (
		<div className="mform doc-create-page">
			<BackButton />
			<h3 className="mform__title" ref={formTitleRef}>
				Tạo tài liệu
			</h3>
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
