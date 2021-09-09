import "./myTooltip.scss";

import React, {useState} from "react";

import PropTypes from "prop-types";

MyTooltip.propTypes = {
	text: PropTypes.string,
};

MyTooltip.defaultProps = {
	text: "Tooltip",
};

function MyTooltip(props) {
	const {children, text} = props;

	const [isShow, setIsShow] = useState(false);
	const [tooltipStyle, setTooltipStyle] = useState({
		top: 0,
		left: 0,
		position: "fixed",
	});

	const handleMouseOver = e => {
		setTooltipStyle({
			top: e.clientY,
			left: e.clientX,
			position: "fixed",
		});
		setIsShow(true);
	};
	const handleMouseOut = e => {
		setIsShow(false);
	};
	return (
		<>
			{children({handleMouseOver, handleMouseOut})}
			{isShow && (
				<span className="my-tooltip" style={tooltipStyle}>
					{text}
				</span>
			)}
		</>
	);
}

export default MyTooltip;
