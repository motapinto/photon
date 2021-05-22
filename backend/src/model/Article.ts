import Database from "@database/Database";
import { Node } from "./Node";

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
  private static label = "Article";

  public constructor(article: Article) {
    this.article = article;
  }

  public getData(): Node {
    return { label: ArticleModel.label, properties: this.article };
  }

  public add(): Promise<any> {
    return this.db.createOrGetNode(this.getData());
  }

  public linkToEnergy(energyLabel: string) {
    return this.db.query(`
      MATCH (origin:Resource {rdfs__label: "${energyLabel}"}), (dest:${ArticleModel.label} {id: "${this.article.id}"})
      MERGE (origin)-[e:HasArticle]->(dest)
      RETURN origin, e, dest
    `);
  }
}