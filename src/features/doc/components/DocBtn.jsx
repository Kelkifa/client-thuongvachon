import "./DocBtn.scss";

import {ImPlus} from "react-icons/im";
import LoadIcon from "components/LoadIcon";
import PropTypes from "prop-types";
import React from "react";
import {useHistory} from "react-router";
import {useState} from "react";

DocBtn.propTypes = {
	type: PropTypes.string, // $in :["add", "normal (default)", "load"]
	text: PropTypes.string,
	borderRadius: PropTypes.string,
	goToUrl: PropTypes.string,
	fixMode: PropTypes.bool,
	defaultFixMode: PropTypes.bool,

	onFixLeftClick: PropTypes.func,
	onFixRightClick: PropTypes.func,
};
DocBtn.defaultProps = {
	type: "normal",
	borderRadius: "30px",
	text: "", //  {_id, name}
	goToUrl: null,
	fixMode: false,
	defaultFixMode: false,
	onFixLeftClick: () => {},
	onFixRightClick: () => {},
};
function DocBtn({
	type,
	borderRadius,
	text,
	goToUrl,
	fixMode,
	defaultFixMode,
	onFixLeftClick,
	onFixRightClick,
}) {
	const [toggle, setToggle] = useState(defaultFixMode);

	const [isLoading, setIsLoading] = useState(false);

	const history = useHistory();

	// Handle Click
	const handleClick = () => {
		if (isLoading) return;

		if (fixMode) {
			setToggle(true);
			return;
		}
		if (!goToUrl || type === "load") return;
		history.push(goToUrl);
	};

	const handleRightFixClick = async () => {
		if (isLoading) return;
		setToggle(false);

		setIsLoading(true);
		const notifice = await onFixRightClick();
		if (!notifice.success) {
			setIsLoading(false);
			alert(notifice.message);
		}
	};

	if (type === "load") return <div className="doc-btn doc-btn--load"></div>;
	if (type === "add")
		return (
			<div
				className="doc-btn"
				onClick={handleClick}
				style={{"--borderRadius": borderRadius}}
			>
				<ImPlus />
			</div>
		);
	return (
		<div
			className="doc-btn"
			onClick={handleClick}
			style={{"--borderRadius": borderRadius}}
		>
			{text}
			{fixMode && !isLoading && toggle && (
				<div className="doc-btn__handle">
					<div
						className="doc-btn__handle__item doc-btn__handle__item--left"
						onClick={onFixLeftClick}
					>
						<span>UPDATE</span>
					</div>
					<div
						className="doc-btn__handle__item doc-btn__handle__item--right"
						onClick={handleRightFixClick}
					>
						<span>DELETE</span>
					</div>
				</div>
			)}
			{isLoading && (
				<div className="doc-btn__load">
					<LoadIcon />
				</div>
			)}
		</div>
	);
}

export default DocBtn;
