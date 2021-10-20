import DocNotifice from "./DocNotifice";
import PropTypes from "prop-types";
import React from "react";

DocShowNotifice.propTypes = {
	notifice: PropTypes.object,
	successText: PropTypes.string,
	errorText: PropTypes.string,
};
DocShowNotifice.defaultProps = {
	notifice: {
		isProcessing: false,
		error: undefined,
	},
	successText: "Success",
};

function DocShowNotifice({notifice, successText}) {
	return (
		<div>
			{notifice.error !== undefined && notifice.isProcessing !== true && (
				<div style={{marginBottom: "0.7em"}}>
					{notifice.error === false ? (
						<DocNotifice.Success text={successText} />
					) : (
						<DocNotifice.Fail text={notifice.error} />
					)}
				</div>
			)}
		</div>
	);
}

export default DocShowNotifice;
