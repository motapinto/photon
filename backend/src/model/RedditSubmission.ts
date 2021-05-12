import Database from "@database/Database";
import Utils from "@utils/Utils";
import { Sector } from "./Sector";
import { Node } from "./Node";
import { HasRedditContent } from "./edges/HasRedditContent";

export interface RedditSubmission extends Node {
  readonly properties: {
		id: string,
		author: string,
		created_utc: number,
		title: string,
		selftext: string,
		score: number,
		permalink: string,
		subreddit: string,
		subreddit_id: string,
		subreddit_subscribers: number,
		num_comments: number,
		[x: string]: any // allows any additional properties
	};
}

interface RedditSubmissionProperties {
	id: string,
	author: string,
	created_utc: number,
	title: string,
	selftext: string,
	score: number,
	permalink: string,
	subreddit: string,
	subreddit_id: string,
	subreddit_subscribers: number,
	num_comments: number,
}

export class RedditSubmissionModel {
	private db: Database = Database.getInstance();
	private submissionLabel: string;
	private properties: RedditSubmissionProperties;
  
	public constructor(submission: RedditSubmission) {
	  this.submissionLabel = submission.label;
	  this.properties = submission.properties as RedditSubmissionProperties;
	}
  
	public getData(): Node {
	  return { label: this.submissionLabel, properties: this.properties };
	}
  
	public add(): Promise<any> {
	  return this.db.createNode(this.getData());
	}
  
	public linkToEnergy(energy: Sector, edge: HasRedditContent) {    
	  return this.db.query(`
		MATCH (origin: ${energy.label} { name: "${energy.properties.name }" }), (dest: ${this.submissionLabel} {id: "${this.properties.id}"})
		MERGE (origin)-[e: ${edge.label} ${Utils.stringify(edge.properties)}]->(dest)
		RETURN origin, e, dest
	  `);
	}
  }