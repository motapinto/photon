import { errorLogger, infoLogger } from '@logger';
import { RedditSubmission, RedditSubmissionModel } from '@model/reddit/RedditSubmission';
import { RedditComment, RedditCommentModel } from '@model/reddit/RedditComment';
import HttpClient from './HttpClient';
import Utils from '@utils/Utils';

interface RedditCommentsApiResponse {
    data: RedditComment[],
}

interface RedditSubmissionsApiResponse {
    data: RedditSubmission[],
}

abstract class BaseRedditExtractor extends HttpClient {
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
        return Promise.all(labels.map(async label => {   
            try {
                const comments = await super.get<RedditCommentsApiResponse>({
                    params: {
                        q: label
                    }
                });
              
                return Promise.all(comments.data.map(async (comment) => {
                    await this.processComment(label, comment)
                }));
            } catch (err) {
              errorLogger.error(err.message);
            }         
        })); 
    }

    private async processComment(energyLabel: string, comment: RedditComment) {
        const redditCommentModel = new RedditCommentModel(comment);
        await redditCommentModel.linkToEnergy(energyLabel);
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
        return Promise.all(labels.map(async label => { 
          while(true) { 
            try {
                const submissions = await super.get<RedditSubmissionsApiResponse>({
                    params: {
                        q: label 
                    }
                });
              
                return Promise.all(submissions.data.map(async (sub) => {
                    await this.processSubmission(label, sub)
                }));
            } catch (err) {
              if(err.request.res.statusCode !== 429) {
                errorLogger.error(err.message);
                break;
              }
              await Utils.sleep(500);
            }   
          }      
        })); 
    }

    private async processSubmission(energyLabel: string, submission: RedditSubmission) {
        const redditSubmissionModel = new RedditSubmissionModel(submission);
        await redditSubmissionModel.linkToEnergy(energyLabel);
    }
}

class RedditExtractor {
    public static async processNodes(labels: string[]) {
        await RedditSubmissionExtractor.getInstance().processNodes(labels);
        await RedditCommentsExtractor.getInstance().processNodes(labels);
    }
}


export { RedditExtractor }