import React from "react";
import "../css/MainScreen.css";
import {
    Typography,
    Grid,
    makeStyles,
} from "@material-ui/core";
import Form from 'react-bootstrap/Form';

const useStyles = makeStyles(() => ({
    rangeLabel: {
        marginRight: "1rem",
    }
}));

export default function FilteringMenu(): JSX.Element {
    const classes = useStyles();
    //@ts-ignore
    let newsValue = document.getElementById("relatedNews")?.value;
    //@ts-ignore
    let postsValue = document.getElementById("relatedPosts")?.value;
    //@ts-ignore
    let growthValue = document.getElementById("valueGrowth")?.value;

    /*const newsSlider = document.getElementById("relatedNews");
    newsSlider?.onchange = function() {
        //@ts-ignore
        //newsValue = newsSlider?.value;
    }*/

    return (
        <div id="FilteringMenu">
            <Grid container direction="column">
                <Typography variant="h6">
                    Filtering Menu
                </Typography>
            </Grid>
            <Form>
                <Form.Label>Node labels</Form.Label>
                <div key={"inline-checkbox1"} className="mb-3">
                    <Form.Check inline label="Origin" type={"checkbox"} defaultChecked  />
                    <Form.Check inline label="Major Sector" type={"checkbox"} defaultChecked  />
                    <Form.Check inline label="Sub Sector" type={"checkbox"} defaultChecked  />
                </div>
                <div key={"inline-checkbox2"} className="mb-3">
                    <Form.Check inline label="Article" type={"checkbox"} defaultChecked  />
                    <Form.Check inline label="Country" type={"checkbox"} defaultChecked  />
                </div>
            </Form>
            <Form>
                <Form.Group controlId="relatedNews">
                    <Form.Label className={classes.rangeLabel}>
                        Min Number of Related News: <span id="outputNews">{newsValue}</span>
                    </Form.Label>
                    <Form.Control type="range" min="0" max="10000" step="500"/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group controlId="relatedPosts">
                    <Form.Label className={classes.rangeLabel}>
                        Min Number of Related Posts: <span id="outputPosts">{postsValue}</span>
                    </Form.Label>
                    <Form.Control type="range" min="0" max="10000" step="500"/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group controlId="valueGrowth">
                    <Form.Label className={classes.rangeLabel}>
                        Min Value of Growth: <span id="outputGrowth">{growthValue}</span>
                    </Form.Label>
                    <Form.Control type="range" min="0" max="10000" step="500"/>
                </Form.Group>
            </Form>
            <Form.Group controlId="formGridState">
                <Form.Label>From Country</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                </Form.Control>
            </Form.Group>
        </div>
    );
}
