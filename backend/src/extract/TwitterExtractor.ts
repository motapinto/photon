import { errorLogger, infoLogger } from '@logger';
import { Tweet, TweetModel } from '@model/Tweet';
import HttpClient from './HttpClient';
import dotenv from 'dotenv';

interface TwitterApiResponse {
  data: Tweet[],
  meta: {
    result_count: number,
    [key: string]: any
  }
}

export default class TwitterExtractor extends HttpClient {
  private static instance: TwitterExtractor;
  private static url = 'https://api.twitter.com/2/tweets/search/recent'; 

  private constructor() {
    dotenv.config();
    super(TwitterExtractor.url, {
      'Authorization': `Bearer ${process.env.TWITTER_AUTHORIZATION}`,
    });
  }

  public static getInstance(): TwitterExtractor {
    if (!TwitterExtractor.instance) {
      TwitterExtractor.instance = new TwitterExtractor();
    }        

    return TwitterExtractor.instance;
  };

  public async processNodes(labels: string[]) {
    return Promise.all(labels.map(async label => {   
      try {
        console.log(label);

        const Twitter = await super.get<TwitterApiResponse>({
          params: {
            query: label,
            max_results: 10,
            'tweet.fields': 'author_id,created_at,id,public_metrics,text'
          }
        });

        if(Twitter.meta.result_count > 0)
          await Promise.all(Twitter.data.map(async (tweet) => await this.processTweet(label, tweet)));

      } catch (err) {
        errorLogger.error(err.message);
      }         
    }));  
  }

  private async processTweet(energyLabel: string, tweet: Tweet) {
    const tweetModel = new TweetModel(tweet);
    await tweetModel.add();
    await tweetModel.linkToEnergy(energyLabel);
    //infoLogger.info(tweet);
  }
}
