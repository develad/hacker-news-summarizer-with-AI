# Hacker News Summary

A Cloudflare Worker that fetches Hacker News stories and generates AI-powered summaries. Built with Hono, JSX, and Cloudflare's AI capabilities.

## Features

- Fetches latest stories from Hacker News
- Generates AI summaries of articles
- Clean, minimal UI with Pico CSS
- Caches articles and summaries in Cloudflare KV
- Server-side rendered with JSX

## Tech Stack

- [Hono](https://hono.dev/) - Lightweight web framework
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform
- [Cloudflare AI](https://developers.cloudflare.com/workers-ai/) - AI model integration
- [Pico CSS](https://picocss.com/) - Minimal CSS framework
- TypeScript & JSX

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start local development server:

   ```bash
   npm run dev
   ```

3. Deploy to Cloudflare:
   ```bash
   npm run deploy
   ```

## Environment Setup

The project requires the following Cloudflare resources:

- Cloudflare Workers AI binding named "AI"
- KV namespace for caching articles
- Appropriate environment variables configured in `.dev.vars`

To generate TypeScript types for your Worker configuration:

```bash
npm run cf-typegen
```

## Project Structure

- `src/index.tsx` - Main application entry point and UI components
- `src/lib/` - Helper functions for fetching articles and generating summaries
- `src/types/` - TypeScript type definitions

## More Info At:

- [Hacker News RSS Feed](https://news.ycombinator.com/rss)
- [Hono JSX Renderer](https://hono.dev/docs/middleware/builtin/jsx-renderer)
- [Cloudflare AI Models](https://developers.cloudflare.com/workers-ai/models/)
- [Cloudflare KV Documentation](https://developers.cloudflare.com/kv/)
- [Cloudflare AI Fine-tuning](https://developers.cloudflare.com/workers-ai/features/fine-tunes/loras/)
- [Cloudflare Public LoRAs](https://developers.cloudflare.com/workers-ai/features/fine-tunes/public-loras/)

## License

MIT
