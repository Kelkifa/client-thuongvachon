import "./docContent.scss";

import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router";

import DocCompileContent from "./DocCompileContent";
import DocForm from "./DocForm";
import DocRightBar from "./DocRightBar";
import React from "react";
import {docGetContent} from "../docSlice";
import {useEffect} from "react";
import {useState} from "react";

// import PropTypes from "prop-types";

// DocContent.propTypes = {
// activedType: PropTypes.object,
// activedTitle: PropTypes.string,
// content: PropTypes.object,
// };

// DocContent.defaultProps = {
// activedType: null,
// activedTitle: null,
// content: null,
// };

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

function DocContent(props) {
	// PROPS
	// const {activedType, activedTitle, content} = props;

	// QUERIES
	const query = useQuery();
	const title = query.get("title"); // default: null

	// PARAMS IS _ID OF DOC TYPE  {id: String}
	const params = useParams();
	const currType = useSelector(state =>
		state.docs.types.data.find(value => value._id === params.id)
	);

	// SELECTOR
	const docContents = useSelector(state => state.docs.contents);
	// console.log(`[DOCONTENT]`, docContents);

	const currContent = docContents.find(value => value.typeId === params.id); // undefined or content {typeId: String, loading: Boolean, error: Boolean, data: [String]}
	// console.log(`[currContent]`, currContent);

	// STATES
	const [isLoading, setIsLoading] = useState(
		currContent === undefined ? false : true
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const typeId = params.id;
		if (!typeId) return;
		if (currContent !== undefined) return;

		setIsLoading(true);

		const fetchContent = async () => {
			try {
				await dispatch(docGetContent({data: typeId}));
				setIsLoading(false);
			} catch (err) {
				console.log(`[fetch doc content ERROR]`, err);
			}
		};
		fetchContent();

		// const currC
		// console.log(`[isExisContent]`, isExistContent);
	}, [params.id, currContent, dispatch]);

	return (
		<div className="doc-content grid">
			<div className="row">
				<div className="doc-content__rightbar">
					<DocRightBar
						isLoading={isLoading}
						titles={
							currContent !== undefined
								? currContent.data.map(value => {
										return {_id: value._id, title: value.title};
								  })
								: []
						}
					/>
				</div>
			</div>
			<div className="doc-content__content">
				{title === null ? (
					<DocForm type={currType} isDataLoading={isLoading} />
				) : (
					<DocCompileContent
						content={
							currContent
								? currContent.data.find(index => index._id === title)
								: {}
						}
					/>
				)}
			</div>
		</div>
	);
}

export default DocContent;
