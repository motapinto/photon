import React, { useEffect } from "react";
import MainScreen from "./templates/MainScreen";
import logo from "../../images/photon-logo.png";
import {
    makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import routes from  "../../routes.json";

const useStyles = makeStyles(() => ({
    logoPhoton: {
        maxWidth: "100%",
        maxHeight: "40vh",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        "&:hover": {
            filter: "hue-rotate(360deg) brightness(200%)",
            cursor: "pointer",
            transition: "all 1s ease-in-out",
        },
    },
}));

export default function Home(): JSX.Element {
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
            </Link>
        </MainScreen>
    );
}
