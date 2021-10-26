import "./docIntro.scss";

import {useDispatch, useSelector} from "react-redux";

import DivButton from "components/MyButton/DivButton";
import DocFormCreate from "../components/DocFormCreate";
import {IoAddCircleOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import React from "react";
import Table from "components/Table/Table";
import {docDeleteDoc} from "../docSlice";
import {useHistory} from "react-router";
import {useState} from "react";

function DocIntro(props) {
	const history = useHistory();
	const docTypeInfo = useSelector(state => state.docs.types);

	const dispatch = useDispatch();

	// useState
	const [isShowForm, setIsShowForm] = useState(false);

	// Handle Functions
	const handleDelete = async typeId => {
		try {
			const response = dispatch(docDeleteDoc(typeId));
			console.log(`[response]`, response);
		} catch (err) {
			console.log(`[doc delete]`, err);
		}
		return true;
	};
	const handleRowClick = typeId => {
		console.log(`[typeId]`, typeId);
		history.push(`/docs/${typeId}`);
	};

	return (
		<div className="doc-intro custom-scroll">
			{isShowForm ? (
				<DocFormCreate
					isDataLoading={docTypeInfo.loading}
					handleCancel={() => {
						setIsShowForm(false);
					}}
				/>
			) : (
				<>
					<h2 className="doc-intro__title">
						Danh sách các tài liệu
						<IoAddCircleOutline
							onClick={() => {
								setIsShowForm(true);
							}}
							style={{cursor: "pointer"}}
						/>
					</h2>
					<Table headerList={["Stt", "Tên tài liệu", "Option"]}>
						{docTypeInfo.loading ? (
							<tr>
								<td colSpan="3" style={{textAlign: "center"}}>
									Loading...
								</td>
							</tr>
						) : docTypeInfo.data.length === 0 ? (
							"Tài liệu trống"
						) : (
							docTypeInfo.data.map((value, index) => (
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
										{index}
									</td>
									<td
										onClick={() => {
											handleRowClick(value._id);
										}}
									>
										{value.type}
									</td>
									<td className="doc-intro__table__btn">
										<DivButton
											text="Delete"
											onClick={() => {
												handleDelete(value._id);
											}}
										/>
										<Link
											to={`/docs/update/${value._id}`}
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

export default DocIntro;
