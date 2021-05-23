import React from "react";
import "../css/MainScreen.css";
import {
    makeStyles,
} from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import { DropdownButton, ButtonGroup } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
    const { createSliderWithTooltip } = Slider;
    const Range = createSliderWithTooltip(Slider.Range);

    return (
        <DropdownButton
            as={ButtonGroup}
            key={"down"}
            id={"dropdown-button-drop-down"}
            drop={"down"}
            variant={"secondary"}
            title={"Filtering Menu"}
        >
            <div>
                <Form>
                    <Form.Label className={classes.label}>Node labels</Form.Label>
                    <div key={"inline-checkbox1"} className="mb-3">
                        <Form.Check inline label="News Article" type={"checkbox"} defaultChecked  />
                        <Form.Check inline label="Twitter Post" type={"checkbox"} defaultChecked  />
                    </div>
                    <div key={"inline-checkbox2"} className="mb-3">
                        <Form.Check inline label="Reddit Post" type={"checkbox"} defaultChecked  />
                    </div>
                </Form>
                <Form>
                    <Form.Group controlId="relatedNews" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Range Number of Related News:
                        </Form.Label>
                        <Range min={0} max={10000} defaultValue={[0, 10000]} step={500} 
                            tipFormatter={value => `${value}`}
                            pushable
                            trackStyle={[{ backgroundColor: '#0d6efd' }]}
                            handleStyle={[{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }]}
                        />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group controlId="relatedPosts" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Range Number of Related Posts:
                        </Form.Label>
                        <Range min={0} max={10000} defaultValue={[0, 10000]} step={500} 
                            tipFormatter={value => `${value}`}
                            pushable
                            trackStyle={[{ backgroundColor: '#0d6efd' }]}
                            handleStyle={[{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }]} 
                        />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group controlId="valueGrowth" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Range Value of Growth:
                        </Form.Label>
                        <Range min={0} max={10000} defaultValue={[0, 10000]} step={500} 
                            tipFormatter={value => `${value}`}
                            pushable
                            trackStyle={[{ backgroundColor: '#0d6efd' }]}
                            handleStyle={[{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }]} 
                        />
                    </Form.Group>
                </Form>
            </div>
        </DropdownButton>
    );
}
