import React, { useEffect, useState } from "react";
import "../css/MainScreen.css";
import {
    makeStyles,
} from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import { DropdownButton, ButtonGroup } from 'react-bootstrap';

const useStyles = makeStyles(() => ({
    label: {
        marginRight: "1rem",
        marginTop: "1rem",
    },
    displayCol: {
        display: "flex",
        flexDirection: "column",
    },
}));

export default function FilteringMenu(): JSX.Element {
    const classes = useStyles();
    const newsSlider = document.getElementById("relatedNews");
    const postsSlider = document.getElementById("relatedPosts");
    const growthSlider = document.getElementById("valueGrowth");
    
    //@ts-ignore
    const [newsValue, setNews] = useState(0);
    //@ts-ignore
    const [postsValue, setPosts] = useState(0);
    //@ts-ignore
    const [growthValue, setGrowth] = useState(0);

    useEffect(() => {
        if (newsSlider) newsSlider.oninput = function() {
            //@ts-ignore
            setNews(newsSlider?.value);
        }
        if (postsSlider) postsSlider.oninput = function() {
            //@ts-ignore
            setPosts(postsSlider?.value);
        }
        if (growthSlider) growthSlider.oninput = function() {
            //@ts-ignore
            setGrowth(growthSlider?.value);
        }
    }, [newsSlider, postsSlider, growthSlider]);

    return (
        <DropdownButton
            as={ButtonGroup}
            key={"down"}
            id={"dropdown-button-drop-down"}
            drop={"down"}
            variant="secondary"
            title={"Filtering Menu"}
        >
            <div>
                <Form>
                    <Form.Label className={classes.label}>Node labels</Form.Label>
                    <div key={"inline-checkbox1"} className="mb-3">
                        <Form.Check inline label="Origin" type={"checkbox"} defaultChecked  />
                        <Form.Check inline label="Energy Sector" type={"checkbox"} defaultChecked  />
                        <Form.Check inline label="Twitter Post" type={"checkbox"} defaultChecked  />
                    </div>
                    <div key={"inline-checkbox2"} className="mb-3">
                        <Form.Check inline label="Reddit Post" type={"checkbox"} defaultChecked  />
                    </div>
                </Form>
                <Form>
                    <Form.Group controlId="relatedNews" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Min/Max Number of Related News: <span id="outputNews">{newsValue}</span>
                        </Form.Label>
                        <Form.Control type="range" min="0" max="10000" step="500" defaultValue="0"/>
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group controlId="relatedPosts" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Min/Max Number of Related Posts: <span id="outputPosts">{postsValue}</span>
                        </Form.Label>
                        <Form.Control type="range" min="0" max="10000" step="500" defaultValue="0"/>
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group controlId="valueGrowth" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Min/Max Value of Growth: <span id="outputGrowth">{growthValue}</span>
                        </Form.Label>
                        <Form.Control type="range" min="0" max="10000" step="500" defaultValue="0"/>
                    </Form.Group>
                </Form>
                <Form.Group controlId="formGridState">
                    <Form.Label className={classes.label}>From Country</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                </Form.Group>
            </div>
        </DropdownButton>
    );
}
