import Database from "@database/Database";
import { errorLogger, infoLogger } from "@logger";
import { Edge } from "@model/Edge";
import { countries } from "./countries";
import { energy, nonRenewableEnergy, renewableEnergy } from "./sectors";
import { articles } from "./articles";
import { tweets } from "./tweets";
import { TweetModel } from "@model/Tweet";
import { HasTweet } from "@model/edges/HasTweet";
import { redditSubmissions, redditComments } from './reddit_content';
import { RedditSubmissionModel } from '@model/reddit/RedditSubmission';
import { RedditCommentModel } from '@model/reddit/RedditComment';
import { HasRedditContent } from "@model/edges/HasRedditContent";
import dotenv from 'dotenv';

(async () => {
  try {        
    const db = Database.getInstance();

    await db.dropDB();
    dotenv.config();

    await db.loadOntology();

    /*
    await Promise.all([
      energy.map(async (sector) => db.createNode(sector)),
      nonRenewableEnergy.map(async (sector) => db.createNode(sector)),
      renewableEnergy.map(async (sector) => db.createNode(sector)),
      articles.map(async (article) => db.createNode(article)),
      countries.map(async (country) => db.createNode(country)),
      tweets.map(async (tweet) => new TweetModel(tweet).add()),
      redditSubmissions.map(async (sub) => new RedditSubmissionModel(sub).add()),
      redditComments.map(async (comment) => new RedditCommentModel(comment).add()),
    ]);

    const majorAreaEdge: Edge = {
      label: 'HAS_MAJOR_AREA',
    }

    const subAreaEdge: Edge = {
      label: 'HAS_SUB_AREA',
    }

    await db.createEdge(energy[0], energy[1], majorAreaEdge);
    await db.createEdge(energy[0], energy[2], majorAreaEdge);
    await db.createEdge(energy[1], renewableEnergy[0], subAreaEdge);
    await db.createEdge(energy[1], renewableEnergy[1], subAreaEdge);
    await db.createEdge(energy[1], renewableEnergy[2], subAreaEdge);
    await db.createEdge(energy[1], renewableEnergy[3], subAreaEdge);
    await db.createEdge(energy[1], renewableEnergy[4], subAreaEdge);
    await db.createEdge(energy[2], nonRenewableEnergy[0], subAreaEdge);
    await db.createEdge(energy[2], nonRenewableEnergy[1], subAreaEdge);
    await db.createEdge(energy[2], nonRenewableEnergy[2], subAreaEdge);
    await db.createEdge(energy[2], nonRenewableEnergy[3], subAreaEdge);
    await db.createEdge(energy[2], nonRenewableEnergy[4], subAreaEdge);

    // ENERGY-ARTICLE EDGES
    const hasArticle: Edge = {
      label: 'HAS_ARTICLE',
    }
    
    await db.createEdge(energy[1], articles[0], hasArticle);
    await db.createEdge(renewableEnergy[1], articles[1], hasArticle);
    await db.createEdge(renewableEnergy[2], articles[2], hasArticle);
    await db.createEdge(nonRenewableEnergy[1], articles[3], hasArticle);

    // COUNTRY-ARTICLE EDGES
    const fromLocation: Edge = {
      label: 'FROM_LOCATION',
    }

    await db.createEdge(articles[1], countries[2], fromLocation);
    await db.createEdge(articles[2], countries[0], fromLocation);
    await db.createEdge(articles[3], countries[1], fromLocation);

    // ENERGY-TWEETS EDGES 
    const hasTweet: HasTweet = { label: 'HAS_TWEET' };
    await (new TweetModel(tweets[0])).linkToEnergy(energy[1], hasTweet);

    // ENERGY-REDDIT_CONTENT EDGES
    const hasRedditContent: HasRedditContent = { label: 'HAS_REDDIT_CONTENT' }; 
    await (new RedditSubmissionModel(redditSubmissions[0])).linkToEnergy(renewableEnergy[1], hasRedditContent);
    await (new RedditCommentModel(redditComments[0])).linkToEnergy(energy[0], hasRedditContent);
    */
  
    infoLogger.info("DB is now populated!");
    process.exit();

  } catch (error) {
      errorLogger.error(error);
  }
})();
