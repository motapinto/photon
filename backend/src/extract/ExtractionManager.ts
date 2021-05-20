import Database from '@database/Database';
import TwitterExtractor from './TwitterExtractor';
import NewsExtractor from './NewsExtractor';
import { Record } from 'neo4j-driver';
import { infoLogger } from '@logger';

export default class ExtractionManager {
  private static ontologyNodes: Record[] | undefined;

  public static getOntologyNodes(): Record[] | undefined {
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

    const energySectors = [] as string[];
    ExtractionManager.ontologyNodes?.forEach(node => {
      if (node.properties.rdfs__label) {
        energySectors.push(node.properties.rdfs__label);
      }
    });

    for(const arg of args) {
      switch(arg) {
        case '-t': case '--twitter':
          infoLogger.info("Extracting Twitter data...");
          await TwitterExtractor.getInstance().processNodes(energySectors);
          break;
        case '-n': case '--news':
          infoLogger.info("Extracting news data...");
          await NewsExtractor.getInstance().processNodes(energySectors);
          break;
      }
    }

    process.exit();
  }
}

(async () => {
  await ExtractionManager.extract(process.argv.slice(2));
})();
