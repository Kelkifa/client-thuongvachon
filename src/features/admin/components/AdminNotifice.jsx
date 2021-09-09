import LoadNotifice from "components/Dialog/LoadNotifice";
import PropTypes from "prop-types";
import React from "react";

AdminNotifice.propTypes = {
	className: PropTypes.string,
	notificeInfo: PropTypes.object,
};

AdminNotifice.defaultProps = {
	className: null,
	notificeInfo: {
		isShow: false,
		loading: false,
		error: null,
		message: null,
	},
};

function AdminNotifice(props) {
	const {className, notificeInfo} = props;

	return (
		<>
			{notificeInfo.isShow && (
				<div
					className={`${className} ${
						notificeInfo.error ? "custom-text--dange" : "custom-text--success"
					}`}
				>
					{notificeInfo.message}
				</div>
			)}
			{notificeInfo.loading && <LoadNotifice />}
		</>
	);
}

export default AdminNotifice;
