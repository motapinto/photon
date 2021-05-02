import React, { useEffect } from "react";
import MainScreen from "./templates/MainScreen";
import "../css/Home.css";
import logo from "../../images/photon-logo.png";
import {
    makeStyles,
    Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import routes from  "../../routes.json";

const useStyles = makeStyles(() => ({
    logoPhoton: {
        maxWidth: "100%",
        maxHeight: "30vh",
        position: "fixed",
        top: "50%",
        left: "50%",
        zIndex: 1,
        transform: "translate(-50%,-50%)",
        transition: "all 1s ease-in-out",
        "&:hover": {
            filter: "hue-rotate(360deg) brightness(200%)",
            cursor: "pointer",
            maxHeight: "20vh",
            transition: "all 1s ease-in-out",
        }
    },
    company: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        opacity: "0%",
        transition: "all 1s ease-in-out",
    },
}));

export default function About(): JSX.Element {
    const classes = useStyles();
    const path = routes.graph;

    useEffect(() => {   
        const homeLogo = document.getElementById('homeLogo');
        const body = document.body;
        if (homeLogo) homeLogo.onmouseover = function() {
            body.id = 'changeColor';
        }
        if (homeLogo) homeLogo.onmouseout = function() {
            body.id = '';
        }
    });

    return (
        <MainScreen hasTopBar={false}>
            <Link to={path}>
                <img src={logo} alt="Photon Logo" className={classes.logoPhoton} id="homeLogo" />
                <Typography variant="h1" className={classes.company} id="leftLogo">
                    Ph
                </Typography>
                <Typography variant="h1" className={classes.company} id="rightLogo">
                    ton
                </Typography>
            </Link>
        </MainScreen>
    );
}
