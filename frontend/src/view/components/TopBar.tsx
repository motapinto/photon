import React from "react";
import "../css/MainScreen.css";
import {
    Typography,
    AppBar,
    Grid,
} from "@material-ui/core";
import logo from "../../images/photon-logo.png";

export default function TopBar(): JSX.Element {
    return (
        <AppBar position="fixed" color="primary" id={"TopBar"}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
                <img src={logo} alt="Photon Logo" />
                <Typography variant="h4" id="AppName">
                    Photon
                </Typography>
                <span />
            </Grid>
        </AppBar>
    );
}
