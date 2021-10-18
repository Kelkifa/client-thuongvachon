import "./docIntro.scss";

import DocFormCreate from "../components/DocFormCreate";
import {IoAddCircleOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import MyButton from "components/MyButton/MyButton";
import PropTypes from "prop-types";
import React from "react";
import Table from "components/Table/Table";
import {docDeleteContent} from "../docSlice";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
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
	const history = useHistory();
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

	const handleRowClick = docId => {
		history.push(`?title=${docId}`);
	};

	return (
		<div className="doc-intro">
			{isShowForm ? (
				<DocFormCreate
					type={type}
					isDataLoading={isLoading}
					handleCancel={() => {
						setIsShowForm(false);
					}}
				/>
			) : (
				<>
					<h2 className="doc-intro__title">
						{type && type.type}
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
										cursor: "pointer",
									}}
								>
									<td
										onClick={() => {
											handleRowClick(value._id);
										}}
									>
										{index + 1}
									</td>
									<td
										onClick={() => {
											handleRowClick(value._id);
										}}
									>
										{value.title}
									</td>
									<td>
										<MyButton
											type="a"
											text="delete"
											onClick={() => {
												handleDelete(value._id);
											}}
										/>
										{/* <MyButton type="a" text="Update" onClick={handleUpdate} /> */}

										<Link
											to={`/docs/${type._id}/update/${value._id}`}
											style={{color: "unset"}}
											className="doc-intro__link"
										>
											Update
										</Link>
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
