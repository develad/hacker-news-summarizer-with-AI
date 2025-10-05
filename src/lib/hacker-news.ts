// https://news.ycombinator.com/rss

import { extract } from '@extractus/feed-extractor';

const RSS_URL = 'https://news.ycombinator.com/rss';

export async function getFeed() {
  const data = await extract(RSS_URL);
  return data.entries;
}
