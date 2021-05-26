import Database from '@database/Database';
import { errorLogger, infoLogger } from '@logger';

(async () => {
  try {     
    const db = Database.getInstance();
    await db.dropDB();
    await db.loadOntology();
  
    infoLogger.info('Ontology loaded!');
    process.exit(0);
  } catch (error) {
    errorLogger.error(error.message);
  }
})();
