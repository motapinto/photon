import Database from "@database/Database";
import Utils from "@utils/Utils";
import { Node } from "./Node";
import { Record } from 'neo4j-driver';

export interface Tweet extends Node {
  id: string,
  created_at: string,
  author_id: string
  text: string,
  public_metrics: {
    retweet_count: number,
    reply_count: number,
    like_count: number,
    quote_count: number
  }
}

interface TweetProperties {
  id: string,
  created_at: string,
  author_id: string
  text: string,
  retweet_count: number,
  reply_count: number,
  like_count: number,
  quote_count: number
}

export class TweetModel {
  private db: Database = Database.getInstance();
  private tweet: TweetProperties;
  public static label = "Tweet";
  public static total_max_tweets = 0;
  public static total_min_tweets = 0;

  public constructor(tweet: Tweet) {
    const { public_metrics, ...properties } = tweet;
    
    this.tweet = {
      ...properties,
      retweet_count: public_metrics.retweet_count,
      reply_count: public_metrics.reply_count,
      like_count: public_metrics.like_count,
      quote_count: public_metrics.quote_count,
    };
  }

  public async create(energyLabel: string) {
    return this.db.query(`
      MATCH (origin:Resource {n4sch__label: "${energyLabel}"})
      MERGE (dest: ${TweetModel.label} ${Utils.stringify(this.tweet)})
      MERGE (origin)-[e:HasTweet]->(dest)
      RETURN origin, e, dest
    `);
  }

  public static async getLimits() {
    const db = Database.getInstance();

    const tweet_limits = await db.query(`
      MATCH(r:Resource)-[:HasTweet]->(t:Tweet)
      WITH r, COUNT(t) as num_tweets
      RETURN max(num_tweets) as max_tweets, min(num_tweets) as min_tweets
    `) as Array<Record>;

    if(tweet_limits?.length != 1 || !tweet_limits[0].has('max_tweets') || !tweet_limits[0].has('min_tweets')) {
      throw new Error('Tweets limit cannot be calculated!');
    }

    TweetModel.total_max_tweets = tweet_limits[0].get('max_tweets');
    TweetModel.total_min_tweets = tweet_limits[0].get('min_tweets');
  }
}