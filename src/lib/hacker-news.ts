// https://news.ycombinator.com/rss

import { extract, FeedEntry } from '@extractus/feed-extractor';

const RSS_URL = 'https://news.ycombinator.com/rss';

export async function getFeed() {
  const data = await extract(RSS_URL, {
    getExtraEntryFields(entry: any) {
      //   console.log(entry);
      return { comments: entry.comments };
    },
  });

  return data.entries as (FeedEntry & { comments: string })[];
}
