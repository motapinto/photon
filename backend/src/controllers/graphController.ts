import { Request, Response } from 'express';
import { SectorModel, FilterParams } from '@model/Sector';
import { TweetModel } from '@model/Tweet';
import { ArticleModel } from '@model/Article';
import { RedditCommentModel } from '@model/reddit/RedditComment';
import { RedditSubmissionModel } from '@model/reddit/RedditSubmission';

export async function getAll(req: Request, res: Response) {
  try {
    let { 
      twitter_inf_limit, 
      twitter_sup_limit, 
      reddit_inf_limit, 
      reddit_sup_limit, 
      news_inf_limit, 
      news_sup_limit
    } = req.query;

    if(!twitter_inf_limit || !twitter_sup_limit ||
       !reddit_inf_limit || !reddit_sup_limit ||
       !news_inf_limit || !news_sup_limit)
       throw new Error("Undefined filter parameter");
    
    const filter_params = {
      twitter_limit: {
        inf_limit: parseInt(twitter_inf_limit as string),
        sup_limit: parseInt(twitter_sup_limit as string)
      },
      reddit_limit: {
        inf_limit: parseInt(reddit_inf_limit as string),
        sup_limit: parseInt(reddit_sup_limit as string)
      },
      news_limit: {
        inf_limit: parseInt(news_inf_limit as string),
        sup_limit: parseInt(news_sup_limit as string)
      }
    } as FilterParams;

    console.log(filter_params);

    const records = await SectorModel.getAll(filter_params);
    await TweetModel.getLimits();
    await ArticleModel.getLimits();

    return res.status(200).json({
      records,
      min_tweets: TweetModel.total_min_tweets,
      max_tweets: TweetModel.total_max_tweets,
      min_news: ArticleModel.total_min_articles,
      max_news: ArticleModel.total_max_articles,
      min_reddits: RedditCommentModel.total_min_rcoms + RedditSubmissionModel.total_min_rsubs,
      max_reddits: RedditCommentModel.total_max_rcoms + RedditSubmissionModel.total_max_rsubs
    });
  } catch (err) {
    return res.sendStatus(500);
  }
}