import Database from "@database/Database";
import { Node } from "./Node";
import { Record } from 'neo4j-driver';
import { ArticleModel } from "./Article";
import { TweetModel } from "./Tweet";

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
      MATCH(r:Resource)-[:HasTweet]->(t:${TweetModel.label})
      WITH r, COUNT(t) as num_tweets
      WHERE num_tweets >= ${params.twitter_limit.inf_limit} AND num_tweets <= ${params.twitter_limit.sup_limit}
      
      MATCH(r)-[:HasTweet]->(a:${ArticleModel.label})
      WITH r, COUNT(t) as num_articles
      WHERE num_articles >= ${params.news_limit.inf_limit} AND num_articles <= ${params.news_limit.sup_limit}
      
      RETURN r
    `) as Promise<Record[]>;
  }
}