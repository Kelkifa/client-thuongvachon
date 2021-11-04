import "features/group/Group.scss";

import GroupBtn from "features/group/components/GroupBtn";
import PropTypes from "prop-types";
import React from "react";
import {useHistory} from "react-router";

DocGroupPage.propTypes = {
	groups: PropTypes.array,
};
DocGroupPage.defaultProps = {
	groups: [],
};

function DocGroupPage({groups}) {
	const history = useHistory();

	// Render
	return (
		<div className="doc-group-page group">
			<h2 className="group__title">Chọn một nhóm</h2>
			<div className="group__list m-2">
				{groups.map(group => (
					<GroupBtn
						key={group._id}
						{...group}
						onClick={() => {
							history.push(`/docs/groups/${group._id}/doc`);
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

export default DocGroupPage;
