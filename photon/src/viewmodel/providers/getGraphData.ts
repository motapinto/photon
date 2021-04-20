import axios from "axios";
import Link from "../../model/link";
import Node from "../../model/node";
import Article from "../../model/article";
import Sector from "../../model/sector";
import Country from "../../model/country";
import labels from "../../model/labels.json";

type GraphData = {
    nodes: Node[],
    links: Link[],
}

function parseArticle(node: any): Article {
    const id = node["identity"]["high"] + node["identity"]["low"];
    const label = node["labels"][0];
    const properties = node["properties"];
    const publishedAt = properties["publishedAt"];
    const score = properties["score"]["low"] + properties["score"]["high"];
    const title = properties["title"];
    const url = properties["url"];

    return new Article(id, label, publishedAt, score, title, url);
}

function parseSector(node: any): Sector {
    const id = node["identity"]["high"] + node["identity"]["low"];
    const label = node["labels"][0];
    const properties = node["properties"];
    const growth = properties["growth"]["low"] + properties["growth"]["high"];
    const name = properties["name"];
    const numNews = properties["numNews"]["low"] + properties["numNews"]["high"];

    return new Sector(id, label, growth, name, numNews);
}

function parseCountry(node: any): Country {
    const id = node["identity"]["high"] + node["identity"]["low"];
    const label = node["labels"][0];
    const properties = node["properties"];
    const name = properties["name"];

    return new Country(id, label, name);
}

function parseNode(node: any): Node {
    const id = node["identity"]["high"] + node["identity"]["low"];
    const label = node["labels"][0];

    switch(label) {
        case labels.article: {
            return parseArticle(node);
        }
        case labels.majorArea:
        case labels.subArea: {
            return parseSector(node);
        }
        case labels.country: {
            return parseCountry(node);
        }
    }
    return new Node(id, label);
}

function parseLink(link: any): Link {
    const id = link["identity"]["high"] + link["identity"]["low"];
    const start = link["start"]["high"] + link["start"]["low"];
    const end = link["end"]["high"] + link["end"]["low"];
    const type = link["type"];

    return new Link(id, start, end, type);
}

function handleGraphData(graphData: any): GraphData {
    let nodes: Node[] = [];
    let links: Link[] = [];

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
