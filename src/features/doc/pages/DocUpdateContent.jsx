import {FastField, Formik} from "formik";
import {defaultNotifice, handleNotificeWithResponse} from "assets/core/core";

import BackButton from "components/MyButton/BackButton";
import MyButton from "components/MyButton/MyButton";
import PageInputField from "components/Form/PageInputField";
import PageTexteditorField from "components/Form/PageTexteditorField";
import {ProcessNotifice} from "components/Notifice/Notifice";
import PropTypes from "prop-types";
import React from "react";
import {docUpdateContent} from "../docSlice";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import {useState} from "react";

DocUpdateContent.propTypes = {
	docId: PropTypes.string,
	docName: PropTypes.string,
	contents: PropTypes.array,
};

DocUpdateContent.defaultProps = {
	docId: {},
	docName: "",
	contents: [],
};

function DocUpdateContent({docId, docName, contents}) {
	const dispatch = useDispatch();

	const [notifice, setNotifice] = useState(defaultNotifice);

	const params = useParams();
	const contentId = params.id;

	const updateContent = contents.find(content => content._id === contentId);

	const handleSubmit = async values => {
		await handleNotificeWithResponse(
			setNotifice,
			dispatch,
			docUpdateContent({...values, docId, contentId})
		);
	};

	if (!updateContent) return "error";

	const initialValues = {
		title: updateContent.title,
		content: updateContent.content,
	};
	if (!docId) return null;

	return (
		<div className="mform">
			<BackButton />
			<h2 className="mform__title">
				Cập nhật nội dung cho tài liệu <br />({docName})
			</h2>
			<ProcessNotifice
				successText="Cập nhật nội dung thành công"
				notifice={notifice}
			/>

			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{formikProps => {
					const {handleSubmit} = formikProps;

					return (
						<form onSubmit={handleSubmit} className="mform__form">
							<FastField
								name="title"
								label="Tiêu đề"
								placeholder="Nhập tiêu đề"
								component={PageInputField}
							/>
							<FastField
								name="content"
								label="Nội dung"
								placeholder="Nhập nội dung"
								component={PageTexteditorField}
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

export default DocUpdateContent;
