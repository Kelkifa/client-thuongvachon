import AdminNotifice from "./AdminNotifice";
import {Formik} from "formik";
import PropTypes from "prop-types";
import React from "react";
import Table from "components/Table/Table";

AdminTable.propTypes = {
	tableHeaders: PropTypes.array,
	header: PropTypes.object,
	idList: PropTypes.array,
	pageType: PropTypes.string,
	dataInfo: PropTypes.object,
	notifice: PropTypes.object,

	adminHandleRestore: PropTypes.func,
	adminHandleDelete: PropTypes.func,
};
AdminTable.defaultProps = {
	tableHeaders: [],
	header: {title: "", content: ""},
	idList: [],
	pageType: "list",
	dataInfo: {loading: false, error: null, process: null},
	notifice: {
		isShow: false,
		message: null,
		loading: false,
		error: null,
	},

	adminHandleRestore: null,
	adminHandleDelete: null,
};

function AdminTable(props) {
	// PROPS
	const {
		children = [],
		pageType,
		tableHeaders,
		header,
		idList,
		notifice,
		dataInfo,
		adminHandleDelete,
		adminHandleRestore,
	} = props;

	// HANDLE FUNCTIONS
	const handleSubmit = values => {
		if (values.submit === "restore" && adminHandleRestore) {
			adminHandleRestore(values.selectedInputs);
			return;
		}
		if (!adminHandleDelete) return;

		adminHandleDelete(values.selectedInputs);
	};

	// RENDER
	let processElement = null;

	if (!children.length) {
		processElement = (
			<tr>
				<td colSpan={tableHeaders.length + 1} style={{textAlign: "center"}}>
					{pageType === "trash" ? "Thùng rác trống" : "Không có dữ liệu"}
				</td>
			</tr>
		);
	}
	if (dataInfo.error) {
		processElement = (
			<tr>
				<td style={{textAlign: "center"}} colSpan={tableHeaders.length + 1}>
					Internal Server (Status code 500)
				</td>
			</tr>
		);
	} else if (dataInfo.loading) {
		processElement = (
			<tr>
				<td style={{textAlign: "center"}} colSpan={tableHeaders.length + 1}>
					Loading ...
				</td>
			</tr>
		);
	}

	return (
		<div className="admin-list">
			<AdminNotifice
				notificeInfo={notifice}
				className="admin-list__notifice admin-layout-fluid"
			/>

			<div className="admin-list__content admin-layout-fluid">
				<Formik
					onSubmit={handleSubmit}
					initialValues={{selectAllInput: [], selectedInputs: [], submit: ""}}
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
							<form onSubmit={handleSubmit}>
								<div className="admin-list__content__header">
									<h2 className="admin-list__header__text">{header.title}</h2>
									<p className="admin-list__header__info">{header.content}</p>
									<div>
										<button
											type="submit"
											className="custom-link"
											name="submit"
											value="delete"
											onClick={handleChange}
										>
											Xoá
										</button>

										{pageType === "trash" && (
											<button
												type="submit"
												name="submit"
												value="restore"
												className="custom-link"
												style={{marginLeft: "7px"}}
												onClick={handleChange}
											>
												Restore
											</button>
										)}
										<span> ({values.selectedInputs.length})</span>
									</div>
								</div>
								<div className="admin-list__content__table">
									<Table
										headerList={[
											<input
												value={1}
												type="checkbox"
												name="selectAllInput"
												onChange={e => {
													handleChange(e);
													if (e.target.checked === true) {
														setFieldValue("selectedInputs", idList);
														return;
													}
													setFieldValue("selectedInputs", []);
												}}
												checked={
													(values.selectedInputs.length === idList.length &&
														idList.length !== 0) ||
													values.selectAllInput[0] == "1"
														? true
														: false
												}
											/>,
											...tableHeaders,
										]}
									>
										{processElement && processElement}

										{!processElement &&
											children.length &&
											children.map(value => {
												const dataId = value.props.dataId;

												return (
													<tr key={dataId}>
														<td>
															<input
																name="selectedInputs"
																value={dataId}
																type="checkbox"
																onChange={e => {
																	handleChange(e);
																	if (e.target.checked === false) {
																		setFieldValue("selectAllInput", []);
																	}
																}}
																checked={
																	values.selectAllInput[0] === "1" ||
																	values.selectedInputs.findIndex(
																		id => id === dataId
																	) !== -1
																		? true
																		: false
																}
															/>
														</td>
														{value.props.children}
													</tr>
												);
											})}
									</Table>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}

export default AdminTable;
