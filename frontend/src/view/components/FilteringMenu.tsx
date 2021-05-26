import { useState } from "react";
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

interface FilteringMenuProps {
    tweetsMaxMin: number[];
    tweetsRangeFunc?: Function;
    redditsMaxMin: number[];
    redditsRangeFunc?: Function;
    newsMaxMin: number[];
    newsRangeFunc?: Function;
}

export default function FilteringMenu({tweetsMaxMin, tweetsRangeFunc, redditsMaxMin, redditsRangeFunc, newsMaxMin, newsRangeFunc}: FilteringMenuProps): JSX.Element {
    const classes = useStyles();
    const { createSliderWithTooltip } = Slider;
    const Range = createSliderWithTooltip(Slider.Range);
    const [tweetsRange, setTweetsRange] = useState([tweetsMaxMin[0], tweetsMaxMin[1]]);
    const [newsRange, setNewsRange] = useState([newsMaxMin[0], newsMaxMin[1]]);
    const [redditsRange, setRedditsRange] = useState([redditsMaxMin[0], redditsMaxMin[1]]);

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
                    <Form.Group controlId="relatedNews" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Range Number of Related News:
                        </Form.Label>
                        <Range min={newsMaxMin[0]} max={newsMaxMin[1]} defaultValue={newsRange} step={5}
                            tipFormatter={value => `${value}`}
                            pushable
                            trackStyle={[{ backgroundColor: '#0d6efd' }]}
                            handleStyle={[{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }]}
                            onAfterChange={value => {
                                setNewsRange(value);
                                if (newsRangeFunc) newsRangeFunc(value);
                            }}
                        />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group controlId="relatedRedditPosts" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Range Number of Reddit Posts:
                        </Form.Label>
                        <Range min={redditsMaxMin[0]} max={redditsMaxMin[1]} defaultValue={redditsRange} step={5}
                            tipFormatter={value => `${value}`}
                            pushable
                            trackStyle={[{ backgroundColor: '#0d6efd' }]}
                            handleStyle={[{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }]}
                            onAfterChange={value => {
                                setRedditsRange(value);
                                if (redditsRangeFunc) redditsRangeFunc(value);
                            }}
                        />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group controlId="relatedTwitterPosts" className={classes.displayCol}>
                        <Form.Label className={classes.label}>
                            Range Number of Twitter Posts:
                        </Form.Label>
                        <Range min={tweetsMaxMin[0]} max={tweetsMaxMin[1]} defaultValue={tweetsRange} step={5}
                            tipFormatter={value => `${value}`}
                            pushable
                            trackStyle={[{ backgroundColor: '#0d6efd' }]}
                            handleStyle={[{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }]}
                            onAfterChange={value => {
                                setTweetsRange(value);
                                if (tweetsRangeFunc) tweetsRangeFunc(value);
                            }}
                        />
                    </Form.Group>
                </Form>
            </div>
        </DropdownButton>
    );
}
