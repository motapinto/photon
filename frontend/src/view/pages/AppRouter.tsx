import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Graph from "./Graph";
import { Typography } from "@material-ui/core";
import routes from  "../../routes.json";

export default function AppRouter(): JSX.Element {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path={routes.graph}>
                    <Graph />
                </Route>
                <Route path="*">
                    <Typography>
                        404 no page found
                    </Typography>
                </Route>
            </Switch>
        </Router>
    );
}