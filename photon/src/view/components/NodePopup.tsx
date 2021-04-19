import React from "react";
import {
    Card,
    CardContent,
    Typography,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Node from "../../model/node";
import Article from "../../model/article";
import Area from "../../model/area";
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
            case labels.majorArea:
            case labels.subArea: {
                const area = node as Area;
                content = (
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {area.id} - {area.label}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Name: {area.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Growth: {area.growth}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Number of news: {area.numNews}
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

    return (
        <Card className={classes.root} variant="outlined">
            {content}
        </Card>
    );
}
