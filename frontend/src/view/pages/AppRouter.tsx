import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import About from "./About";
import Graph from "./Graph";
import Home from "./Home";
import { Typography } from "@material-ui/core";
import routes from  "../../routes.json";

export default function AppRouter(): JSX.Element {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path={routes.home}>
                    <Home />
                </Route>
                <Route exact path={routes.graph}>
                    <Graph />
                </Route>
                <Route exact path={routes.about}>
                    <About />
                </Route>
                <Route path="*">
                    <Typography>
                        <Home />
                    </Typography>
                </Route>
            </Switch>
        </Router>
    );
}
