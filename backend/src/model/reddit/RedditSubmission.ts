import Database from "@database/Database";
import Utils from "@utils/Utils";
import { Node } from "../Node";

export interface RedditSubmission extends Node {
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
	  this.submissionLabel = "RedditSubmission";
	  this.properties = submission as RedditSubmissionProperties;
	}

	public getData(): Node {
	  return { label: this.submissionLabel, properties: this.properties };
	}
  
	public add(): Promise<any> {
	  return this.db.createNode(this.getData());
	}

	public linkToEnergy(energyLabel: string) {
    console.log(this.properties);

    console.log("\n\n");  

    const {	
      id,
      author,
      created_utc,
      title,
      selftext,
      score,
      permalink,
      subreddit,
      subreddit_id,
      subreddit_subscribers,
      num_comments, 
      ..._ 
    } = this.properties;

    const parsedProperties = {      
      id,
      author,
      created_utc,
      title,
      selftext,
      score,
      permalink,
      subreddit,
      subreddit_id,
      subreddit_subscribers,
      num_comments, 
    } as RedditSubmissionProperties;

    console.log(parsedProperties);

    console.log("\n\n\n\n\n\n\n");

		return this.db.query(`
			MATCH (origin:Resource {rdfs__label: "${energyLabel}"})
			MERGE (dest: ${this.submissionLabel} ${Utils.stringify(parsedProperties)})
			MERGE (origin)-[e:HasRedditContent]->(dest)
			RETURN origin, e, dest
		`);
	  }
  }