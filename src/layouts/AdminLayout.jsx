import "./adminLayout.scss";

import React, {useState} from "react";

import Header from "features/admin/components/Header";
import Leftbar from "features/admin/components/Leftbar";

// import Header from "features/Admin/components/Header";
// import Leftbar from "features/Admin/components/Leftbar";

export const HeaderContext = React.createContext("/");

function AdminLayout(props) {
	const {children} = props;

	// STATES
	const [isShowLeftbar, setIsShowLeftbar] = useState(true);

	const [currUrl, setCurrUrl] = useState("/");

	// HANDLE FUNCTIONS
	// Show/hide leftbar
	const handleShowHideLeftbar = () => {
		setIsShowLeftbar(!isShowLeftbar);
	};
	const handleHeaderChange = value => {
		setCurrUrl(value);
	};

	return (
		<div className="admin-layout">
			<div
				className={
					isShowLeftbar
						? "admin-layout__leftbar"
						: "admin-layout__leftbar admin-layout__leftbar--hide"
				}
			>
				<Leftbar isShow={isShowLeftbar} />

				<div
					className="admin-layout__leftbar__btn"
					onClick={handleShowHideLeftbar}
				>
					h
				</div>
			</div>
			<div
				className={
					isShowLeftbar
						? "admin-layout__content custom-scroll"
						: "admin-layout__content custom-scroll admin-layout__content--full-width"
				}
			>
				<div className="admin-layout__content__header">
					<Header />
				</div>
				<div className="admin-layout__content__detail">{children}</div>
			</div>
		</div>
	);
}

export default AdminLayout;
