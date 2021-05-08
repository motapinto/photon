import React from "react";
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    Button,
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
        fontSize: 14,
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
});

interface PopupProps {
    node: Node | undefined;
}

export default function NodePopup({node}: PopupProps): JSX.Element {
    const classes = useStyles();

    let content;
    if (node === undefined)
        content = (<CardContent />);
    else {   
        switch(node.label) {
            case labels.article: {
                const article = node as Article;
                content = (
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {article.id} - {article.label}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Title: {article.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Published at: {article.publishedAt}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Score: {article.score}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            URL: {article.url}
                        </Typography>
                    </CardContent>
                );
                break;
            }
            case labels.origin:
            case labels.majorArea:
            case labels.subArea: {
                const sector = node as Sector;
                content = (
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {sector.id} - {sector.label}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Name: {sector.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Growth: {sector.growth}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Number of news: {sector.numNews}
                        </Typography>
                    </CardContent>
                );
                break;
            }
            case labels.country: {
                const country = node as Country;
                content = (
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {country.id} - {country.label}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Name: {country.name}
                        </Typography>
                    </CardContent>
                );
                break;
            }
        }
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
            {content}
        </Card>
    );
}
