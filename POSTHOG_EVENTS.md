# PostHog Analytics Documentation

This document outlines the PostHog initialization and the specific events tracked across the Vet Record marketing site.

## 1. Initialization Pattern

PostHog is initialized centrally in `src/app/providers.tsx` using the standard Next.js client-side pattern.

### Configuration Features:
- **Reverse Proxy**: Uses `/ingest` (configured in `next.config.ts`) to avoid ad-blockers.
- **Privacy First**: 
  - `disable_session_recording: true` (Screen recording is **FULLY DISABLED**).
  - `autocapture: false` (Only explicit events are tracked).
  - `capture_pageview: false` (Page navigation is NOT automatically tracked).
  - `capture_pageleave: false` (Session duration is NOT automatically tracked).
  - `enable_heatmaps: false` (Heatmaps/Toolbar UI disabled by default).
- **Environment**: Automatically uses `process.env.NEXT_PUBLIC_POSTHOG_KEY`.

---

## 2. Tracked Events by Screen

### Global / Navigation (`src/app/components/NavigationBar.tsx`)
| Event | Action | Properties |
|-------|--------|------------|
| `scroll_to_reviews_clicked` | User clicks "Reviews" in the nav | None |
| `app_download_clicked` | User clicks App Store/Google Play badges | `platform`, `source: 'navigation'` |

---

### Home Page (`src/app/components/HeroSection.tsx`)
| Event | Action | Properties |
|-------|--------|------------|
| `app_download_clicked` | User clicks badges in the hero section | `platform`, `source: 'hero_section'` |

---

### Blog Listing (`src/app/blog/BlogPostLink.tsx`)
| Event | Action | Properties |
|-------|--------|------------|
| `blog_post_clicked` | User clicks on a blog post card | `post_slug`, `post_title` |

---

### Calculator Page (`src/app/calculator/page.tsx`)
| Event | Action | Properties |
|-------|--------|------------|
| `calculator_breed_selected` | User selects a breed from the search | `pet_type`, `breed_name` |
| `calculator_result_shown` | User completes calculation | `pet_type`, `breed_name`, `age_group`, `weight_unit`, `weight_value`, `weight_status` |

---

### Review Section (`src/app/components/ReviewSection.tsx`)
| Event | Action | Properties |
|-------|--------|------------|
| `app_download_clicked` | User clicks badges in the reviews section | `platform`, `source: 'review_section'` |

---

### Contact Page (`src/app/contact/ContactActions.tsx`)
| Event | Action | Properties |
|-------|--------|------------|
| `app_download_clicked` | User clicks badges on contact page | `platform`, `source: 'contact_page'` |
| `contact_email_clicked` | User clicks the contact email link | None |

---

### Footer (`src/app/components/Footer.tsx`)
| Event | Action | Properties |
|-------|--------|------------|
| `newsletter_subscribe_clicked` | User clicks newsletter submit | None |
| `app_download_clicked` | User clicks badges in footer | `platform`, `source: 'footer'` |
| `pinterest_clicked` | User clicks Pinterest social link | None |
| `product_hunt_clicked` | User clicks Product Hunt badge/link | `link_type` ('badge_ios', 'card_cta') |

---

## 3. Summary of Event Properties

- **app_download_clicked**:
  - `platform`: 'android' | 'ios'
  - `source`: 'navigation' | 'hero_section' | 'footer' | 'contact_page' | 'review_section'
