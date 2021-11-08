import * as yup from "yup";

import {FastField, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";

import BackButton from "components/MyButton/BackButton";
import FormLoading from "components/Form/FormLoading";
import MyButton from "components/MyButton/MyButton";
import PageInputField from "components/Form/PageInputField";
import PageTexteditorField from "components/Form/PageTexteditorField";
import {ProcessNotifice} from "components/Notifice/Notifice";
import React from "react";
import {docCreateContent} from "../docSlice";
import {handleNotificeWithResponse} from "assets/core/core";
import {useParams} from "react-router";
import {useRef} from "react";
import {useState} from "react";

const schema = yup.object().shape({
	title: yup.string().required("Bạn chưa điền tiêu đề"),
	content: yup.string().required("Bạn chưa điền nội dung"),
});

function DocCreateContentPage(props) {
	const formTitleRef = useRef();

	const dispatch = useDispatch();
	const params = useParams();
	const docId = params.id;

	const docName = useSelector(state => {
		const doc = state.docs.data.find(doc => doc._id === docId);
		if (!doc) return "";
		return doc.name;
	});

	const {loading, error} = useSelector(state => ({
		loading: state.docs.loading,
		error: state.docs.error,
	}));

	const groupId = useSelector(state => state.groups.selectedGroup._id);

	const initialValues = {
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
			docCreateContent({...values, groupId, docId}),
			undefined
		);

		formTitleRef.current.scrollIntoView();
	};

	if (!groupId) return null;
	if (!docId) return null;
	if (error);

	if (loading) return <FormLoading />;
	return (
		<div className="mform doc-create-page">
			<BackButton />
			{loading ? (
				<FormLoading />
			) : (
				<>
					<h3 className="mform__title" ref={formTitleRef}>
						Tạo nội dung cho {docName}
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
				</>
			)}
		</div>
	);
}

export default DocCreateContentPage;
