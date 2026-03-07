<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Vet Record marketing site. The project already had `posthog-js` installed and partial event tracking in place; this integration upgraded the initialization pattern to use `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), added an EU reverse proxy via Next.js rewrites, set up environment variables, and instrumented 10 new events across 8 files. Two new client components were created to enable tracking inside server-component pages without breaking their `metadata` exports. Two pre-existing lint errors in edited files were also corrected.

## Files changed

| File | Change |
|------|--------|
| `instrumentation-client.ts` (new) | PostHog client-side initialization using the Next.js 15.3+ pattern; replaces the `useEffect`-based init |
| `src/app/providers.tsx` | Removed `posthog.init()` call; now purely a thin `PHProvider` context wrapper for `usePostHog()` hooks |
| `next.config.ts` | Added EU reverse proxy rewrites (`/ingest/*` → PostHog EU) and `skipTrailingSlashRedirect: true` |
| `src/app/calculator/page.tsx` | Added `calculator_breed_selected` and `calculator_result_shown` events |
| `src/app/components/NavigationBar.tsx` | Added `scroll_to_reviews_clicked` event |
| `src/app/components/Footer.tsx` | Added `newsletter_subscribe_clicked`, `product_hunt_clicked` (badge + card CTA), `pinterest_clicked` events |
| `src/app/components/ReviewSection.tsx` | Added `see_all_reviews_clicked` event |
| `src/app/contact/ContactActions.tsx` (new) | Client component exposing `ContactDownloadButtons` and `ContactEmailButton` with `app_download_clicked` and `contact_email_clicked` tracking |
| `src/app/contact/page.tsx` | Replaced inline download/email elements with `ContactActions` client components |
| `src/app/blog/BlogPostLink.tsx` (new) | Client component wrapping `Link` with `blog_post_clicked` tracking |
| `src/app/blog/page.tsx` | Replaced `Link` wrappers on post cards with `BlogPostLink` |

## Events instrumented

| Event | Description | File |
|-------|-------------|------|
| `app_download_clicked` *(extended)* | App store CTA clicked — now also tracked on the contact page. Properties: `platform`, `source` | `src/app/contact/ContactActions.tsx` |
| `calculator_breed_selected` | User picks a breed in the pet weight calculator. Properties: `pet_type`, `breed_name` | `src/app/calculator/page.tsx` |
| `calculator_result_shown` | User submits the calculator and sees a weight assessment. Properties: `pet_type`, `breed_name`, `age_group`, `weight_unit`, `weight_value`, `weight_status` | `src/app/calculator/page.tsx` |
| `scroll_to_reviews_clicked` | User clicks the "Reviews" nav anchor link | `src/app/components/NavigationBar.tsx` |
| `newsletter_subscribe_clicked` | User clicks the subscribe arrow in the footer newsletter form | `src/app/components/Footer.tsx` |
| `product_hunt_clicked` | User clicks a Product Hunt badge or card CTA. Properties: `link_type` (`badge_ios`, `card_cta`) | `src/app/components/Footer.tsx` |
| `pinterest_clicked` | User clicks the Pinterest icon in the footer | `src/app/components/Footer.tsx` |
| `see_all_reviews_clicked` | User clicks "See all reviews on Google Play" in the Reviews section | `src/app/components/ReviewSection.tsx` |
| `contact_email_clicked` | User clicks the email link on the contact page | `src/app/contact/ContactActions.tsx` |
| `blog_post_clicked` | User clicks a blog post card in the listing. Properties: `post_slug`, `post_title` | `src/app/blog/BlogPostLink.tsx` |

*(Previously existing: `blog_link_clicked` in `MDXContent.tsx`, `app_download_clicked` in `HeroSection.tsx`, `NavigationBar.tsx`, `Footer.tsx`)*

## Next steps

We've built an **"Analytics basics"** dashboard and 5 insights to start tracking user behavior immediately:

- **Dashboard**: [Analytics basics](https://eu.posthog.com/project/105081/dashboard/556740)

### Insights

- [App Downloads by Platform](https://eu.posthog.com/project/105081/insights/DqD6SAmt) — Daily trend of total, Android, and iOS download clicks
- [App Download CTA Source Breakdown](https://eu.posthog.com/project/105081/insights/9b9teLg0) — Which page section drives the most download intent (hero, nav, footer, contact)
- [Calculator Engagement Funnel](https://eu.posthog.com/project/105081/insights/4AnyYGcB) — Funnel from breed selection → result shown, to measure calculator completion rate
- [Blog & Content Engagement](https://eu.posthog.com/project/105081/insights/hDU9TjTB) — Blog post clicks, in-article link clicks, and reviews nav intent over time
- [Newsletter & Social Signals](https://eu.posthog.com/project/105081/insights/X9uhZWMx) — Newsletter subscribe clicks, Pinterest, Product Hunt, and "See all reviews" clicks

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
