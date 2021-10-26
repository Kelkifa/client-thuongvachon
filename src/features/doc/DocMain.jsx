import "./docMain.scss";

import {Route, Switch, useRouteMatch} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import DocContentPage from "./pages/DocContentPage";
import DocHeader from "./components/DocHeader";
import DocTypePage from "./pages/DocTypePage";
import DocUpdatePage from "./pages/DocUpdatePage";
import NotFound from "components/NotFound";
import React from "react";
import {docGetTypes} from "./docSlice";
import {useEffect} from "react";

// import DocContent from "./components/DocContent";

// import DocIntro from "./pages/DocIntro";

// import DocForm from "./components/DocForm";

// import DocPage from "./pages/DocPage";

function DocMain(props) {
	const match = useRouteMatch();

	const {loading, error} = useSelector(state => ({
		loading: state.docs.types.loading,
		error: state.docs.types.error,
	}));

	const dispatch = useDispatch();

	useEffect(() => {
		if (!loading || error) return;
		const fetchDocType = async () => {
			try {
				await dispatch(docGetTypes());
				// console.log(`[DOC GET TYPE RESPONSE]`, response);
			} catch (err) {
				console.log(`[DOC GET TYPE ERR]`, err);
			}
		};
		fetchDocType();
	}, [loading, error, dispatch]);
	return (
		<div className="doc-page grid wide">
			<DocHeader />
			<Switch>
				<Route
					exact
					path={`${match.url}/:typeId/update/:contentId`}
					component={DocUpdatePage}
				/>
				<Route exact path={`${match.url}/:id`} component={DocContentPage} />
				<Route exact path={`${match.url}`} component={DocTypePage} />
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default DocMain;
