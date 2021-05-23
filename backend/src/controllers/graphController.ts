import { Request, Response } from 'express';
import { SectorModel, FilterParams } from '@model/Sector';
import { TweetModel } from '@model/Tweet';
import { ArticleModel } from '@model/Article';

export async function getAll(req: Request, res: Response) {
  try {
    const { 
      twitter_inf_limit, 
      twitter_sup_limit, 
      reddit_inf_limit, 
      reddit_sup_limit, 
      news_inf_limit, 
      news_sup_limit
    } = req.params;

    console.log(req.params);
    
    const filter_params = {
      twitter_limit: {
        inf_limit: parseInt(twitter_inf_limit),
        sup_limit: parseInt(twitter_sup_limit)
      },
      reddit_limit: {
        inf_limit: parseInt(reddit_inf_limit),
        sup_limit: parseInt(reddit_sup_limit)
      },
      news_limit: {
        inf_limit: parseInt(news_inf_limit),
        sup_limit: parseInt(news_sup_limit)
      }
    } as FilterParams;

    console.log(filter_params);

    const records = await SectorModel.getAll(filter_params);

    return res.status(200).json({
      records,
      min_tweets: TweetModel.total_min_tweets,
      max_tweets: TweetModel.total_max_tweets,
      min_news: ArticleModel.total_min_articles,
      max_news: ArticleModel.total_max_articles,
    });
  } catch (err) {
    return res.sendStatus(500);
  }
}