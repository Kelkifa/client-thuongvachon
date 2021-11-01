import "./Group.scss";

import GroupBtn from "./components/GroupBtn";
import PropTypes from "prop-types";
import React from "react";

Group.propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.string,

	groups: PropTypes.array, // [ { _id, name, users, type } ]
};

Group.defaultProps = {
	loading: false,
	error: "client error",

	groups: [],
};

function Group({loading, error, groups}) {
	// Render
	if (error) return <div>{error}</div>;
	if (loading) return <div>Loading...</div>;

	return (
		<div className="group">
			<h2 className="group__title">Chọn một nhóm</h2>
			<div className="group__list m-2">
				{groups.map(group => (
					<GroupBtn key={group._id} {...group} />
				))}
				<GroupBtn btnType="add" />
			</div>
		</div>
	);
}

export default Group;
