import "./gameList.scss";

import PropTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";

function GameList(props) {
	const gameInfo = useSelector(state => state.games.user);
	console.log(gameInfo);
	return (
		<div className="grid wide game-list">
			<div className="row">
				<h2 className="c-12 game-list__title">Bờ lay to ghe đờ</h2>
			</div>
			<div className="row game-list__body">
				{gameInfo.loading && "Loading ..."}
				{gameInfo.error && gameInfo.error}
				{!gameInfo.loading &&
					!gameInfo.error &&
					gameInfo.data.map(value => {
						if (value.type === "image")
							return (
								<div key={value._id} className="c-3 t-4 m-12">
									<img
										className="game-list__body__img"
										src={value.data}
										alt="fail"
									/>
								</div>
							);
					})}
			</div>
		</div>
	);
}

export default GameList;
