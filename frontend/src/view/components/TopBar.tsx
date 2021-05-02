import React from "react";
import "../css/MainScreen.css";
import {
    Typography,
    AppBar,
    Grid,
    makeStyles,
} from "@material-ui/core";
import logo from "../../images/photon-logo.png";
import { Link } from "react-router-dom";
import routes from  "../../routes.json";

const useStyles = makeStyles(() => ({
    navigationLinks: {
        marginLeft: "auto",
        width: "auto",
    },
    link: {
        marginRight: "2rem",
        textDecoration: "none",
        color: "rgb(8, 62, 105)",
        "&:hover": {
            color: "#a65924",
            transition: "all .5s ease-in-out",
        },
    },
    logo: {
        color: "white",
        display: "flex",
        textDecoration: "none",
    },
}));

export default function TopBar(): JSX.Element {
    const classes = useStyles();

    return (
        <AppBar position="fixed" color="primary" id={"TopBar"}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
                <Link to={routes.home} className={classes.logo}>
                    <img src={logo} alt="Photon Logo" />
                    <Typography variant="h4" id="AppName">
                        Photon
                    </Typography>
                </Link>
                <Grid className={classes.navigationLinks} container direction="row">
                    <Link to={routes.home} className={classes.link}>
                        <Typography variant="h5">
                            Home
                        </Typography>
                    </Link>
                    <Link to={routes.about} className={classes.link}>
                        <Typography variant="h5">
                            About us
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </AppBar>
    );
}
