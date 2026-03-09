# ASO & AEO Strategy Guide 🚀

Ovaj dokument objašnjava kako smo implementirali **ASO** (App Store Optimization) i **AEO** (Answer Engine Optimization) u okviru Vet Record projekta.

---

## 📱 ASO (App Store Optimization)
ASO je proces optimizacije mobilnih aplikacija kako bi se bolje rangirale u rezultatima pretrage na App Store-u i Google Play-u.

### Kako smo to uradili na webu:
1. **Direct Deep Linking**: Dodali smo direktne linkove do prodavnica na strateškim mestima (Hero sekcija, Footer, dno Blog postova).
2. **Badge Consistency**: Koristimo zvanične Apple i Google oznake (`badges`) koje ulivaju poverenje korisnicima.
3. **Cross-Platform Visibility**: Blog postovi služe kao "ulazna vrata". Svaki post se završava pozivom na akciju (CTA) koji vodi direktno do instalacije.
4. **Tracking**: Svaki klik na prodavnicu se prati preko PostHog-a i Google Analytics-a kako bismo znali koji blog postovi najbolje konvertuju čitaoce u korisnike.

**Primer (BlogAppDownloads komponenta):**
```tsx
<a href={APP_LINKS.GOOGLE_PLAY} onClick={() => logEvent('app_download')}>
  <img src="/images/download/googleplay.png" alt="Get it on Google Play" />
</a>
```

---

## 🤖 AEO (Answer Engine Optimization)
AEO je nova grana SEO-a koja se fokusira na to da sadržaj bude razumljiv AI sistemima (poput Perplexity, ChatGPT, Gemini, ili Google SGE) kako bi oni mogli direktno da odgovore na pitanja korisnika koristeći vaš sajt.

### Ključne implementacije u kodu:
1. **JSON-LD Structured Data (Article Schema)**:
   - Umesto običnog teksta, AI sistemima serviramo strukturiran JSON koji im tačno kaže ko je autor, kada je post napisan i o čemu se radi.
   - **Zašto Article?** Google i AI sistemi preferiraju `Article` šemu za vesti i blogove jer je najdetaljnija.

   **Primer implementacije:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Article",
     "headline": "Naslov posta",
     "datePublished": "2024-03-09",
     "author": { "@type": "Person", "name": "Dragoslav" }
   }
   ```

2. **Semantic HTML5**:
   - Koristimo `<article>`, `<header>`, `<h1>` i `<footer>` tagove. AI "scrapperi" koriste ove tagove da razumeju hijerarhiju informacija.
   
3. **Canonical Tagging**: 
   - AI botovi često nailaze na duplikat sadržaja. `rel="canonical"` im govori: "Ovo je originalni izvor istine, ignorišite ostale linkove".
   - Ovo sprečava "halucinacije" AI modela o tome gde se nalazi tačna informacija.

4. **Metapodaci iz Ghost-a**:
   - Koristimo `meta_title` i `meta_description` polja. AI sistemi ove kratke opise koriste kao "snippet" za svoje odgovore.

---

## 💡 Rezultat
Kada neko pita AI: *"What is the best app for tracking pet health?"*, zahvaljujući **AEO** optimizaciji, AI će lakše pronaći Vet Record blog, a zahvaljujući **ASO** linkovima, korisnik će jednim klikom preći sa odgovora na samu aplikaciju.
