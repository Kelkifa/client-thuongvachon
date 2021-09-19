import "./adminGameList.scss";

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import AdminTable from "features/admin/components/AdminTable";
import {Link} from "react-router-dom";
import MyTooltip from "components/Tooltip/MyTooltip";
import {gameDelete} from "../gameSlice";

// import {gameAdminDelete} from "../gameSlice";

function AdminGameList(props) {
	const dispatch = useDispatch();
	const gameInfo = useSelector(state => state.games.admin.list);
	const tableHeaders = ["index", "Id", "Image", "CreatedAt", "Options"];
	const gameIds = gameInfo.data.map(value => value._id);

	const [notifice, setNotifice] = useState({
		isShow: false,
		message: null,
		loading: false,
		error: null,
	});

	// HANDLE FUNCTIONS
	const handleDelete = async data => {
		if (!data.length) {
			setNotifice({
				isShow: true,
				message: "Bạn chưa chọn hình ảnh để xoá",
				loading: false,
				error: true,
			});
			return;
		}
		setNotifice({isShow: false, message: null, loading: true, error: null});

		try {
			const response = await dispatch(gameDelete({data}));

			// Notifice
			if (!response.payload.success) {
				setNotifice({
					isShow: true,
					message: response.payload.message,
					error: true,
					loading: false,
				});
				return;
			}

			// Success
			setNotifice({
				isShow: true,
				message: `Xoá thành công (${data.length})`,
				error: false,
				loading: false,
			});
		} catch (err) {
			setNotifice({
				isShow: true,
				message: err.message,
				loading: false,
				error: true,
			});
		}
	};
	return (
		<AdminTable
			tableHeaders={tableHeaders}
			header={{title: "Game List", content: "Danh sách hình ảnh game"}}
			idList={gameIds}
			pageType="list"
			notifice={notifice}
			dataInfo={{
				loading: gameInfo.loading,
				error: gameInfo.error,
				process: gameInfo.process,
			}}
			adminHandleDelete={handleDelete}
		>
			{gameInfo.data.map((game, index) => (
				<tr key={game._id} dataId={game._id}>
					<td>{index + 1}</td>
					<td>{game._id}</td>
					<td>
						<div className="game-list__img">
							{game.type === "image" ? (
								<MyTooltip text={game.data}>
									{props => {
										const {handleMouseOver, handleMouseOut} = props;

										return (
											<img
												onMouseMove={handleMouseOver}
												onMouseOut={handleMouseOut}
												src={game.data}
												alt="fail"
											/>
										);
									}}
								</MyTooltip>
							) : (
								game.data
							)}
						</div>
					</td>
					<td>{game.createdAt}</td>
					<td>
						<Link
							to={`/admin/games/${game._id}/update`}
							className="custom-link"
						>
							Update
						</Link>
						<div
							className="custom-link"
							onClick={() => {
								handleDelete([game._id]);
							}}
						>
							Delete
						</div>
					</td>
				</tr>
			))}
		</AdminTable>
	);
}

export default AdminGameList;
