import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

const app = new Hono();

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
        </head>
        <body
          class="container"
          style={{ padding: '4rem' }}
        >
          {children}
        </body>
      </html>
    );
  })
);

app.get('/', (c) => {
  // throw new Error('oh no!');
  // return c.html(<h1>Hello world</h1>);
  return c.render(<h1>Hello world</h1>);
});

app.notFound((c) => {
  return c.render(<h1>Not Found - {c.req.path}</h1>);
});

app.onError((error, c) => {
  c.status(500);
  return c.render(<h1>Error - {error.message}</h1>);
});

export default app;
