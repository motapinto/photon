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

    const article_limits = await db.query(`
      MATCH(r:Resource)
      OPTIONAL MATCH(r)-[:HasArticle]->(a:Article)
      WITH r, COUNT(a) as num_articles
      RETURN max(num_articles) as max_articles, min(num_articles) as min_articles
    `) as Array<Record>;

    if(article_limits?.length != 1 || !article_limits[0].has('max_articles') || !article_limits[0].has('min_articles')) {
      throw new Error('Articles limit cannot be calculated!');
    }

    ArticleModel.total_max_articles = article_limits[0].get('max_articles').low;
    ArticleModel.total_min_articles = article_limits[0].get('min_articles').low;
  }
}