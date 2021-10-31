import "./DocGroupBtn.scss";

import {ImPlus} from "react-icons/im";
import PropTypes from "prop-types";
import React from "react";
import {useHistory} from "react-router";

DocGroupBtn.propTypes = {
	_id: PropTypes.string,
	name: PropTypes.string,
	users: PropTypes.array,
	type: PropTypes.string,
	btnType: PropTypes.string, // $in: ['add', 'base' (default)];
};

DocGroupBtn.defaultProps = {
	_id: "",
	name: "",
	users: [],
	type: "demo",
	btnType: "base",
};

const MAX_MEMBER = 6;

function DocGroupBtn({_id, name, users, type, btnType}) {
	const history = useHistory();

	// Event Handle Functions
	const handleClick = () => {
		if (btnType === "add") {
			history.push(`/docs/group/create`);
			return;
		}

		history.push(`/docs/group/${_id}`);
		return;
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

export default DocGroupBtn;
