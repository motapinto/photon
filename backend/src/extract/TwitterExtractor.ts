import { errorLogger, infoLogger } from '@logger';
import { Tweet } from '@model/Tweet';
import HttpClient from './HttpClient';
import { Integer, Record } from 'neo4j-driver';
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

  public async processAll() {    
    TwitterExtractor.energyTopics.forEach(async (topic: string) => {   
      try {
        const Twitter = await super.get<TwitterApiResponse>({
          params: {
            query: topic,
            max_results: 10,
            'tweet.fields': 'author_id,context_annotations,created_at,entities,id,public_metrics,text'
          }
        });
  
        Twitter.data.forEach(async (tweet) => this.processTweet(tweet));
      } catch (err) {
        errorLogger.error(err);
      }         
    });  
  }

  public async processNodes(records: Record[] | undefined) {
    if(!records) {
      errorLogger.error('Received empty records on Twitter extraction');
      return;
    }

    return Promise.all(records.map(async (record: any) => {   
      try {
        const node = record._fields[0];
        if(!node.properties.rdfs__label) return;

        console.log(node.properties.rdfs__label);

        const Twitter = await super.get<TwitterApiResponse>({
          params: {
            query: node.properties.rdfs__label,
            max_results: 10,
            'tweet.fields': 'author_id,context_annotations,created_at,entities,id,public_metrics,text'
          }
        });

        if(Twitter.meta.result_count > 0)
          Twitter.data.forEach(async (tweet) => this.processTweet(tweet));

      } catch (err) {
        errorLogger.error(err);
      }         
    }));  
  }

  private async processTweet(tweet: Tweet) {
    console.log(tweet);
    //infoLogger.info(tweet);
  }
}
