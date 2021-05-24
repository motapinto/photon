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
}

export class RedditCommentModel {
	private static wantedFields = [
		'id', 'parent_id', 'author', 'created_utc', 'body', 'score', 
		'permalink', 'subreddit', 'subreddit_id', 'link_id',
	];

	private db: Database = Database.getInstance();
	private commentLabel: string;
	private properties: any;
  
	public constructor(submission: RedditComment) {
	  this.commentLabel = "RedditComment";
	  this.properties = {};
	  for (const key in submission) {
		if (RedditCommentModel.wantedFields.includes(key)) {
		  const fieldKey = key as keyof typeof submission;
		  this.properties[key] = submission[fieldKey];
		}
	  }
  	}
  
	public linkToEnergy(energyLabel: string) {
		return this.db.query(`
			MATCH (origin:Resource {n4sch__label: "${energyLabel}"})
			MERGE (dest: ${this.commentLabel} ${Utils.stringify(this.properties)})
			MERGE (origin)-[e:HasRedditContent]->(dest)
			RETURN origin, e, dest
		`);
	}
}