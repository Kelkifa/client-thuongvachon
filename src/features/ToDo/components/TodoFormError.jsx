import PropTypes from "prop-types";
import React from "react";

TodoFormError.propTypes = {
	errorDate: PropTypes.string,
	touchedDate: PropTypes.bool,

	errorTime: PropTypes.string,
	touchedTime: PropTypes.bool,
};
TodoFormError.defaultProps = {
	errorDate: undefined,
	touchedDate: undefined,

	errorTime: undefined,
	touchedTime: undefined,
};

function TodoFormError({errorDate, errorTime, touchedDate, touchedTime}) {
	return (
		<div className="c-12 todo-form__form__error">
			{errorDate && touchedDate && errorDate}
			{errorDate && touchedDate && errorTime && touchedTime && ", "}{" "}
			{errorTime && touchedTime && errorTime}
		</div>
	);
}

export default TodoFormError;
