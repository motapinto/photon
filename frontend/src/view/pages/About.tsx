import React from "react";
import MainScreen from "./templates/MainScreen";
import {
    Grid,
    makeStyles,
    Typography,
    List,
    ListItemText,
    ListItemAvatar,
    ListItem
} from "@material-ui/core";
import logo from "../../images/photon-logo.png";

const useStyles = makeStyles(() => ({
    aboutContent: {
        color: "white",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: "3rem",
        minHeight: "100vh",
        flexWrap: "nowrap",
    },
    aboutHeader: {
        marginTop: "7rem",
        paddingBottom: "1rem",
    },
    list: {
        listStyle: ""
    },
    logoPhoton: {
        maxWidth: "100%",
        maxHeight: "2vh",
        filter: "hue-rotate(180deg)",
        "&:hover": {
            filter: "hue-rotate(360deg) brightness(200%)",
            transition: "all 1s ease-in-out",
        }
    },
}));

export default function About(): JSX.Element {
    const classes = useStyles();

    return (
        <MainScreen>
            <Grid container direction="column" className={classes.aboutContent}>
                <Typography variant="h4" className={classes.aboutHeader}>
                    Description
                </Typography>
                <Typography variant="body1">
                    Photon is an application capable of:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <img src={logo} alt="Photon Logo" className={classes.logoPhoton} />
                        </ListItemAvatar>
                        <ListItemText>
                            Extracting and analyzing energy related data from various sources
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <img src={logo} alt="Photon Logo" className={classes.logoPhoton} />
                        </ListItemAvatar>
                        <ListItemText>
                            Detecting and identifying real, high growth opportunities within the energy market and industry
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <img src={logo} alt="Photon Logo" className={classes.logoPhoton} />
                        </ListItemAvatar>
                        <ListItemText>
                            Showcasing that information to the user in an easy to use graph-based visual interface
                        </ListItemText>
                    </ListItem>
                </List>
                <Typography variant="h4" className={classes.aboutHeader}>
                    Motivation
                </Typography>
                <Typography variant="body1">
                    Every day, we learn about emerging technologies and developments that have the potential to be groundbreaking. But how do we detect the early proof-of-concept, non-obvious opportunities with real growth potential?
                    This leads us to the broad topic of Energy. It’s one of the biggest drivers for global issues like climate change, and when starting new projects and companies, it’s important to make sure the problem is relevant.
                    The process of determining whether a problem is prossiming enough is not trivial. How can we gather and treat the vast amount of data revolving around energy to detect the most promising, emerging and non-obvious problems that need to be solved?
                </Typography>
                <Typography variant="h4" className={classes.aboutHeader}>
                    Data sources
                </Typography>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <img src={logo} alt="Photon Logo" className={classes.logoPhoton} />
                        </ListItemAvatar>
                        <ListItemText>
                            Reddit API
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <img src={logo} alt="Photon Logo" className={classes.logoPhoton} />
                        </ListItemAvatar>
                        <ListItemText>
                            Twitter API
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <img src={logo} alt="Photon Logo" className={classes.logoPhoton} />
                        </ListItemAvatar>
                        <ListItemText>
                            Usearch API
                        </ListItemText>
                    </ListItem>
                </List>
            </Grid>
        </MainScreen>
    );
}
