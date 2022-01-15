// import ButtonTest from "./components/ButtonTest";

import "./develop.scss";

import ContentDropdown from "components/Dropdown/ContentDropdown";
import MultiCheckboxForm from "components/Form/MultiCheckboxForm";
import React from "react";

const testArr = ["1-sdadas", "2-asdasd", "3-asdasd"];
function Develop(props) {
	return (
		<div className="grid wide develop">
			<MultiCheckboxForm dataList={testArr}>
				{multiValue => {
					const {handleChange, handleCheckedAll, checkedData} = multiValue;
					console.log(checkedData);
					return (
						<ul>
							<li>
								<input
									type="checkbox"
									checked={
										checkedData.findIndex(value => value === undefined) === -1
									}
									onChange={e => {
										handleCheckedAll(e.target.checked);
									}}
								/>{" "}
								check all
							</li>
							{testArr.map((value, index) => (
								<li key={index}>
									<input
										type="checkbox"
										checked={checkedData[index] ? true : false}
										onChange={e => {
											handleChange(e.target.checked, index);
										}}
									/>
									{value}
								</li>
							))}
						</ul>
					);
				}}
			</MultiCheckboxForm>
		</div>
	);
}

export default Develop;
