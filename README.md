# christmas-lighthouse

Repo of The Christmas Lighthouse website. You can take a look at the website [here](https://www.thechristmaslighthouse.gr/en).

The Christmas Lighthouse website is a multilingual Next.js application that serves as the official online presence for the seasonal Christmas park at the Port of Alexandroupoli, beneath the town's lighthouse. It showcases the park’s attractions, the ice rink, the Christmas parade, the daily activities schedule, opening hours and contact information, in both Greek and English. It also hosts the QR‑driven café menu for park visitors.

**Core project tools:**

- [Next.js](https://nextjs.org/) as the meta-framework of choice
- [TailwindCSS](https://tailwindcss.com/) for all styling purposes
- [next-intl](https://next-intl-docs.vercel.app/) as the internationalization solution
- [Radix UI](https://www.radix-ui.com/primitives) for its accessible, unstyled primitives
- [shadcn/ui](https://ui.shadcn.com/) as a reference on the implementation of components
- [Lucide React](https://lucide.dev/) icon library
- [@chrismitsdev/menu-data](https://github.com/chrismitsdev/menu-data) for the café menu, shared with Yuppii
- [Valibot](https://valibot.dev/) schema & data validation library
- [Resend](https://resend.com/) & [React Email](https://react.email/) for the contact form emails

## Development

```bash
pnpm install
pnpm dev        # start the dev server
pnpm typecheck  # TypeScript
pnpm lint       # Biome
pnpm email      # preview the contact form email
```

The contact form needs these environment variables (in `.env.local` for development, in Vercel for production):

| Variable             | Example                                       | Notes                                  |
| -------------------- | --------------------------------------------- | -------------------------------------- |
| `RESEND_API_KEY`     | `re_…`                                        | Resend API key                         |
| `CONTACT_EMAIL_FROM` | `The Christmas Lighthouse <info@example.com>` | Must be on a domain verified in Resend |
| `CONTACT_EMAIL_TO`   | `owner@example.com`                           | Recipient(s), comma-separated          |
| `CONTACT_EMAIL_CC`   | `dev@example.com`                             | Optional, comma-separated              |

Replies go straight to the visitor (the email's reply-to is their address). A pre-push hook runs typegen, typecheck and lint.

## Updating for a new season

All copy lives in `messages/el.json` and `messages/en.json`.

- **Operating period & opening hours:** `pages.index.sections.about.info-card`.
- **Daily activities:** add one entry per day to `src/lib/events.ts` and matching `pages.index.sections.activities.events` messages. An event may omit `morning` on days the park opens only in the afternoon; also update `morningEventKeys` in `events.ts` (typecheck fails if it doesn't match the messages).
- **Parade:** set `PARADE_DATE` in `src/lib/events.ts` and update the `upcoming` / `past` copy under `pages.index.sections.parade`. The section shows the `upcoming` copy until the parade day (Greek time) and the `past` copy afterwards. The video entry in `src/app/sitemap.ts` should describe the video in `public/sections/parade/video`.

The home page re-renders every 30 minutes (`revalidate` in `src/app/[locale]/page.tsx`), so past activity days drop off, today's day opens by default and the parade section switches over without a redeploy.
