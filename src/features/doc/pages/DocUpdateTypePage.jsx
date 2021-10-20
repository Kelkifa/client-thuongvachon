import "./docUpdateTypePage.scss";

import {FastField, Formik} from "formik";

import React from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";

// import PropTypes from "prop-types";

// DocUpdateTypePage.propTypes = {};

function DocUpdateTypePage(props) {
	// useParams
	const params = useParams();
	const typeId = params.id;
	// useSelector
	const {loading, error} = useSelector(state => {
		const {loading, error} = state.docs.types;
		return {loading, error};
	});

	const type = useSelector(state => {
		if (!typeId) return undefined;
		const {loading, error} = state.docs.types;
		if (loading || error) return undefined;

		return state.docs.types.data.find(type => type._id === typeId);
	});

	console.log(`[type]`, type);

	// Render
	return (
		<div className="doc-update-type-page">
			<h2 className="doc-update-type-page__title">Update</h2>

			<Formik>
				{formikProps => {
					const {handleSubmit} = formikProps;

					return (
						<form>
							<FastField />
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default DocUpdateTypePage;
