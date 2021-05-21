import Database from "@database/Database";
import Utils from "@utils/Utils";
import { HasTweet } from "./edges/HasTweet";
import { Node } from "./Node";
import { Sector } from "./Sector";

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
  private tweetProperties: TweetProperties;
  private static tweetLabel = "Tweet";

  public constructor(tweet: Tweet) {
    const { public_metrics, ...properties } = tweet;
    
    this.tweetProperties = {
      ...properties,
      retweet_count: public_metrics.retweet_count,
      reply_count: public_metrics.reply_count,
      like_count: public_metrics.like_count,
      quote_count: public_metrics.quote_count,
    }
  }

  public getData(): Node {
    return { label: TweetModel.tweetLabel, properties: this.tweetProperties };
  }

  public add(): Promise<any> {
    return this.db.createOrGetNode(this.getData());
  }

  public linkToEnergy(energyLabel: string) {
    return this.db.query(`
      MATCH (origin:Resource {rdfs__label: "${energyLabel}"}), (dest:Tweet {id: "${this.tweetProperties.id}"})
      MERGE (origin)-[e:HasTweet]->(dest)
      RETURN origin, e, dest
    `);
  }
}