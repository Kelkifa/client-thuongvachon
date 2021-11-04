import "./DocDetailPage.scss";

import BackButton from "components/MyButton/BackButton";
import DocTitleBtn from "../components/DocTitleBtn";
import React from "react";
import {docGetDetail} from "../docSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {useState} from "react";

function DocDetailPage(props) {
	const dispatch = useDispatch();

	const params = useParams();
	const {docId, groupId} = params;

	const doc = useSelector(state => {
		try {
			const foundDoc = state.docs.data.find(doc => doc._id === docId);
			return foundDoc ? foundDoc : {};
		} catch (err) {
			return {};
		}
	});

	const [loading, setLoading] = useState(doc.contents ? false : true);

	useEffect(() => {
		if (doc.contents) return;

		const fetchDocDetail = async () => {
			try {
				await dispatch(docGetDetail({docId, groupId}));
				setLoading(false);
			} catch (err) {
				console.log(`[Doc get detail errr]`, err);
			}
		};

		fetchDocDetail();
	}, [dispatch, doc.contents, docId]);

	//  Render
	return (
		<div className="doc-detail-page">
			<BackButton />
			{loading ? (
				"loading ..."
			) : (
				<div className="grid doc-detail-page__list">
					{/* <div className="row">
						{doc.contents.map(content => (
							<DocTitleBtn text={content.title} />
						))}
					</div> */}
				</div>
			)}
		</div>
	);
}

export default DocDetailPage;
