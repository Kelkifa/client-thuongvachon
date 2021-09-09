import "./table.scss";

import PropTypes from "prop-types";

Table.propTypes = {
	headerList: PropTypes.array,
};

Table.defaultProps = {
	headerList: [],
};

function Table(props) {
	// PROPS
	const {headerList, children} = props;

	// RENDER
	return (
		<div className="custom-scroll">
			<table className="component-table" style={{width: "100%"}}>
				<thead>
					<tr>
						{headerList.map(header => (
							<th key={header}>{header}</th>
						))}
					</tr>
				</thead>

				<tbody>{children}</tbody>
			</table>
		</div>
	);
}

export default Table;
