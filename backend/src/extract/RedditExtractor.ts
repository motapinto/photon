import { errorLogger, infoLogger } from '@logger';
import { RedditSubmission } from '@model/reddit/RedditSubmission';
import { RedditComment } from '@model/reddit/RedditComment';
import HttpClient from './HttpClient';

interface RedditCommentsApiResponse {
    data: RedditComment[],
}

interface RedditSubmissionsApiResponse {
    data: RedditSubmission[],
}

abstract class BaseRedditExtractor extends HttpClient {
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
		super(url);
    }
}

class RedditCommentsExtractor extends BaseRedditExtractor {
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

    public async processNodes(labels: string[]) {
        try {
            const comments = await super.get<RedditCommentsApiResponse>({
                params: {
                    subreddit: BaseRedditExtractor.energySubreddits.join(','), 
                }
            });

            return Promise.all(comments.data.map(async (comment) => {
                await this.processComment(labels, comment)
            }));
        } catch (err) {
            errorLogger.error(err.message);
        }  
    }
  
    private async processComment(labels: string[], comment: RedditComment) {
    	infoLogger.info(comment);
    }
} 

class RedditSubmissionExtractor extends BaseRedditExtractor {
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
  
    public async processNodes(labels: string[]) {
        try {
            const submissions = await super.get<RedditSubmissionsApiResponse>({
                params: {
                    subreddit: BaseRedditExtractor.energySubreddits.join(','), 
                }
            });

            return Promise.all(submissions.data.map(async (sub) => {
                await this.processSubmission(labels, sub)
            }));
        } catch (err) {
            errorLogger.error(err.message);
        }  
    }

    private async processSubmission(labels: string[], submission: RedditSubmission) {
    	infoLogger.info(submission);
    }
} 

class RedditExtractor {
    public static async processNodes(labels: string[]) {
        await RedditSubmissionExtractor.getInstance().processNodes(labels);
        await RedditCommentsExtractor.getInstance().processNodes(labels);
    }
}


export { RedditExtractor }