import Database from "@database/Database";
import Utils from "@utils/Utils";
import { Node } from "../Node";
import { Record } from 'neo4j-driver';

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
	public static label = "RedditComment";
	public static total_max_rcoms = 0;
	public static total_min_rcoms = 0;
	private static wantedFields = [
		'id', 'parent_id', 'author', 'created_utc', 'body', 'score', 
		'permalink', 'subreddit', 'subreddit_id', 'link_id',
	];

	private db: Database = Database.getInstance();
	private properties: any;
  
	public constructor(submission: RedditComment) {
	  this.properties = {};
	  for (const key in submission) {
		if (RedditCommentModel.wantedFields.includes(key)) {
		  const fieldKey = key as keyof typeof submission;
		  this.properties[key] = submission[fieldKey];
		}
	  }
  	}
  
	public create(energyLabel: string) {
		return this.db.query(`
			MATCH (origin:Resource {n4sch__label: "${energyLabel}"})
			MERGE (dest: ${RedditCommentModel.label} ${Utils.stringify(this.properties)})
			MERGE (origin)-[e:HasRedditContent]->(dest)
			RETURN origin, e, dest
		`);
	}

	public static async getLimits() {
		const db = Database.getInstance();
	
		const reddit_limits = await db.query(`
		  MATCH(r:Resource)
		  OPTIONAL MATCH(r)-[:HasRedditContent]->(rs:${RedditCommentModel.label})
		  WITH r, COUNT(t) as num_rcoms
		  RETURN max(num_rcoms) as max_rcoms, min(num_rcoms) as min_rcoms
		`) as Array<Record>;
	
		if(reddit_limits?.length != 1 || !reddit_limits[0].has('max_rcoms') || !reddit_limits[0].has('min_rcoms')) {
		  throw new Error('Tweets limit cannot be calculated!');
		}
	
		RedditCommentModel.total_max_rcoms = reddit_limits[0].get('max_rcoms').low;
		RedditCommentModel.total_min_rcoms = reddit_limits[0].get('min_rcoms').low;

		console.log("\n\n\nLIMIT FOR COMS");
		console.log(RedditCommentModel.total_max_rcoms);
		console.log(RedditCommentModel.total_min_rcoms);
		console.log("\n\n\n");
	}
}