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
    hasFilteringMenu?: boolean;
    tweetsMaxMin?: number[];
    tweetsRangeFunc?: Function;
    redditsMaxMin?: number[];
    redditsRangeFunc?: Function;
    newsMaxMin?: number[];
    newsRangeFunc?: Function;
}

export default function MainScreen({ children, hasTopBar = true, hasFilteringMenu = false, tweetsMaxMin, tweetsRangeFunc, redditsMaxMin, redditsRangeFunc, newsMaxMin, newsRangeFunc } : MainScreenProps): JSX.Element {
    const classes = useStyles();
    const topBar = hasTopBar ? (
        <TopBar hasFilteringMenu={hasFilteringMenu} tweetsMaxMin={tweetsMaxMin} tweetsRangeFunc={tweetsRangeFunc} redditsMaxMin={redditsMaxMin} redditsRangeFunc={redditsRangeFunc} newsMaxMin={newsMaxMin} newsRangeFunc={newsRangeFunc}/>
    ): "";
    return (
        <Grid id={"GridWrapper"}>
            {topBar}
            <div className={classes.contentWrapper}>
                {children}
            </div>
        </Grid>
    );
}
