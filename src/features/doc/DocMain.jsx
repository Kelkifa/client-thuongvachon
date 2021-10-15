import "./docMain.scss";

import {Route, Switch, useRouteMatch} from "react-router";

import DocContentPage from "./pages/DocContentPage";
import DocHeader from "./components/DocHeader";
import DocTypePage from "./pages/DocTypePage";
import NotFound from "components/NotFound";
import React from "react";

// import DocContent from "./components/DocContent";

// import DocIntro from "./pages/DocIntro";

// import DocForm from "./components/DocForm";

// import DocPage from "./pages/DocPage";

function DocMain(props) {
	const match = useRouteMatch();
	return (
		<div className="doc-page grid wide">
			<DocHeader />
			<Switch>
				<Route exact path={`${match.url}/:id`} component={DocContentPage} />
				<Route exact path={`${match.url}`} component={DocTypePage} />
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default DocMain;
