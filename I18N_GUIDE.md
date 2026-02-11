# Vodič za dodavanje novog jezika

## Struktura

```
src/
├── i18n/
│   ├── config.ts          # Lista locale-a, default, hreflang mapiranje
│   ├── messages/
│   │   ├── sr.json        # Srpski (latinica)
│   │   └── en.json        # English
│   ├── get-messages.ts
│   └── translations-context.tsx
├── proxy.ts               # Detekcija jezika, redirect (Next.js 16+)
└── app/
    └── [locale]/          # Sve stranice pod locale segmentom
```

## Koraci za dodavanje novog jezika (npr. `de` za nemački)

### 1. Ažuriraj `src/i18n/config.ts`

```ts
export const locales = ['sr', 'en', 'de'] as const;

export const localeNames: Record<Locale, string> = {
    sr: 'Srpski',
    en: 'English',
    de: 'Deutsch',  // novo
};

export const localeToHreflang: Record<Locale, string> = {
    sr: 'sr-Latn',
    en: 'en',
    de: 'de',  // novo
};
```

### 2. Kreiraj `src/i18n/messages/de.json`

Kopiraj strukturu iz `en.json` i prevedi sve vrednosti.

### 3. Proxy automatski podržava novi locale

`proxy.ts` koristi `locales` iz config-a – nema izmena.

### 4. Sitemap automatski uključuje nove locale

`sitemap.ts` iterira preko `locales` – nema izmena.

### 5. LanguageSwitcher automatski prikazuje novi jezik

`LanguageSwitcher` koristi `locales` i `localeNames` – nema izmena.

### 6. Metadata alternates

U `app/[locale]/layout.tsx` – dodaj novo polje u `alternates.languages`:

```ts
alternates: {
    languages: {
        'sr-Latn': `${SITE_URL}/sr`,
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,  // novo
    },
},
```

## URL struktura

- `/sr/` – početna (srpski)
- `/en/` – početna (engleski)
- `/sr/about` – O nama
- `/en/contact` – Contact

## Default jezik

Default je `sr` (sr-Latn). Korisnici sa `Accept-Language: sr` ili bez jasne preferencije dobijaju `/sr/`.
