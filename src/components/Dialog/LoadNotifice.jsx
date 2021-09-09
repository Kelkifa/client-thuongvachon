import "./notifice.scss";

import React from "react";
import {VscLoading} from "react-icons/vsc";

function LoadNotifice(props) {
	return (
		<div className="dialog-container">
			<div className="dialog__content">
				<div className="dialog__content__icon">
					<VscLoading className="icon icon--loading" />
				</div>
				<p className="dialog__content__text">Đang xử lý thao tác ...</p>
			</div>
		</div>
	);
}

export default LoadNotifice;
