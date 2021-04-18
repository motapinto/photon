import axios from "axios";

type GraphData = {
    nodes: [],
    links: [],
}

export function getGraphData(): Promise<GraphData> {
    return axios.get(
        "http://localhost:5000",
    ).then((response) =>
        response.data,
    ).catch((err) => {
        throw err;
    });
}
