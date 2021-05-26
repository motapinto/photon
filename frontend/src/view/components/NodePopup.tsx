import React from "react";
import {
    //Card,
    CardContent,
    Typography,
    makeStyles,
    Button,
    Grid,
} from '@material-ui/core';
import { Card, ListGroup } from 'react-bootstrap';
import { Favorite } from '@material-ui/icons';
import Node from "../../model/node";
import Sector from "../../model/sector";
import Tweet from "../../model/tweet";
import Article from "../../model/article";
import mainLabels from "../../model/labels.json";
import RedditComment from "../../model/redditComment";
import RedditSubmission from "../../model/redditSubmission";

const useStyles = makeStyles({
    root: {
        minWidth: 150,
        maxWidth: "30%",
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
        width: "100%",
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
                        <Card.Title>Energy Sector</Card.Title>
                        <Typography className={classes.pos}>
                            Name: {sector.name}
                        </Typography>
                        <Typography className={classes.pos}>
                            Click here for more info: <a href={sector.uri}>link</a>
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
                        <Card.Title>Tweet</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{tweet.createdAt}</Card.Subtitle>
                        <Card.Text>
                            {tweet.text}
                        </Card.Text>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Like count: {tweet.likeCount}</ListGroup.Item>
                            <ListGroup.Item>Retweet count: {tweet.retweetCount}</ListGroup.Item>
                            <ListGroup.Item>Quote count: {tweet.quoteCount}</ListGroup.Item>
                            <ListGroup.Item>Reply count: {tweet.replyCount}</ListGroup.Item>
                        </ListGroup>
                    </div>
                );
                break
            }
            case mainLabels.news: {
                const article = node as Article;
                label = "News Article";
                content = (
                    <div className={classes.contentDiv}>
                        <Typography className={classes.pos}>
                            Title: "{article.title}"
                        </Typography>
                        <Typography className={classes.pos}>
                            Content: "{article.snippet}"
                        </Typography>
                        <Typography className={classes.pos}>
                            Creation date: {article.datePublished}
                        </Typography>
                        <Typography className={classes.pos}>
                            Click here for more info: <a href={article.url}>link</a>
                        </Typography>
                    </div>
                );
                break
            }
            case mainLabels.redditComment: {
                const redditComment = node as RedditComment;
                label = "Reddit Comment";
                content = (
                    <div className={classes.contentDiv}>
                        <Typography className={classes.pos}>
                            Content: "{redditComment.body}"
                        </Typography>
                        <Typography className={classes.pos}>
                            Author: {redditComment.author}
                        </Typography>
                        <Typography className={classes.pos}>
                            Subreddit: {redditComment.subreddit}
                        </Typography>
                        <Typography className={classes.pos}>
                            Score: {redditComment.score}
                        </Typography>
                        <Typography className={classes.pos}>
                            Click here for more info: <a href={redditComment.permalink}>link</a>
                        </Typography>
                    </div>
                );
                break
            }
            case mainLabels.redditSubmission: {
                const redditSubmission = node as RedditSubmission;
                label = "Reddit Submission";
                content = (
                    <div className={classes.contentDiv}>
                        <Typography className={classes.pos}>
                            Title: "{redditSubmission.title}"
                        </Typography>
                        <Typography className={classes.pos}>
                            Author: {redditSubmission.author}
                        </Typography>
                        <Typography className={classes.pos}>
                            Subreddit: {redditSubmission.subreddit}
                        </Typography>
                        <Typography className={classes.pos}>
                            Subreddit Subscribers: {redditSubmission.subredditSubscribers}
                        </Typography>
                        <Typography className={classes.pos}>
                            Number of comments: {redditSubmission.numComments}
                        </Typography>
                        <Typography className={classes.pos}>
                            Score: {redditSubmission.score}
                        </Typography>
                        <Typography className={classes.pos}>
                            Click here for more info: <a href={redditSubmission.permalink}>link</a>
                        </Typography>
                    </div>
                );
                break
            }
            default:
                label = "Invalid";
                break;
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
        <Card className={classes.root} id="popup">
            <Card.Body>
                <Card.Title>Node Description</Card.Title>
                {cardContent}
            </Card.Body>
            <Button className={classes.closeButton} onClick={closePopup}>
                Close
            </Button>
        </Card>
    );
}
