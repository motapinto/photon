import React from "react";
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    Button,
    Grid,
} from '@material-ui/core/';
import Node from "../../model/node";
import Article from "../../model/article";
import Sector from "../../model/sector";
import Country from "../../model/country";
import labels from "../../model/labels.json";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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
    }
});

interface PopupProps {
    node: Node | undefined;
}

export default function NodePopup({node}: PopupProps): JSX.Element {
    const classes = useStyles();

    let cardContent = (<CardContent />);
    let label;
    let content;
    if (node !== undefined) {   
        switch(node.label) {
            case labels.article: {
                const article = node as Article;
                label = "Article";
                content = (
                    <div className={classes.contentDiv}>
                        <Typography className={classes.pos}>
                            Title: {article.title}
                        </Typography>
                        <Typography className={classes.pos}>
                            Published at: {article.publishedAt}
                        </Typography>
                        <Typography className={classes.pos}>
                            Score: {article.score}
                        </Typography>
                        <Typography className={classes.pos}>
                            Visit the article <a href={article.url}>here</a>
                        </Typography>
                    </div>
                );
                break;
            }
            case labels.origin:
            case labels.majorArea:
            case labels.subArea: {
                const sector = node as Sector;
                if (node.label === labels.origin)
                    label = "Origin";
                else if (node.label === labels.majorArea)
                    label = "Major Sector";
                else label = "Sub Sector";
                content = (
                    <div className={classes.contentDiv}>
                        <Typography className={classes.pos}>
                            Name: {sector.name}
                        </Typography>
                        <Typography className={classes.pos}>
                            Growth: {sector.val}
                        </Typography>
                        <Typography className={classes.pos}>
                            Number of news: {sector.numNews}
                        </Typography>
                    </div>
                );
                break;
            }
            case labels.country: {
                const country = node as Country;
                label = "Country";
                content = (
                    <div className={classes.contentDiv}>
                        <Typography className={classes.pos}>
                            Name: {country.name}
                        </Typography>
                    </div>
                );
                break;
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
