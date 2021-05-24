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
}

export class RedditSubmissionModel {
  private static wantedFields = [
    'id', 'author', 'created_utc', 'title', 'selftext', 'score', 'permalink',
    'subreddit', 'subreddit_id', 'subreddit_subscribers', 'num_comments',
  ];

	private db: Database = Database.getInstance();
	private submissionLabel: string;
	private properties: any;
  
	public constructor(submission: RedditSubmission) {
	  this.submissionLabel = "RedditSubmission";
    this.properties = {};
    for (const key in submission) {
      if (RedditSubmissionModel.wantedFields.includes(key)) {
        const fieldKey = key as keyof typeof submission;
        this.properties[key] = submission[fieldKey];
      }
    }
  }

	public linkToEnergy(energyLabel: string) {	  
		return this.db.query(`
			MATCH (origin:Resource {n4sch__label: "${energyLabel}"})
			MERGE (dest: ${this.submissionLabel} ${Utils.stringify(this.properties)})
			MERGE (origin)-[e:HasRedditContent]->(dest)
			RETURN origin, e, dest
		`);
	}
  }