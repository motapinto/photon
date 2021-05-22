import { errorLogger, infoLogger } from '@logger';
import { Article, ArticleModel } from '@model/Article';
import HttpClient from './HttpClient';

interface NewsApiResponse {
  value: Article[]
  totalCount: number,
}

export default class NewsExtractor extends HttpClient {
  private static instance: NewsExtractor;
  private static url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI'; 

  private constructor() {
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

  public async processNodes(labels: string[]) {
    return Promise.all(labels.map(async label => {   
      try {
        const news = await super.get<NewsApiResponse>({
          params: {
            q: label,
            pageNumber: '1',
            pageSize: '2', // TODO: change back to 50
            autoCorrect: 'true',
            fromPublishedDate: 'null',
            toPublishedDate: 'null',
          }
        }) as NewsApiResponse;

        if(news.totalCount > 0) {
          return Promise.all(news.value.map(async (article) => await this.processArticle(label, article)));
        }
      } catch (err) {
        errorLogger.error(err.message);
      }         
    })); 
  }

  private async processArticle(energyLabel: string, article: Article) {
    const articleModel = new ArticleModel(article);
    await articleModel.add();
    await articleModel.linkToEnergy(energyLabel);
  }
}
