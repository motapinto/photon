import Database from '@database/Database';
import { RedditExtractor } from './RedditExtractor';
import TwitterExtractor from './TwitterExtractor';
import NewsExtractor from './NewsExtractor';
import { Record } from 'neo4j-driver';
import { infoLogger } from '@logger';
import dotenv from 'dotenv';

export default class ExtractionManager {
  private static ontologyNodes: Record[];

  public static async getOntologyNodes(): Promise<Record[]> {
    if(!ExtractionManager.ontologyNodes) {
      await ExtractionManager.fetchOntologyNodes();
    }

    return ExtractionManager.ontologyNodes;
  }
  
  public static async fetchOntologyNodes() {    
    if(ExtractionManager.ontologyNodes) {
      return
    };

    ExtractionManager.ontologyNodes = await Database.getInstance().query(
      'MATCH (n:Class) RETURN n ORDER BY n.rdfs__label LIMIT 3'
    ) ?? [];
  }

  public static async extract(args: String[]) {
    await ExtractionManager.fetchOntologyNodes();

    const energySectors = ExtractionManager.ontologyNodes.map((record: Record) => 
      record.get('n').properties.rdfs__label as string
    );

    for(const arg of args) {
      switch(arg) {
        case '-n': case '--news':
          infoLogger.info("Extracting news data...");
          return NewsExtractor.getInstance().processNodes(energySectors);
        case '-t': case '--twitter':
          infoLogger.info("Extracting Twitter data...");
          return TwitterExtractor.getInstance().processNodes(energySectors);
        case '-r': case '--reddit':
          infoLogger.info("Extracting Reddit data...");
          return RedditExtractor.processNodes(energySectors);
      }
    }
  }
}

(async () => {
  dotenv.config();
  await ExtractionManager.extract(process.argv.slice(2));
  process.exit();
})();
