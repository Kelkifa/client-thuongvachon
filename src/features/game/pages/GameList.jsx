import "./gameList.scss";

import React from "react";
import {useSelector} from "react-redux";
import {useState} from "react";

function GameList(props) {
	const gameInfo = useSelector(state => state.games.user);

	const [type, setType] = useState(false); // false: image, true: video;

	// HANDLE FUNCTIONS
	const handleChangeType = async () => {
		if (type === true) {
			setType(false);
			return;
		}

		setType(true);
	};
	// RENDER
	return (
		<div className="game-list">
			<div
				className="grid wide"
				// style={{
				// 	backgroundImage: `url(http://localhost:3000/gameBackground.jpg)`,
				// }}
			>
				<div className="row">
					<h2 className="c-12 game-list__title">Bờ lay to ghe đờ</h2>
				</div>
				<div className="row game-list__type-select cg-0">
					<button
						onClick={handleChangeType}
						className={`game-list__type-select__btn game-list__type-select__btn__image ${
							!type ? "game-list__type-select__btn--active" : ""
						}`}
					>
						Image
					</button>
					<button
						onClick={handleChangeType}
						className={`game-list__type-select__btn game-list__type-select__btn__video ${
							type ? "game-list__type-select__btn--active" : ""
						}`}
					>
						Video
					</button>
				</div>
				<div className="row game-list__body">
					{gameInfo.loading && "Loading ..."}
					{gameInfo.error && gameInfo.error}
					{!gameInfo.loading && !gameInfo.error && (
						<div className="row c-12" style={{display: type ? "none" : "grid"}}>
							{gameInfo.data.map(value => {
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

								return undefined;
							})}
						</div>
					)}
					{!gameInfo.loading && !gameInfo.error && (
						<div
							className="row c-12"
							style={{display: !type ? "none" : "grid"}}
						>
							{gameInfo.data.map(value => {
								if (value.type === "video")
									return (
										<div
											key={value._id}
											className="c-3 t-4 m-12 game-list__body__video"
										>
											<iframe
												min-height="294"
												width="100%"
												src={`https://www.youtube.com/embed/${value.data}`}
												title="YouTube video player"
												frameBorder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
												allowFullScreen
											></iframe>
										</div>
									);
								return undefined;
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default GameList;
