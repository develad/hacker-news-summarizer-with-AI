import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { getFeed } from './lib/hacker-news';
import { getArticleAndSummary } from './lib/article';
import { AppEnv } from './types';
import { raw } from 'hono/html';
import { css, Style } from 'hono/css';

const app = new Hono<AppEnv>();

app.use(
  '*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          ></link>
          <Style>
            {css`
            @import url('https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap');

            :root{
              --pico-font-family: "Syne Mono", monospace;
              
\            }`}
          </Style>
        </head>
        <body class="container">{children}</body>
      </html>
    );
  })
);

app.get('/', async (c) => {
  // throw new Error('oh no!');
  // return c.html(<h1>Hello world</h1>);
  // return c.render(<h1>Hello world</h1>);

  const items = await getFeed();
  // const items = [
  //   {
  //     title: "What GPT-oss Leaks About OpenAI's Training Data",
  //     link: 'https://fi-le.net/oss/',
  //     comments: '',
  //   },
  // ];

  // return c.render(<>{JSON.stringify(items, null, 2)}</>);
  return c.render(
    <>
      <h1 style={{ margin: '2rem 0', textAlign: 'center' }}>
        Hacker News Summary
      </h1>
      {await Promise.all(
        items?.map(async (entry) => {
          const result = await getArticleAndSummary({
            ai: c.env.AI,
            articlesKV: c.env.articles,
            url: entry.link!,
          });

          const optionsDate = {
            year: 'numeric' as const,
            month: 'numeric' as const,
            day: 'numeric' as const,
            hour: 'numeric' as const,
            minute: 'numeric' as const,
            second: 'numeric' as const,
            hour12: false,
            timeZone: 'Asia/Jerusalem',
          };

          // "12/19/2012, 19:00:00"

          return (
            <details>
              <summary
                role="button"
                class="outline contrast"
              >
                {new Intl.DateTimeFormat('he-IL', optionsDate).format(
                  new Date(entry.published!)
                )}
                {' | '}
                {entry.title}
              </summary>
              <article>
                <header>
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    Article
                  </a>
                  {' | '}
                  <a
                    href={entry.comments}
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    Comments
                  </a>
                </header>
                {result.article ? (
                  <div>
                    <h2>✨ AI Summary</h2>
                    {result.summary ? (
                      raw(result.summary)
                    ) : (
                      <p>Summary unavailable</p>
                    )}
                    <hr />
                    <h2>Article</h2>
                    {raw(result.article)}
                  </div>
                ) : (
                  <h2>Unable to retrieve article.</h2>
                )}
              </article>
            </details>
          );
        })
      )}
    </>
  );
});

app.notFound((c) => {
  return c.render(<h1>Not Found - {c.req.path}</h1>);
});

app.onError((error, c) => {
  c.status(500);
  return c.render(<h1>Error - {error.message}</h1>);
});

export default app;
