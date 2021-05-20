import Database from '@database/Database';
import dotenv from 'dotenv';
import { errorLogger, infoLogger } from '@logger';

(async () => {
  try {     
    dotenv.config();   

    const db = Database.getInstance();
    await db.dropDB();
    await db.loadOntology();
  
    infoLogger.info('Ontology loaded!');
    process.exit(1);
  } catch (error) {
    errorLogger.error(error);
  }
})();
