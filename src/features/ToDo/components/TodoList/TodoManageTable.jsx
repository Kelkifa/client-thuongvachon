const {useDispatch} = require("react-redux");

function TodoManageTable({selectedTab, noteInfo}) {
	const tableHeader = ["", "Tên", "Từ", "Đến", "Option"];

	const TableBody = ({noteList, multiCheckboxProps}) => {
		const {handleChange, checkedData} = multiCheckboxProps;

		return (
			<>
				{noteList.length === 0 && (
					<tr>
						<td style={{textAlign: "center"}} colSpan={tableHeader.length}>
							Không có ghi chú nào
						</td>
					</tr>
				)}
				{noteList.map((note, index) => (
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
						<td>
							<div
								className={clsx({
									"todo-manage__table__item__option-btn--disabled":
										note.loading,
									"todo-manage__table__item__option-btn": !note.loading,
								})}
								onClick={() => {
									if (note.loading) return;
									handleDelete(note._id, index);
								}}
							>
								Xóa
							</div>
							<div
								className={clsx({
									"todo-manage__table__item__option-btn--disabled":
										note.loading,
									"todo-manage__table__item__option-btn": !note.loading,
								})}
							>
								Sửa
							</div>
						</td>
					</tr>
				))}
			</>
		);
	};

	return (
		<div className="todo-manage__table">
			<h3 className="todo-manage__table__title">Danh Sách các sự kiện</h3>

			<MultiCheckboxForm
				dataList={
					selectedTab === 0
						? currNoteList.map(note => note._id)
						: passedNoteList.map(note => note._id)
				}
			>
				{multiCheckboxProps => {
					const {handleCheckedAll, checkedData} = multiCheckboxProps;

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
											checkedData.findIndex(value => value === undefined) === -1
												? true
												: false
										}
									/>{" "}
									Chọn tất cả
								</div>
								<div
									className="todo-manage__table__control__right"
									onClick={() => {
										handleDeleteMulti(checkedData);
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
								{selectedTab === 0 && (
									<TableBody
										noteList={currNoteList}
										multiCheckboxProps={multiCheckboxProps}
									/>
								)}

								{selectedTab === 1 && (
									<TableBody
										noteList={passedNoteList}
										multiCheckboxProps={multiCheckboxProps}
									/>
								)}
							</Table>
						</>
					);
				}}
			</MultiCheckboxForm>
		</div>
	);
}
