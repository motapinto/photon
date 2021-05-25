import Database from "@database/Database";
import Utils from "@utils/Utils";
import { Node } from "../Node";
import { Record } from 'neo4j-driver';

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
  	public static label = "RedditSubmission";
	public static total_max_rsubs = 0;
	public static total_min_rsubs = 0;
	private static wantedFields = [
		'id', 'author', 'created_utc', 'title', 'selftext', 'score', 'permalink',
		'subreddit', 'subreddit_id', 'subreddit_subscribers', 'num_comments',
	];

	private db: Database = Database.getInstance();
	private properties: any;
  
	public constructor(submission: RedditSubmission) {
		this.properties = {};
		for (const key in submission) {
			if (RedditSubmissionModel.wantedFields.includes(key)) {
				const fieldKey = key as keyof typeof submission;
				this.properties[key] = submission[fieldKey];
			}
		}
	}

	public create(energyLabel: string) {	  
		return this.db.query(`
			MATCH (origin:Resource {n4sch__label: "${energyLabel}"})
			MERGE (dest: ${RedditSubmissionModel.label} ${Utils.stringify(this.properties)})
			MERGE (origin)-[e:HasRedditContent]->(dest)
			RETURN origin, e, dest
		`);
	}

	public static async getLimits() {
		const db = Database.getInstance();
	
		const reddit_limits = await db.query(`
		  MATCH(r:Resource)
		  OPTIONAL MATCH(r)-[:HasRedditContent]->(rs:${RedditSubmissionModel.label})
		  WITH r, COUNT(rs) as num_rsubs
		  RETURN max(num_rsubs) as max_rsubs, min(num_rsubs) as min_rsubs
		`) as Array<Record>;
	
		if(reddit_limits?.length != 1 || !reddit_limits[0].has('max_rsubs') || !reddit_limits[0].has('min_rsubs')) {
		  throw new Error('Tweets limit cannot be calculated!');
		}
	
		RedditSubmissionModel.total_max_rsubs = reddit_limits[0].get('max_rsubs').low;
		RedditSubmissionModel.total_min_rsubs = reddit_limits[0].get('min_rsubs').low;
	}
}