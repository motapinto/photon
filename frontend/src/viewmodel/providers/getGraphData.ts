import axios from "axios";
import Link from "../../model/link";
import Node from "../../model/node";
// import Article from "../../model/article";
import Sector from "../../model/sector";
// import Country from "../../model/country";
// import labels from "../../model/labels.json";

type GraphData = {
    nodes: Node[],
    links: Link[],
}

// function parseArticle(id: string, labels: string[], node: any): Article {
//     const properties = node["properties"];
//     const publishedAt = properties["datePublished"];
//     const score = properties["score"]["low"] + properties["score"]["high"];
//     const title = properties["title"];
//     const url = properties["url"];

//     return new Article(id, labels, publishedAt, score, title, url);
// }

// function parseCountry(id: string, labels: string[], node: any): Country {
//     const properties = node["properties"];
//     const name = properties["name"];

//     return new Country(id, labels, name);
// }

function parseSector(id: string, labels: string[], node: any): Sector {
    const properties = node["properties"];
    const name = properties["rdfs__label"];
    const uri = properties["uri"];
    const growth = 0;
    const numArticles = 0;

    return new Sector(id, labels, growth, name, uri, numArticles);
}

function parseNode(node: any): Node | null {
    const id = `${node["identity"]["high"]}_${node["identity"]["low"]}`;    
    const labels = node["labels"];
    const mainLabel = labels.length >= 2 ? labels[1] : "N/A";

    switch(mainLabel) {
        case "Class":
            return parseSector(id, labels, node);
        case "Relationship":
            // TODO: parse relationships?
            break;
        default:
            break;
    }
    return null;
}

function parseLink(link: any): Link {
    const id = `${link["identity"]["high"]}_${link["identity"]["low"]}`;
    const source = `${link["start"]["high"]}_${link["start"]["low"]}`;
    const target = `${link["end"]["high"]}_${link["end"]["low"]}`;
    const type = link["type"];

    return new Link(id, source, target, type);
}

function handleGraphData(graphData: any): GraphData {
    let nodes: Node[] = [];
    let links: Link[] = [];
    let processedIds: Set<string> = new Set();

    graphData.forEach((element: any) => {   
        const fields = element["_fields"];

        //Origin
        const origin = parseNode(fields[0]);
        if (!origin) return;

        //Dest
        const dest = parseNode(fields[2]);
        if (!dest) return; 

        // Insert nodes (avoiding duplicates)
        if (!processedIds.has(origin.id)) {
            nodes.push(origin);
            processedIds.add(origin.id);
        }
        if (!processedIds.has(dest.id)) {
            nodes.push(dest);
            processedIds.add(dest.id);
        }

        //Link
        const link = parseLink(fields[1]);
        links.push(link);
    });

    let data: GraphData;
    data =  {nodes, links};

    return data;
}

export function getGraphData(): Promise<GraphData> {
    
    return axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/graph`,
    ).then((response) =>
        handleGraphData(response.data),
    ).catch((err) => {
        throw err;
    });
}
