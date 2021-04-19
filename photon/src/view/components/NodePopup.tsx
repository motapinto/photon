import React from "react";
import {
    Card,
    CardContent,
    Typography,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Node from "../../model/node";

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
    const card = node === undefined ? (
        <CardContent />
    ) :
    (
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Node id {node.id}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                adjective
            </Typography>
            <Typography variant="body2" component="p">
                well meaning and kindly.
            </Typography>
        </CardContent>
    );

    return (
        <Card className={classes.root} variant="outlined">
            {card}
        </Card>
    );
}
