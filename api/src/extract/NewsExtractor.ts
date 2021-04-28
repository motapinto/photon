import { Article } from '../model/Article';
import HttpClient from './HttpClient';

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
      'x-rapidapi-key': '8b7d7f7584msh443e1aa33106021p179eaejsn0518b148a684',
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

(async () => {  
  const extractor = new NewsExtractor();
  try {
    await extractor.getAll();
  } catch (error) {
    console.log(error);
  }
})();
