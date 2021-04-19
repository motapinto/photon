import axios from "axios";
import Node from "../../model/node";
import Link from "../../model/link";

type GraphData = {
    nodes: Node[],
    links: Link[],
}

function parseNode(node: any): Node {
    const id = node["identity"]["high"] + node["identity"]["low"];
    const label = node["labels"][0];
    const properties = node["properties"];
    const publishedAt = properties["publishedAt"];
    const scoreProp = properties["score"];
    let score;
    if (scoreProp)
        score = properties["score"]["low"] + properties["score"]["high"];
    const title = properties["title"];
    const url = properties["url"];

    return new Node(id, label, publishedAt, score, title, url);
}

function parseLink(link: any): Link {
    const id = link["identity"]["high"] + link["identity"]["low"];
    const start = link["start"]["high"] + link["start"]["low"];
    const end = link["end"]["high"] + link["end"]["low"];
    const type = link["type"];

    return new Link(id, start, end, type);
}

function handleGraphData(graphData: any): GraphData {
    let nodes: Node[];
    nodes = [];
    let links: Link[];
    links = [];

    graphData.forEach((element: any) => {   
        const fields = element["_fields"];

        //Origin
        const origin = parseNode(fields[0]);
        nodes.push(origin);
        //Link
        const link = parseLink(fields[1]);
        links.push(link);
        //Dest
        const dest = parseNode(fields[2]);
        nodes.push(dest);
    });

    let data: GraphData;
    data =  {nodes, links};

    return data;
}

export function getGraphData(): Promise<GraphData> {
    
    return axios.get(
        "http://localhost:5000/graph",
    ).then((response) =>
        handleGraphData(response.data),
    ).catch((err) => {
        throw err;
    });
}
