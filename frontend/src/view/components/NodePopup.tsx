import React from "react";
import {
    //Card,
    CardContent,
    Typography,
    makeStyles,
    Button,
} from '@material-ui/core';
import { Card, ListGroup } from 'react-bootstrap';
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
    cardAttribute: {
        fontWeight: "bold",
    }
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
                            <span className={classes.cardAttribute}>Name:</span> {sector.name}
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
                        <Card.Subtitle className="mb-2 text-muted">{new Date(tweet.createdAt).toString()}</Card.Subtitle>
                        <Card.Text>
                            {tweet.text}
                        </Card.Text>
                        <ListGroup variant="flush">
                            <ListGroup.Item><span className={classes.cardAttribute}>Like count:</span> {tweet.likeCount}</ListGroup.Item>
                            <ListGroup.Item><span className={classes.cardAttribute}>Retweet count:</span> {tweet.retweetCount}</ListGroup.Item>
                            <ListGroup.Item><span className={classes.cardAttribute}>Quote count:</span> {tweet.quoteCount}</ListGroup.Item>
                            <ListGroup.Item><span className={classes.cardAttribute}>Reply count:</span> {tweet.replyCount}</ListGroup.Item>
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
                            <span className={classes.cardAttribute}>Title:</span> "{article.title}"
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Content:</span> "{article.snippet}"
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Creation date:</span> {article.datePublished}
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
                            <span className={classes.cardAttribute}>Content:</span> "{redditComment.body}"
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Author:</span> {redditComment.author}
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Subreddit:</span> {redditComment.subreddit}
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Score:</span> {redditComment.score}
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
                            <span className={classes.cardAttribute}>Title:</span> "{redditSubmission.title}"
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Author:</span> {redditSubmission.author}
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Subreddit:</span> {redditSubmission.subreddit}
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Subreddit Subscribers:</span> {redditSubmission.subredditSubscribers}
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Number of comments:</span> {redditSubmission.numComments}
                        </Typography>
                        <Typography className={classes.pos}>
                            <span className={classes.cardAttribute}>Score:</span> {redditSubmission.score}
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
                <Card.Title>{label}</Card.Title>
                {cardContent}
            </Card.Body>
            <Button className={classes.closeButton} onClick={closePopup}>
                Close
            </Button>
        </Card>
    );
}
