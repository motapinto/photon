import Database from "@database/Database";
import Utils from "@utils/Utils";
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

  public async linkToEnergy(energyLabel: string) {
    console.log(`
    MATCH (origin:Resource {n4sch__label: "${energyLabel}"})
    MERGE (dest: ${ArticleModel.label} ${Utils.stringify(this.article)})
    MERGE (origin)-[e:HasArticle]->(dest)
    RETURN origin, e, dest
  `);
    
    return this.db.query(`
      MATCH (origin:Resource {n4sch__label: "${energyLabel}"})
      MERGE (dest: ${ArticleModel.label} ${Utils.stringify(this.article)})
      MERGE (origin)-[e:HasArticle]->(dest)
      RETURN origin, e, dest
    `);
  }
}