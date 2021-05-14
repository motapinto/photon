import Database from "@database/Database";
import Utils from "@utils/Utils";
import { Sector } from "../Sector";
import { Node } from "../Node";
import { HasRedditContent } from "../edges/HasRedditContent";

export interface RedditComment extends Node {
	readonly properties: {
		id: string,
		parent_id: string,
		author: string,
		created_utc: number,
		body: string,
		score: number,
		permalink: string,
		subreddit: string,
		subreddit_id: string,
		link_id: string,
		[x: string]: any // allows any additional properties
	};
}

interface RedditCommentProperties {
	id: string,
	parent_id: string,
	author: string,
	created_utc: number,
	body: string,
	score: number,
	permalink: string,
	subreddit: string,
	subreddit_id: string,
	link_id: string,
}


export class RedditCommentModel {
	private db: Database = Database.getInstance();
	private commentLabel: string;
	private properties: RedditCommentProperties;
  
	public constructor(comment: RedditComment) {
	  this.commentLabel = comment.label;
	  this.properties = comment.properties as RedditCommentProperties;
	}

	public getData(): Node {
	  return { label: this.commentLabel, properties: this.properties };
	}
  
	public add(): Promise<any> {
	  return this.db.createNode(this.getData());
	}
  
	public linkToEnergy(energy: Sector, edge: HasRedditContent) {
	  return this.db.query(`
		MATCH (origin: ${energy.label} { name: "${energy.properties.name }" }), (dest: ${this.commentLabel} {id: "${this.properties.id}"})
		MERGE (origin)-[e: ${edge.label} ${Utils.stringify(edge.properties)}]->(dest)
		RETURN origin, e, dest
	  `);
	}
  }