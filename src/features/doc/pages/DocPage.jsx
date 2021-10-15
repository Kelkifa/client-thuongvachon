// import {useDispatch, useSelector} from "react-redux";

// import DocContent from "../components/DocContent";
// import DocHeader from "../components/DocHeader";

import React from "react";

// import {useLocation} from "react-router";

// import {docGetContent} from "../docSlice";
// import {useEffect} from "react";

// const useQuery = () => {
// 	return new URLSearchParams(useLocation().search);
// };

function DocPage(props) {
	// const dispatch = useDispatch();
	// // GET QUERY
	// const query = useQuery();
	// const typeQuery = query.get("type");
	// const titleQuery = query.get("title");

	// const docInfo = useSelector(state => state.docs);
	// const docContents = docInfo.contents;
	// const currContents = docContents.find(value => value.typeId === typeQuery);

	// const currContent =
	// 	currContents && titleQuery
	// 		? currContents.data.find(value => value._id === titleQuery)
	// 		: null;
	// console.log(`[doContenets]`, docContents);
	// console.log(`[currContents]`, currContents);
	// console.log(`[currContent]`, currContent);

	// const selectedType = docInfo.types.data.find(
	// 	value => value._id === typeQuery
	// );
	// // console.log(`[query]`, {type, title});

	// useEffect(() => {
	// 	// console.log(`[currContent]`, currContent);
	// 	if (currContents !== undefined || !typeQuery) return;
	// 	// console.log(`[typeQuery]`, typeQuery);
	// 	const fetchContent = async () => {
	// 		try {
	// 			const response = await dispatch(docGetContent({data: typeQuery}));
	// 			console.log(`[getcontent response]`, response);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};

	// 	fetchContent();
	// }, [typeQuery]);

	// SELECTOR
	// console.log(`[docInfo]`, docInfo.data.types);
	return (
		<div className="doc-page grid wide">
			{/* <DocHeader
				docTypes={docInfo.types.data}
				activedType={selectedType}
				activedTitle={titleQuery}
				titles={currContents !== undefined ? currContents.data : []}
			/>
			<div className="doc-page__content">
				<DocContent
					activedType={selectedType}
					activedTitle={titleQuery}
					content={currContent}
				/>
			</div> */}
			docpage
		</div>
	);
}

export default DocPage;
