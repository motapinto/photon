import Database from '@database/Database';
import TwitterExtractor from './TwitterExtractor';
import NewsExtractor from './NewsExtractor';
import { Record } from 'neo4j-driver';
import { infoLogger } from '@logger';

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
      'MATCH (n:Resource) RETURN n ORDER BY n.n4sch__label LIMIT 3'
    ) ?? [];
  }

  public static async extract(args: String[]) {
    await ExtractionManager.fetchOntologyNodes();
    const energySectors = ExtractionManager.ontologyNodes.map((record: Record) => 
      record.get('n').properties.n4sch__label as string
    );

    for(const arg of args) {
      switch(arg) {
        case '-n': case '--news':
          infoLogger.info("Extracting news data...");
          return NewsExtractor.getInstance().processNodes(energySectors);
        case '-t': case '--twitter':
          infoLogger.info("Extracting Twitter data...");
          return TwitterExtractor.getInstance().processNodes(energySectors);
      }
    }
  }
}

(async () => {
  await ExtractionManager.extract(process.argv.slice(2));
  process.exit();
})();
