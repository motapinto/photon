import { errorLogger, infoLogger } from '@logger';
import { Article } from '@model/Article';
import { Record } from 'neo4j-driver';
import HttpClient from './HttpClient';

interface NewsApiResponse {
  _type: string,
  didUMean: string,
  totalCount: number,
  relatedSearch: string[],
  value: Article[]
}

export default class NewsExtractor extends HttpClient {
  private static instance: NewsExtractor;
  private static url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI'; 
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
    console.log("OH QUE CARALHO"); 
    super(NewsExtractor.url, {
      'x-rapidapi-key': process.env.NEWS_API_KEY,
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
    });
  }

  public static getInstance(): NewsExtractor {
    if (!NewsExtractor.instance) {
      NewsExtractor.instance = new NewsExtractor();
    }        

    return NewsExtractor.instance;
  };

  public async processAll() {    
    NewsExtractor.energyTopics.forEach(async (topic: string) => {   
      try {
        const news = await super.get<NewsApiResponse>({
          params: {
            q: topic,
            pageNumber: '1',
            pageSize: '50',
            autoCorrect: 'true',
            fromPublishedDate: 'null',
            toPublishedDate: 'null',
          }
        });
  
        news.value.forEach(async (article) => this.processArticle(article));
      } catch (err) {
        errorLogger.error(err);
      }         
    });  
  }

  public async processNodes(records: Record[] | undefined) {
    if(!records) {
      errorLogger.error('Received empty records on News extraction');
      return;
    }

    console.log(records);
    

    // TODO: send request for each ontology node record
  }

  private async processArticle(article: Article) {
    infoLogger.info(article);
  }
}
