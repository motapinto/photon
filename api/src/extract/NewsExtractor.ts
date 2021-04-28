import { Article } from '../model/Article';
import HttpClient from './HttpClient';
import dotenv from 'dotenv';

interface NewsApiResponse {
  _type: string,
  didUMean: string,
  totalCount: number,
  relatedSearch: string[],
  value: Article[]
}

export default class NewsExtractor extends HttpClient {
  private url: string;
  private static energyTopics = [
    'Energy',
    /*'Renewable Energy',
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
    'Hydro Energy'*/
  ];

  constructor() {
    super({
      'x-rapidapi-key': process.env.NEWS_API_KEY,
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
    });

    this.url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI';
  }

  public async getAll() {    
    NewsExtractor.energyTopics.forEach(async (topic: string) => {            
      const news = await this.instance.get<NewsApiResponse>(this.url, {
        params: {
          q: topic,
          pageNumber: '1',
          pageSize: '1',
          autoCorrect: 'true',
          fromPublishedDate: 'null',
          toPublishedDate: 'null',
        }
      });

      news.value.forEach(async (article) => this.processArticle(article));

    });  
  }

  private async processArticle(article: Article) {
    console.log(article);
  }
}

dotenv.config();
if (!process.env.NEWS_API_KEY) {
  throw new Error('NEWS_API_KEY must be defined');
}

(async () => {  
  const extractor = new NewsExtractor();
  try {
    await extractor.getAll();
  } catch (error) {
    console.log(error);
  }
})();
