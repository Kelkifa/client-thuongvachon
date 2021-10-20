import "./docUpdatePage.scss";

import {useDispatch, useSelector} from "react-redux";

import DocFormUpdate from "../components/DocFormUpdate";
import DocNotifice from "../components/DocNotifice";
import LoadIcon from "components/LoadIcon";
import React from "react";
import {docGetContent} from "../docSlice";
import {useEffect} from "react";
import {useParams} from "react-router";
import {useRef} from "react";
import {useState} from "react";

// import PropTypes from 'prop-types';

// DocUpdatePage.propTypes = {

// };

function DocUpdatePage(props) {
	// useRef
	const titleEle = useRef();

	// useDispatch
	const dispatch = useDispatch();

	// useParams
	const params = useParams();
	const {typeId, contentId} = params;

	const type = useSelector(state => {
		if (!typeId) return undefined;
		return state.docs.types.data.find(type => type._id === typeId);
	});

	// useSelector
	const content = useSelector(state => {
		const doc = state.docs.contents.find(content => content.typeId === typeId);
		if (!doc) return undefined;
		return doc.data.find(content => content._id === contentId);
	});

	// useState
	const [isLoading, setIsLoading] = useState(
		content === undefined ? true : false
	);
	const [errFlag, setErrFlag] = useState(false);

	const [notifice, setNotifice] = useState({
		isProcessed: false,
		type: "success",
	});

	// useEffect
	useEffect(() => {
		if (content) return;

		const fetchContent = async () => {
			try {
				const response = await dispatch(docGetContent({data: typeId}));
				setIsLoading(false);
				console.log(`[FETCH UPDATE CONTENT]`, response);
				if (
					response.payload.success === false ||
					typeof response.payload.response !== "object"
				) {
					setErrFlag(true);
					return;
				}
				if (
					response.payload.response.findIndex(
						content => content._id === contentId
					) === -1
				) {
					setErrFlag(true);
					return;
				}
			} catch (err) {
				console.log(`[FETCH UPDATE CONTENT ERR]`, err);
			}
		};

		fetchContent();
	}, [typeId, content, dispatch, contentId]);

	// Render
	return (
		<div className="doc-update-page">
			<h2 className="doc-update-page__title">
				<div ref={titleEle}>Update {type && type.type}</div>
				{isLoading && (
					<div className="doc-update-page__title__load-notifice">
						{"( Đang tải tài liệu "}
						<LoadIcon /> {")"}
					</div>
				)}
			</h2>
			{notifice.isProcessed === true &&
				(notifice.type === "success" ? (
					<DocNotifice.Success text="Cập nhật nội dung thành công" />
				) : (
					<DocNotifice.Fail
						text={`Cập nhật nội dung không thành công (${notifice.type})`}
					/>
				))}
			{content && !errFlag && (
				<DocFormUpdate
					content={content}
					type={type}
					setNotifice={setNotifice}
					gotoElement={titleEle}
				/>
			)}
			{errFlag && <DocNotifice.Fail text="Không tìm thấy nội dung" />}
		</div>
	);
}

export default DocUpdatePage;
