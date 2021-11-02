import GroupBtn from "../components/GroupBtn";
import PropTypes from "prop-types";
import React from "react";
import {useHistory} from "react-router";

GroupPage.propTypes = {
	groups: PropTypes.array,
};

GroupPage.defaultProps = {
	groups: [],
};

function GroupPage({groups}) {
	const history = useHistory();

	return (
		<div className="group">
			<h2 className="group__title">Chọn một nhóm</h2>
			<div className="group__list m-2">
				{groups.map(group => (
					<GroupBtn
						key={group._id}
						{...group}
						onClick={() => {
							history.push(`/groups/${group._id}`);
						}}
					/>
				))}
				<GroupBtn
					btnType="add"
					onClick={() => {
						history.push(`/groups/create`);
					}}
				/>
			</div>
		</div>
	);
}

export default GroupPage;
