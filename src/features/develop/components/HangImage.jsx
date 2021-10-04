import "./hangImage.scss";
import "assets/scss/icons/hangImage/hangImage.css";

import PropTypes from "prop-types";
import React from "react";

HangImage.propTypes = {};

function HangImage(props) {
	return (
		<div>
			{/* <div className="hang-image">
				<i className="icon-longWidthHangImage"></i>
				<div className="hang-image__picture">
					<img
						src="https://f20-zpg.zdn.vn/6353762634407108403/d5b223d25ebe97e0ceaf.jpg"
						alt=""
					/>
				</div>
			</div> */}
			<div className="hang-image"></div>
		</div>
	);
}

export default HangImage;
