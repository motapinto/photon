import Database from "@database/Database";
import Utils from "@utils/Utils";
import { Node } from "../Node";

export interface RedditComment extends Node {
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
	  this.commentLabel = "Reddit Comment";
	  this.properties = comment as RedditCommentProperties;
	}

	public getData(): Node {
	  return { label: this.commentLabel, properties: this.properties };
	}
  
	public add(): Promise<any> {
	  return this.db.createNode(this.getData());
	}
  
	public linkToEnergy(energyLabel: string) {
		return this.db.query(`
			MATCH (origin:Resource {rdfs__label: "${energyLabel}"})
			MERGE (dest: ${this.commentLabel} ${Utils.stringify(this.properties)})
			MERGE (origin)-[e:HasRedditContent]->(dest)
			RETURN origin, e, dest
		`);
	}
  }