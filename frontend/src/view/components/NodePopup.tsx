import React from "react";
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    Button,
    Grid,
} from '@material-ui/core';
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import Node from "../../model/node";
import Sector from "../../model/sector";
import Tweet from "../../model/tweet";
import mainLabels from "../../model/labels.json";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: "50%",
        position: "fixed",
        zIndex: 1,
        top: "20%",
        left: "5%",
    },
    title: {
        marginBottom: "1rem",
    },
    pos: {
        marginBottom: 12,
    },
    closeButton: {
        float: "right",
        backgroundColor: "#b57c80",
        "&:hover": {
            backgroundColor: "#a46c80",
        },
    },
    id: {
        backgroundColor: "rgb(8, 62, 105)",
        color: "white",
        padding: ".5rem",
        borderRadius: ".25rem",
        marginRight: "1rem",
    },
    label: {
        backgroundColor: "#a65924",
        color: "white",
        padding: ".5rem",
        borderRadius: ".25rem",
        marginRight: "1rem",
    },
    contentDiv: {
        color: "rgba(8,4,20,1)",
    },
    dislike: {
        marginLeft: "2rem",
    },
});

interface PopupProps {
    node: Node | undefined;
}

export default function NodePopup({node}: PopupProps): JSX.Element {
    const classes = useStyles();

    let cardContent = (<CardContent />);
    let content;
    let label;
    if (node !== undefined) {
        switch(node.label) {
            case mainLabels.class: {
                const sector = node as Sector;
                label = "Energy Sector";
                content = (
                    <div className={classes.contentDiv}>
                        <Typography className={classes.pos}>
                            Name: {sector.name}
                        </Typography>
                        <Typography className={classes.pos}>
                            URI: {sector.uri}
                        </Typography>
                    </div>
                );
                break
            }
            case mainLabels.twitter: {
                const tweet = node as Tweet;
                label = "Tweet";
                content = (
                    <div className={classes.contentDiv}>
                        <Typography className={classes.pos}>
                            Content: "{tweet.text}"
                        </Typography>
                        <Typography className={classes.pos}>
                            Author ID: {tweet.authorId}
                        </Typography>
                        <Typography className={classes.pos}>
                            Creation date: {tweet.createdAt}
                        </Typography>
                        <Typography className={classes.pos}>
                            <ThumbUp />{tweet.likeCount}
                            <ThumbDown className={classes.dislike}/>{tweet.dislikeCount}
                        </Typography>
                        <Typography className={classes.pos}>
                            Quote count: {tweet.quoteCount}
                        </Typography>
                        <Typography className={classes.pos}>
                            Reply count: {tweet.replyCount}
                        </Typography>
                        <Typography className={classes.pos}>
                            Retweet count: {tweet.retweetCount}
                        </Typography>
                    </div>
                );
                break
            }
            case mainLabels.reddit: {
                break
            }
        }

        cardContent = (
            <CardContent>
                <Grid container direction="row" className={classes.title}>
                    <Typography gutterBottom className={classes.id}>
                        {node.id}
                    </Typography>
                    <Typography gutterBottom className={classes.label}>
                        {label}
                    </Typography>
                </Grid>
                {content}
            </CardContent>
        );
    }

    function closePopup() {
        const popup = document.getElementById("popup");
        if (popup) popup.setAttribute("style", "display: none");
    }

    return (
        <Card className={classes.root} variant="outlined" id="popup">
            <Button className={classes.closeButton} onClick={closePopup}>
                X
            </Button>
            {cardContent}
        </Card>
    );
}
