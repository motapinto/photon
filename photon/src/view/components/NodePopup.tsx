import React from "react";
import {
    Card,
    CardContent,
    Typography,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

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
    nodeId: number;
}

export default function NodePopup({nodeId}: PopupProps): JSX.Element {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Node id {nodeId}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                </Typography>
            </CardContent>
        </Card>
    );
}
