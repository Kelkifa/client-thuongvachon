import "./GroupDetailPage.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";

import BackButton from "components/MyButton/BackButton";
import MyButton from "components/MyButton/MyButton";
import PageTextareaField from "components/Form/PageTextareaField";
import {ProcessNotifice} from "components/Notifice/Notifice";
import {groupAddMember} from "../groupSlice";
import {handleNotificeWithResponse} from "assets/core/core";
import {useParams} from "react-router-dom";
import {useState} from "react";

const schema = yup.object().shape({
	users: yup.string().required("Bạn chưa điền mục này"),
});

function GroupDetailPage(props) {
	const params = useParams();
	const groupId = params.id;

	const dispatch = useDispatch();

	const [notifice, setNotifice] = useState({
		isProcessing: false,
		error: undefined,
	});

	const userId = useSelector(state => state.auth.user._id);
	const group = useSelector(state =>
		state.groups.groups.data.find(group => group._id === groupId)
	);

	if (!group) return <div>Không tìm thấy nhóm</div>;

	const handleSubmit = async values => {
		const {users} = values;

		try {
			const userArr = users.replace(" ", "").replace("\n", "").split(",");
			await handleNotificeWithResponse(
				setNotifice,
				dispatch,
				groupAddMember({users: userArr, groupId})
			);
		} catch (err) {
			console.log(`[Client err]`, err);
		}
	};

	const initialValues = {
		users: "",
	};

	// Render
	return (
		<div className="group-detail">
			<BackButton />
			<h3 className="group-detail__title">{group.name}</h3>

			<div className="group-detail__member">
				<h4>Thành viền</h4>
				<ProcessNotifice notifice={notifice} successText="Thêm thành công" />
				<ul className="group-detail__member__list">
					{group.users.map(user => (
						<li key={user._id}>
							{user.fullname}{" "}
							<span className="group-detail__member__list__item__extension">
								({user.username}) {user._id === userId && "(you)"}
							</span>
						</li>
					))}
				</ul>
			</div>

			<div className="group-detail__form-add">
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
									name="users"
									label="Thêm thành viên"
									placeholder="username1, username2, ..."
									rows={2}
									component={PageTextareaField}
								/>
								<div className="group-detail__form-add__btn-container">
									<MyButton text="Thêm" disabled={notifice.isProcessing} />
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}

export default GroupDetailPage;
