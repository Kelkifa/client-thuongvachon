import MultiCheckboxForm from "components/Form/MultiCheckboxForm";
import PropTypes from "prop-types";
import Table from "components/Table/Table";
import clsx from "clsx";

TodoManageTable.protoTypes = {
	noteInfo: PropTypes.object,
	handleNotesDelete: PropTypes.func,
};
TodoManageTable.defaultProps = {
	noteInfo: {loading: false, error: "Client lỗi", data: []},
	handleNotesDelete: () => {},
};

export default function TodoManageTable({noteInfo, handleNotesDelete}) {
	const tableHeader = ["", "Tên", "Từ", "Đến", "Option"];

	// FUNCTION HANDLE
	const NotificeRow = ({loading, error}) => {
		if (loading || error)
			return (
				<tr>
					<td colSpan={tableHeader.length} style={{textAlign: "center"}}>
						{loading ? "Đang tải ..." : error}
					</td>
				</tr>
			);

		return (
			<tr>
				<td colSpan={tableHeader.length} style={{textAlign: "center"}}>
					Bạn không có ghi chú nào
				</td>
			</tr>
		);
	};
	// TABLE BODY
	return (
		<div className="todo-manage__table">
			<h3 className="todo-manage__table__title">Danh Sách các sự kiện</h3>

			<MultiCheckboxForm dataList={noteInfo.data.map(note => note._id)}>
				{multiCheckboxProps => {
					const {handleCheckedAll, checkedData, handleChange} =
						multiCheckboxProps;

					return (
						<>
							<div className="todo-manage__table__control">
								{/* Control */}
								<div className="todo-manage__table__control__left">
									<input
										type="checkbox"
										onChange={e => {
											handleCheckedAll(e.target.checked);
										}}
										checked={
											checkedData.findIndex(value => value === undefined) ===
												-1 && checkedData.length !== 0
												? true
												: false
										}
									/>{" "}
									Chọn tất cả
								</div>
								<div
									className="todo-manage__table__control__right"
									onClick={() => {
										handleNotesDelete(checkedData);
									}}
								>
									Xóa (
									{checkedData.reduce((preValue, value) => {
										return value !== undefined ? preValue + 1 : preValue;
									}, 0)}
									)
								</div>
							</div>
							<Table
								headerList={tableHeader}
								rowHighlight="rgba(0, 0, 0, 0.274)"
								rowHover="rgba(0, 0, 0, 0.474)"
								maxHeight="470px"
							>
								{(noteInfo.loading ||
									noteInfo.error ||
									noteInfo.data.length === 0) && <NotificeRow {...noteInfo} />}
								{noteInfo.data.map((note, index) => (
									<tr
										key={note._id}
										style={{backgroundColor: note.color}}
										className={clsx(
											{
												"todo-manage__table__item--loading": note.loading,
											},
											"todo-manage__table__item"
										)}
									>
										<td style={{verticalAlign: "middle"}}>
											<input
												type="checkbox"
												checked={checkedData[index] ? true : false}
												disabled={note.loading}
												onChange={e => {
													handleChange(e.target.checked, index);
												}}
											/>
										</td>
										<td>{note.title}</td>
										<td>{note.from}</td>
										<td>{note.to}</td>
										<td style={{verticalAlign: "middle"}}>
											<div
												className={clsx({
													"todo-manage__table__item__option-btn--disabled":
														note.loading,
													"todo-manage__table__item__option-btn": !note.loading,
												})}
												onClick={() => {
													if (note.loading) return;
													handleNotesDelete([note._id]);
												}}
											>
												Xóa
											</div>
										</td>
									</tr>
								))}
							</Table>
						</>
					);
				}}
			</MultiCheckboxForm>
		</div>
	);
}
