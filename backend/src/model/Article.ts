import Database from "@database/Database";
import { Node } from "./Node";

export interface Article extends Node {
  id: string,
  title: string,
  url: string,
  description: string,
  body: string,
  datePublished: string,
  score: number,
}

interface ArticleProperties {
  id: string,
  title: string,
  url: string,
  description: string,
  body: string,
  datePublished: string,
  score: number,
}

export class ArticleModel {
  private db: Database = Database.getInstance();
  private articleProperties: ArticleProperties;
  private static articleLabel = "Article";

  public constructor(article: Article) {
    this.articleProperties = article;
  }

  public getData(): Node {
    return { label: ArticleModel.articleLabel, properties: this.articleProperties };
  }

  public add(): Promise<any> {
    return this.db.createOrGetNode(this.getData());
  }

  public linkToEnergy(energyLabel: string) {
    console.log(this.articleProperties.id);
    
    return this.db.query(`
      MATCH (origin:Resource {rdfs__label: "${energyLabel}"}), (dest:Tweet {id: "${this.articleProperties.id}"})
      MERGE (origin)-[e:HasArticle]->(dest)
      RETURN origin, e, dest
    `);
  }
}