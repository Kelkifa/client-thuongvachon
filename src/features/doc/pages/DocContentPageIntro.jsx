import "./docIntro.scss";

import DivButton from "components/MyButton/DivButton";
import DocFormCreate from "../components/DocFormCreate";
import {IoAddCircleOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Table from "components/Table/Table";
import {docDeleteContent} from "../docSlice";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {useState} from "react";

// import MyButton from "components/MyButton/MyButton";

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

const HEADER_LIST = ["Stt", "Mục", "Options"];

function DocContentPageIntro(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	// useProps
	const {dataInfo, isLoading, type} = props;
	// useState
	const [isShowForm, setIsShowForm] = useState(false);

	// Handle Functions
	const handleDelete = async titleId => {
		if (!titleId || type === undefined) return false;
		console.log("vo duoc day");
		try {
			const response = await dispatch(
				docDeleteContent({typeId: type._id, docContentId: titleId})
			);
			console.log(`[DOC DELETE RESPONSE]`, response);
			return response.payload.success;
		} catch (err) {
			console.log(`[DOC TITLE DELETE]`, err);
			return false;
		}
	};

	const handleRowClick = docId => {
		history.push(`?title=${docId}`);
	};

	return (
		<div className="doc-intro custom-scroll">
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

					<Table headerList={HEADER_LIST}>
						{isLoading ? (
							<tr>
								<td colSpan={HEADER_LIST.length} style={{textAlign: "center"}}>
									Loading...
								</td>
							</tr>
						) : dataInfo === undefined ? (
							<tr>
								<td colSpan={HEADER_LIST.length} style={{textAlign: "center"}}>
									Lỗi
								</td>
							</tr>
						) : dataInfo.data.length === 0 ? (
							<tr>
								<td colSpan={HEADER_LIST.length} style={{textAlign: "center"}}>
									Chưa có nội dung
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
										<DivButton
											text="Delete"
											onClick={() => {
												handleDelete(value._id);
											}}
										/>

										<Link
											to={`/docs/${type && type._id}/update/${value._id}`}
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
