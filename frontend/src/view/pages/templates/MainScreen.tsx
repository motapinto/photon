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
    },
}));

type MainScreenProps = {
    children: React.ReactChild | React.ReactFragment | React.ReactPortal | boolean;
}

export default function MainScreen({ children } : MainScreenProps): JSX.Element {
    const classes = useStyles();
    return (
        <Grid id={"GridWrapper"}>
            <TopBar />
            <div className={classes.contentWrapper}>
                {children}
            </div>
        </Grid>
    );
}
