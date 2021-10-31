import "./DocGroupPage.scss";

import DocGroupBtn from "../components/DocGroupBtn";
import PropTypes from "prop-types";
import React from "react";

DocGroupPage.propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.string,

	groups: PropTypes.array,
};

DocGroupPage.defaultProps = {
	loading: false,
	error: "client error",

	groups: [], //{_id, name, users, type}
};

function DocGroupPage({loading, error, groups}) {
	// Render
	if (error) return <div>{error}</div>;
	if (loading) return <div>Loading...</div>;

	return (
		<div className="doc-group-page">
			<h2 className="doc-main__title">Your groups</h2>
			<div className="doc-group-page__list">
				{groups.map(group => (
					<DocGroupBtn key={group._id} {...group} />
				))}
				<DocGroupBtn btnType="add" />
			</div>
		</div>
	);
}

export default DocGroupPage;
