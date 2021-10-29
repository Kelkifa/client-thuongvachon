import "./leftbar.scss";

import {FaBook, FaGamepad, FaUserFriends} from "react-icons/fa";

import AdminDropdown from "./Dropdown/AdminDropdown";
import AdminLeftbarDropdown from "./AdminLeftbarDropdown";
import {BsFillBarChartFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {RiAdminFill} from "react-icons/ri";
import {linkStyle} from "assets/styles/styles";

// import AdminDropdown from "components/Dropdown/AdminDropdown";





// import {MdBorderColor} from "react-icons/md";

// import {SiInstacart} from "react-icons/si";

// import AdminDropdown from "../../../components/Dropdown/AdminDropdown";

Leftbar.propTypes = {
	isShow: PropTypes.bool,
};
Leftbar.defaultProps = {
	isShow: true,
};
function Leftbar(props) {
	const {isShow} = props;

	return (
		<div
			className={
				isShow
					? "admin-leftbar custom-scroll"
					: "admin-leftbar custom-scroll admin-leftbar--hide"
			}
		>
			<h2 className="admin-leftbar__header">
				<RiAdminFill className="admin-leftbar__header__icon" />
				<span className="admin-leftbar__header__text">Admin</span>
			</h2>
			<ul className="admin-leftbar__tabs">
				<Link to="/" style={linkStyle}>
					<li className="admin-leftbar__tabs__item grid">
						<div className="row-c14">
							<BsFillBarChartFill className="admin-leftbar__tabs__item__icon c-2" />
							<div className="admin-leftbar__tabs__item__text c-12">
								DataBoard
							</div>
						</div>
					</li>
				</Link>
				<li className="admin-leftbar__tabs__title">EXTRAS</li>
				<li>
					<AdminDropdown>
						{(handleClick, isShow) => {
							return (
								<AdminLeftbarDropdown
									iconComponennt={<FaBook />}
									showText="Pages"
									hideTextList={[
										{to: "/", text: "Home"},
										{to: "/admin", text: "Admin"},
										{to: "/playTogether", text: "Game"},
									]}
									handleClick={handleClick}
									isShow={isShow}
								/>
							);
						}}
					</AdminDropdown>
				</li>

				<li className="admin-leftbar__tabs__title">MANAGE</li>

				<li>
					<AdminDropdown>
						{(handleClick, isShow) => {
							return (
								<AdminLeftbarDropdown
									iconComponennt={<FaUserFriends />}
									showText="Users"
									hideTextList={[
										{to: "/", text: "Table"},
										{to: "/", text: "Create"},
										{to: "/", text: "Trash"},
									]}
									handleClick={handleClick}
									isShow={isShow}
								/>
							);
						}}
					</AdminDropdown>
				</li>

				<li>
					<AdminDropdown>
						{(handleClick, isShow) => {
							return (
								<AdminLeftbarDropdown
									iconComponennt={<FaGamepad />}
									showText="Games"
									hideTextList={[
										{to: "/admin/games/list", text: "Table"},
										{to: "/admin/games/create", text: "Create"},
										{to: "/admin/games/trash", text: "Trash"},
									]}
									handleClick={handleClick}
									isShow={isShow}
								/>
							);
						}}
					</AdminDropdown>
				</li>
			</ul>
		</div>
	);
}

export default Leftbar;

// showComponent={

// }
// hideComponent={

// }
