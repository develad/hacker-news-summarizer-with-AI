import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import { ArticleSummary } from '../types';

export async function getArticleAndSummary(options: {
  articlesKV: KVNamespace;
  url: string;
}) {
  let result = await options.articlesKV.get<ArticleSummary>(
    options.url,
    'json'
  );

  if (result) {
    return result;
  }

  const response = await fetch(options.url, {
    // @ts-ignore
    cf: {
      cacheEverything: true,
      cacheTtl: 60 * 60 * 24,
    },
  });

  const html = await response.text();

  const { document } = parseHTML(html);
  let reader = new Readability(document);
  let article = reader.parse();

  result = {
    article: null,
    summary: null,
  };

  if (article?.content) {
    result = {
      article: article.content,
      summary: article.excerpt,
    };
  }

  await options.articlesKV.put(options.url, JSON.stringify(result));

  return result;
}
