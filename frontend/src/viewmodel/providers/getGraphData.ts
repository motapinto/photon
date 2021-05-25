import axios from "axios";
import Link from "../../model/link";
import Node from "../../model/node";
import Sector from "../../model/sector";
import Tweet from "../../model/tweet";
import Article from "../../model/article";
import mainLabels from "../../model/labels.json";
import RedditComment from "../../model/redditComment";

type GraphData = {
    nodes: Node[],
    links: Link[],
}

function parseRedditComment(id: string, properties: any): RedditComment {
    const label = "RedditComment";
    const author = properties["author"];
    const body = properties["body"];
    const permalink = properties["permalink"];
    const score = properties["score"];
    const subreddit = properties["subreddit"];

    return new RedditComment(id, label, author, body, permalink, score, subreddit);
}

function parseArticle(id: string, properties: any): Article {
    const label = "Article";
    const datePublished = properties["datePublished"];
    const snippet = properties["snippet"];
    const title = properties["title"];
    const url = properties["url"];

    return new Article(id, label, datePublished, snippet, title, url);
}

function parseTweet(id: string, properties: any): Tweet {
    const label = "Tweet";
    const authorId = properties["author_id"];
    const createdAt = properties["created_at"];
    const likeCount = properties["like_count"]["high"];
    const dislikeCount = properties["like_count"]["low"];
    const quoteCount = properties["quote_count"]["high"] + properties["quote_count"]["low"];
    const replyCount = properties["reply_count"]["high"] + properties["reply_count"]["low"];
    const retweetCount = properties["retweet_count"]["high"] + properties["retweet_count"]["low"];
    const text = properties["text"];

    return new Tweet(id, label, authorId, createdAt, likeCount, dislikeCount, quoteCount, replyCount, retweetCount, text);
}

function parseClass(id: string, properties: any): Sector {
    const label = "Class";
    const name = properties["n4sch__label"] ? properties["n4sch__label"] : properties["n4sch__name"];
    const uri = properties["uri"];

    return new Sector(id, label, name, uri);
}

function parseNode(node: any): Node | null {
    const id = `${node["identity"]["high"]}_${node["identity"]["low"]}`;    
    const labels = node["labels"];
    const mainLabel = labels.length >= 2 ? (labels[1]).substring(7) : labels[0];
    const properties = node["properties"];

    switch(mainLabel) {
        case mainLabels.class:
            return parseClass(id, properties);
        case mainLabels.twitter:
            return parseTweet(id, properties);
        case mainLabels.redditComment:
            return parseRedditComment(id, properties);
        case mainLabels.news:
            return parseArticle(id, properties);
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

    graphData['records'].forEach((element: any) => {
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
    data = {nodes, links};
    return data;
}

export function getGraphData(
        twitterRange: number[], redditRange: number[], newsRange: number[]
    ): Promise<GraphData> {

    return axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/graph?twitter_inf_limit=${twitterRange[0]}&twitter_sup_limit=${twitterRange[1]}&reddit_inf_limit=${redditRange[0]}&reddit_sup_limit=${redditRange[1]}&news_inf_limit=${newsRange[0]}&news_sup_limit=${newsRange[1]}`,
    ).then((response) =>
        handleGraphData(response.data),
    ).catch((err) => {
        throw err;
    });
}
