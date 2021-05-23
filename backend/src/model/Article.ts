import Database from "@database/Database";
import Utils from "@utils/Utils";
import { Node } from "./Node";
import { Record } from 'neo4j-driver';

export interface Article extends Node {
  id: string,
  title: string,
  url: string,
  snippet: string,
  datePublished: string,
  source: string,
}

export class ArticleModel {
  private db: Database = Database.getInstance();
  private article: Article;
  public static label = "Article";
  public static total_max_articles = 0;
  public static total_min_articles = 0;

  public constructor(article: Article) {
    this.article = article;
  }

  public async create(energyLabel: string) {
    return this.db.query(`
      MATCH (origin:Resource {n4sch__label: "${energyLabel}"})
      MERGE (dest: ${ArticleModel.label} ${Utils.stringify(this.article)})
      MERGE (origin)-[e:HasArticle]->(dest)
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

    ArticleModel.total_max_articles = tweet_limits[0].get('max_tweets');
    ArticleModel.total_min_articles = tweet_limits[0].get('min_tweets');
  }
}