import axios from 'axios';
import HttpClient from './HttpClient';

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
      const data = await this.instance.get<any>(this.url, {
        params: {
          q: topic,
          pageNumber: '1',
          pageSize: '1',
          autoCorrect: 'true',
          fromPublishedDate: 'null',
          toPublishedDate: 'null',
        }
      });

      console.log(data);
    });      
  }

  /*private assembleTopicData(AxiosResponse) {

  }*/
}

(async () => {  
  const extractor = new NewsExtractor();
  try {
    await extractor.getAll();
  } catch (error) {
    console.log(error);
  }
})();
