import Database from '@database/Database';
import TwitterExtractor from './TwitterExtractor';
import NewsExtractor from './NewsExtractor';
import { Record } from 'neo4j-driver';
import { infoLogger } from '@logger';

export default class ExtractionManager {
  private static ontologyNodes: Record[] | undefined;

  public static getOngologyNodes() {
    return ExtractionManager.ontologyNodes;
  }
  
  public static async fetchOntologyNodes() {
    if(ExtractionManager.ontologyNodes) return;
    ExtractionManager.ontologyNodes = await Database.getInstance().query(
      'MATCH (n:Class) RETURN n ORDER BY n.rdfs__label LIMIT 3'
    );
  }

  public static async extract(args: String[]) {
    await ExtractionManager.fetchOntologyNodes();

    for(const arg of args) {
      switch(arg) {
        case '-t': case '--twitter':
          infoLogger.info("Extracting twitter data...");
          await TwitterExtractor.getInstance().processNodes(
            ExtractionManager.getOngologyNodes()
          );
          break;
        case '-n': case '--news':
          infoLogger.info("Extracting news data...");
          await NewsExtractor.getInstance().processNodes(
            ExtractionManager.getOngologyNodes()
          );
          break;
      }
    }

    process.exit();
  }
}

ExtractionManager.extract(process.argv.slice(2));