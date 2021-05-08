import React from "react";
import "../../css/MainScreen.css";
import {
    Grid,
    makeStyles,
} from "@material-ui/core";
import TopBar from "../../components/TopBar";

const useStyles = makeStyles(() => ({
    contentWrapper: {
        flex: "1 1 auto",
        overflowY: "auto",
        height: "100vh",
    },
}));

type MainScreenProps = {
    children: React.ReactChild | React.ReactFragment | React.ReactPortal | boolean;
    hasTopBar?: boolean;
}

export default function MainScreen({ children, hasTopBar = true } : MainScreenProps): JSX.Element {
    const classes = useStyles();
    const topBar = hasTopBar ? <TopBar /> : "";
    return (
        <Grid id={"GridWrapper"}>
            {topBar}
            <div className={classes.contentWrapper}>
                {children}
            </div>
        </Grid>
    );
}
