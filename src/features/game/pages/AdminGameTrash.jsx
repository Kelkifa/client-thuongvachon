import "./adminGameList.scss";

import React, {useState} from "react";
import {gameDelete, gameForceDelete, gameRestore} from "../gameSlice";
import {useDispatch, useSelector} from "react-redux";

import AdminTable from "features/admin/components/AdminTable";
import {Link} from "react-router-dom";
import MyTooltip from "components/Tooltip/MyTooltip";

// import {gameAdminDelete} from "../gameSlice";

function AdminGameTrash(props) {
	const dispatch = useDispatch();
	const gameInfo = useSelector(state => state.games.admin.trash);
	const tableHeaders = ["indedx", "Id", "Image", "CreatedAt", "Options"];
	const gameIds = gameInfo.data.map(value => value._id);

	const [notifice, setNotifice] = useState({
		isShow: false,
		message: null,
		loading: false,
		error: null,
	});

	// HANDLE FUNCTIONS
	// Handle Delete
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
			const response = await dispatch(gameForceDelete({data}));

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
	// Handle Restore
	const handleRestore = async data => {
		if (!data.length) {
			setNotifice({
				isShow: true,
				message: "Bạn chưa chọn hình ảnh để khôi phục",
				loading: false,
				error: true,
			});
			return;
		}
		setNotifice({isShow: false, message: null, loading: true, error: null});

		try {
			const response = await dispatch(gameRestore({data}));

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
				message: `Khôi phục thành công (${data.length})`,
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

	// Render
	return (
		<AdminTable
			tableHeaders={tableHeaders}
			header={{title: "Game Trash", content: "Danh sách hình ảnh đã bị xoá"}}
			idList={gameIds}
			pageType="trash"
			notifice={notifice}
			dataInfo={{
				loading: gameInfo.loading,
				error: gameInfo.error,
				process: gameInfo.process,
			}}
			adminHandleDelete={handleDelete}
			adminHandleRestore={handleRestore}
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
							Restore
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

export default AdminGameTrash;
