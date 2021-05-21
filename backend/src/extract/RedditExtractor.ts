import { errorLogger, infoLogger } from '@logger';
import { RedditSubmission } from '@model/reddit/RedditSubmission';
import { RedditComment } from '@model/reddit/RedditComment';
import HttpClient from './HttpClient';
import dotenv from 'dotenv';

interface RedditCommentsApiResponse {
    data: RedditComment[],
}

interface RedditSubmissionsApiResponse {
    data: RedditSubmission[],
}

abstract class RedditExtractor extends HttpClient {
    protected static energySubreddits = [
        'energy',
        'Futurology',
        'environment',
        'RenewableEnergy',
        'worldnews',
        'science',
        'solar',
        'climate',
        'NuclearPower',
        'Green',
        'electricvehicles',
        'fusion',
        'HydrogenSocieties',
        'oil',
        'biomass',
        'Petroleum',
    ];
  
    public constructor(url: string) {
		dotenv.config();
		super(url);
    }
}

class RedditCommentsExtractor extends RedditExtractor {
    private static instance: RedditCommentsExtractor;
	private static url = 'https://api.pushshift.io/reddit/comment/search';

	private constructor() {
		super(RedditCommentsExtractor.url);
	}

    public static getInstance(): RedditCommentsExtractor {
        if (!RedditCommentsExtractor.instance) {
        RedditCommentsExtractor.instance = new RedditCommentsExtractor();
        }        

        return RedditCommentsExtractor.instance;
    };

    public async processAll() {        
        try {
            const RedditComments = await super.get<RedditCommentsApiResponse>({
                params: {
                    subreddit: RedditExtractor.energySubreddits.join(','), 
                }
            });

            RedditComments.data.forEach(async (comment) => this.processComment(comment));
        } catch (err) {
            errorLogger.error(err.message);
        }         
    }
  
    private async processComment(comment: RedditComment) {
    	infoLogger.info(comment);
    }
} 

class RedditSubmissionExtractor extends RedditExtractor {
    private static instance: RedditSubmissionExtractor;
    private static url = 'https://api.pushshift.io/reddit/submission/search';
  
	private constructor() {
		super(RedditSubmissionExtractor.url);
	}

    public static getInstance(): RedditSubmissionExtractor {
      if (!RedditSubmissionExtractor.instance) {
        RedditSubmissionExtractor.instance = new RedditSubmissionExtractor();
      }        
  
      return RedditSubmissionExtractor.instance;
    };
  
    public async processAll() {        
        try {
            const RedditSubmissions = await super.get<RedditSubmissionsApiResponse>({
                params: {
                    subreddit: RedditExtractor.energySubreddits.join(','), 
                }
            });

            RedditSubmissions.data.forEach(async (submission) => this.processSubmission(submission));
        } catch (err) {
            errorLogger.error(err.message);
        }         
    }
  
    private async processSubmission(submission: RedditSubmission) {
    	infoLogger.info(submission);
    }
} 

RedditSubmissionExtractor.getInstance().processAll();
RedditCommentsExtractor.getInstance().processAll();

export {
	RedditCommentsExtractor,
}