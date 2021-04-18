import axios from "axios";

export function getGraphData(): Promise<string> {
    return axios.get(
        "localhost:5000",
    ).then((response) =>
        response.data.token,
    ).catch((err) => {
        throw err;
    });
}
