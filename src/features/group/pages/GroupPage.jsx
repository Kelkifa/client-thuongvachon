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
				<GroupBtn
					btnType="add"
					onClick={() => {
						history.push(`/groups/create`);
					}}
				/>
				{groups.map(group => {
					if (group.type === "demo") return null;
					return (
						<GroupBtn
							key={group._id}
							{...group}
							onClick={() => {
								history.push(`/groups/${group._id}`);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default GroupPage;
