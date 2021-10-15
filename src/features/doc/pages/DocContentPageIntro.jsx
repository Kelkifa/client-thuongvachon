import "./docIntro.scss";

import DocForm from "../components/DocForm";
import {IoAddCircleOutline} from "react-icons/io5";
import MyButton from "components/MyButton/MyButton";
import PropTypes from "prop-types";
import React from "react";
import Table from "components/Table/Table";
import {docDeleteContent} from "../docSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";

DocContentPageIntro.propTypes = {
	dataInfo: PropTypes.object,
	isLoading: PropTypes.bool,
	type: PropTypes.object,
};

DocContentPageIntro.defaultProps = {
	dataInfo: undefined,
	isLoading: true,
	type: null,
};

function DocContentPageIntro(props) {
	const dispatch = useDispatch();
	// useProps
	const {dataInfo, isLoading, type} = props;

	// useState
	const [isShowForm, setIsShowForm] = useState(false);

	// Handle functions
	const handleDelete = async titleId => {
		console.log(1);
		if (!titleId || type === null) return;
		try {
			const response = await dispatch(
				docDeleteContent({typeId: type._id, docContentId: titleId})
			);
			console.log(`[DOC DELETE CONTENT RESPONSE]`, response);
		} catch (err) {
			console.log(`[Doc Delete Content ERR]`, err);
		}
	};
	const handleUpdate = async titleId => {};

	return (
		<div className="doc-intro">
			{isShowForm ? (
				<DocForm
					type={type}
					isDataLoading={isLoading}
					handleCancel={() => {
						setIsShowForm(false);
					}}
				/>
			) : (
				<>
					<h2 className="doc-intro__title">
						Danh sách các mục
						<IoAddCircleOutline
							onClick={() => {
								setIsShowForm(true);
							}}
							style={{cursor: "pointer"}}
						/>
					</h2>

					<Table headerList={["Stt", "Mục", "Options"]}>
						{isLoading ? (
							<tr>
								<td colSpan="3" style={{textAlign: "center"}}>
									Loading...
								</td>
							</tr>
						) : dataInfo === undefined ? (
							<tr>
								<td colSpan="3" style={{textAlign: "center"}}>
									Lỗi
								</td>
							</tr>
						) : (
							dataInfo.data.map((value, index) => (
								<tr
									key={value._id}
									style={{
										backgroundColor:
											index % 2 !== 0
												? "rgba(163, 23, 81, 0.218)"
												: "transparent",
									}}
								>
									<td>{index + 1}</td>
									<td>{value.title}</td>
									<td>
										<MyButton
											type="a"
											text="delete"
											onClick={() => {
												handleDelete(value._id);
											}}
										/>
										<MyButton type="a" text="Update" onClick={handleUpdate} />
									</td>
								</tr>
							))
						)}
					</Table>
				</>
			)}
		</div>
	);
}

export default DocContentPageIntro;
