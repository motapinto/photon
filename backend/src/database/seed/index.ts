import Database from "@database/Database";
import { Edge } from "@model/Edge";
import { countries } from "./countries";
import { energy, nonRenewableEnergy, renewableEnergy } from "./sectors";
import { articles } from "./articles";
import { errorLogger, infoLogger } from "@logger";



(async () => {
  try {        
    const db = Database.getInstance();

    await db.dropDB();
    
    await Promise.all([
      countries.map(async (country) => db.createNode(country)),
      articles.map(async (article) => db.createNode(article)),
      energy.map(async (country) => db.createNode(country)),
      nonRenewableEnergy.map(async (country) => db.createNode(country)),
      renewableEnergy.map(async (country) => db.createNode(country)),
    ]);

    const majorAreaEdge: Edge = {
      label: 'majorArea',
    }

    const subAreaEdge: Edge = {
        label: 'subArea',
    }

    await Promise.all([
      db.createEdge(energy[0], energy[1], majorAreaEdge),
      db.createEdge(energy[0], energy[2], majorAreaEdge),
      db.createEdge(energy[1], renewableEnergy[0], subAreaEdge),
      db.createEdge(energy[1], renewableEnergy[1], subAreaEdge),
      db.createEdge(energy[1], renewableEnergy[2], subAreaEdge),
      db.createEdge(energy[1], renewableEnergy[3], subAreaEdge),
      db.createEdge(energy[1], renewableEnergy[4], subAreaEdge),
      db.createEdge(energy[2], nonRenewableEnergy[0], subAreaEdge),
      db.createEdge(energy[2], nonRenewableEnergy[1], subAreaEdge),
      db.createEdge(energy[2], nonRenewableEnergy[2], subAreaEdge),
      db.createEdge(energy[2], nonRenewableEnergy[3], subAreaEdge),
      db.createEdge(energy[2], nonRenewableEnergy[4], subAreaEdge),
    ]);

    await Promise.all([
      db.createNode(articles[0]),
      db.createNode(articles[1]),
      db.createNode(articles[2]),
      db.createNode(articles[3]),
    ]);

    /** ENERGY-ARTICLE EDGES */
    const fromArticle: Edge = {
      label: 'about',
    }
    
    await Promise.all([
      db.createEdge(energy[1], articles[0], fromArticle),
      db.createEdge(renewableEnergy[1], articles[1], fromArticle),
      db.createEdge(renewableEnergy[2], articles[2], fromArticle),
      db.createEdge(nonRenewableEnergy[1], articles[3], fromArticle),
    ]);

      /** COUNTRY-ARTICLE EDGES */
      const fromLocation: Edge = {
        label: 'from',
      }

      await Promise.all([
        db.createEdge(articles[1], countries[2], fromLocation),
        db.createEdge(articles[2], countries[0], fromLocation),
        db.createEdge(articles[3], countries[1], fromLocation),
      ]);

      infoLogger.info("DB is now populated!");
      process.exit();
  } catch (error) {
      errorLogger.error(error);
  }
})();
