import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';

export async function getArticleAndSummary(url: string) {
  const response = await fetch(url, {
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

  if (!article?.content) {
    return {
      article: null,
      summary: null,
    };
  }

  return {
    article: article?.content,
    summary: article?.excerpt,
  };
}
