import { Tweet } from "@model/Tweet";

export const tweets: Tweet[] = [
  { 
    label: 'Tweet', 
    properties: { 
      id: "1391396854601064455",
      author_id: "432613559",
      entities:{
        annotations: [
          {
            start: 291,
            end: 297,
            probability: 0.8651,
            type: "Place",
            normalized_text: "England"
          }
        ],
        mentions: [
          {
            start: 0,
            end: 9,
            username: "robgarde"
          },
          {
            start: 10,
            end: 20,
            username: "scirius22"
          },
          {
            start: 21,
            end: 36,
            username: "MarinaNigrelli"
          }
        ]
      },
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0
      },
      context_annotations: [
        {
          domain: {
            id: '65',
            name: "Interests and Hobbies Vertical",
            description: "Top level interests and hobbies groupings, like Food or Travel"
          },
          entity: {
            id: "848920371311001600",
            name: "Technology",
            description: "Technology and computing"
          }
        },
      ],
      text: "@robgarde @scirius22 @MarinaNigrelli We pay taxes, our oil and don't say it's just about run out because the are already exploring new fields. Tourism, renewable energy but to name a few .. But yes Independence we will 🙄 struggle on with the pitance we will make and not want anything from England",
      created_at: "2021-05-09T14:17:15.000Z"
    } 
  },
];