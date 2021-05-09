import { Tweet } from '@model/Tweet';
import HttpClient from './HttpClient';

interface TwitterApiResponse {
  data: Tweet[],
  meta: object
}

export default class TwitterExtractor extends HttpClient {
  private static instance: TwitterExtractor;
  private static url = 'https://api.twitter.com/2/tweets/search/recent'; 

  private static energyTopics = [
    'Energy',
    'Renewable Energy',
    'Non Renewable Energy',
    'Fossil fuels',
    'Solar energy',
    'Hydrogen energy',
    'Wind energy',
    'Natural Gas',
    'Nuclear energy',
    'Coal',
    'Geothermal',
    'Biomass',
    'Hydro Energy'
  ];

  private constructor() {
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

  public async getAll() {    
    TwitterExtractor.energyTopics.forEach(async (topic: string) => {            
      const Twitter = await super.get<TwitterApiResponse>({
        params: {
          query: topic,
          max_results: 100,
          'tweet.fields': 'author_id,context_annotations,created_at,entities,id,public_metrics,text'
        }
      });

      Twitter.data.forEach(async (tweet) => this.processTweet(tweet));
    });  
  }

  private async processTweet(tweet: Tweet) {
    console.log(tweet);
  }
}

TwitterExtractor.getInstance().getAll();
