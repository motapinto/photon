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
import FilteringMenu from "../components/FilteringMenu";

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

interface TopBarProps {
    hasFilteringMenu?: boolean;
    tweetsMaxMin?: number[];
    tweetsRangeFunc?: Function;
    redditsMaxMin?: number[];
    redditsRangeFunc?: Function;
    newsMaxMin?: number[];
    newsRangeFunc?: Function;
}

export default function TopBar({hasFilteringMenu = false, tweetsMaxMin = [0,0], tweetsRangeFunc, redditsMaxMin = [0,0], redditsRangeFunc, newsMaxMin = [0,0], newsRangeFunc}: TopBarProps): JSX.Element {
    const classes = useStyles();
    const menu = hasFilteringMenu ? (
        <div className={classes.link}>
            <FilteringMenu tweetsMaxMin={tweetsMaxMin} tweetsRangeFunc={tweetsRangeFunc} redditsMaxMin={redditsMaxMin} redditsRangeFunc={redditsRangeFunc} newsMaxMin={newsMaxMin} newsRangeFunc={newsRangeFunc} />
        </div>
    ) : "";

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
                    {menu}
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
