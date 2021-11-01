import "./GroupBtn.scss";

import {ImPlus} from "react-icons/im";
import PropTypes from "prop-types";
import React from "react";

GroupBtn.propTypes = {
	_id: PropTypes.string,
	name: PropTypes.string,
	users: PropTypes.array,
	type: PropTypes.string,
	btnType: PropTypes.string, // $in: ['add', 'base' (default)];

	onClick: PropTypes.func,
};

GroupBtn.defaultProps = {
	_id: "",
	name: "",
	users: [],
	type: "demo",
	btnType: "base",

	onClick: undefined,
};

function GroupBtn({_id, name, users, type, btnType, onClick}) {
	// Event Handle Functions
	const handleClick = () => {
		if (!onClick) return;
		onClick();
	};

	if (btnType === "add") {
		return (
			<div className="doc-group-btn doc-group-btn--add" onClick={handleClick}>
				<ImPlus />
			</div>
		);
	}
	return (
		<div className="doc-group-btn" onClick={handleClick}>
			<h5 className="doc-group-btn__name">{name}</h5>
			<div className="doc-group-btn__member">
				Thành viên:
				{type === "demo" ? (
					<div className="doc-group-btn__member__user">Mọi người</div>
				) : (
					users.map((user, index) => (
						<div key={user._id} className="doc-group-btn__member__user">
							{user.username}
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default GroupBtn;
