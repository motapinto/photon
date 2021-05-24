import { errorLogger, infoLogger } from '@logger';
import { Article, ArticleModel } from '@model/Article';
import { TweetModel } from '@model/Tweet';
import Utils from '@utils/Utils';
import HttpClient from './HttpClient';

interface NewsApiResponse {
  value: Array<NewsApiArticle>
  totalCount: number,
}

type NewsApiArticle = TweetModel & {
    description: string, 
    body: string, 
    keywords: string, 
    language: string, 
    isSafe: boolean, 
    provider: { name: string }, 
    image: object
  };

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
      while(true) {  
        try {
          const news = await super.get<NewsApiResponse>({
            params: {
              q: label,
              pageNumber: '1',
              pageSize: '50',
              autoCorrect: 'true',
              fromPublishedDate: 'null',
              toPublishedDate: 'null',
            }
          });

          if(news.totalCount > 0) {
            await Promise.all(news.value.map(async (article: NewsApiArticle) => {
              const { description, body, keywords, language, isSafe, provider, image, ...properties } = article;
              return this.processArticle(label, properties as Article);
            }));
          }
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

  private async processArticle(energyLabel: string, article: Article) {
    const articleModel = new ArticleModel(article);
    return articleModel.create(energyLabel);
  }
}
