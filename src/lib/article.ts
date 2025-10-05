import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import { ArticleSummary } from '../types';
import DOMPurify from 'dompurify';

export async function getArticleAndSummary(options: {
  articlesKV: KVNamespace;
  url: string;
}) {
  //   let result: ArticleSummary | null = null;
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

  Array.from(document.getElementsByTagName('img')).forEach((link) => {
    link.src = new URL(link.src, options.url).href;
  });
  Array.from(document.getElementsByTagName('a')).forEach((link) => {
    link.href = new URL(link.href, options.url).href;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'nofollow noopener');
  });
  let reader = new Readability(document);
  let article = reader.parse();

  result = {
    article: null,
    summary: null,
  };

  if (article?.content) {
    const { window } = parseHTML('');
    const purify = DOMPurify(window);
    const cleanArticle = purify.sanitize(article.content);
    const cleanExcerpt = purify.sanitize(article.excerpt!);

    result = {
      article: cleanArticle,
      summary: cleanExcerpt,
    };
  }

  await options.articlesKV.put(options.url, JSON.stringify(result));

  return result;
}
