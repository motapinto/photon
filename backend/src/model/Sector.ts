import Database from "@database/Database";
import { Node } from "./Node";
import { Record } from 'neo4j-driver';
import { ArticleModel } from "./Article";
import { TweetModel } from "./Tweet";
import { RedditCommentModel } from "./reddit/RedditComment";
import { RedditSubmissionModel } from "./reddit/RedditSubmission";

export interface Sector extends Node {
  readonly properties: {
    name: string,
    growth: number,
    numArticles: number,
    numTweets: number,
    numRedditPosts: number,
  };
}

export type FilterParams = {
  twitter_limit: {
    inf_limit: number, 
    sup_limit: number
  },
  reddit_limit: {
    inf_limit: number, 
    sup_limit: number
  },
  news_limit: {
    inf_limit: number, 
    sup_limit: number
  }
};

export class SectorModel {
  public static async getAll(params: FilterParams):Promise<Record[]>  {
    const db = Database.getInstance();

    return db.query(`
      MATCH(r:Resource)
      OPTIONAL MATCH(r)-[:HasTweet]->(t:${TweetModel.label})
      WITH r, COUNT(t) as num_tweets
      WHERE num_tweets >= ${params.twitter_limit.inf_limit} AND num_tweets <= ${params.twitter_limit.sup_limit}
      
      OPTIONAL MATCH(r)-[:HasArticle]->(a:${ArticleModel.label})
      WITH r, COUNT(a) as num_articles
      WHERE num_articles >= ${params.news_limit.inf_limit} AND num_articles <= ${params.news_limit.sup_limit}

      OPTIONAL MATCH(r)-[:HasRedditContent]->(rc)
      WHERE rc:${RedditCommentModel.label} OR rc:${RedditSubmissionModel.label}
      WITH r, COUNT(rc) as num_reddits
      WHERE num_reddits >= ${params.reddit_limit.inf_limit} AND num_reddits <= ${params.reddit_limit.sup_limit}
      
      RETURN r
    `) as Promise<Record[]>;
  }
}