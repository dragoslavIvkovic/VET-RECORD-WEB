# To-Do List

## 💡 Rezime zajedničkih problema
Analizom svih stavki, izdvajaju se tri ključna sistemska problema koja se prožimaju kroz više kategorija:
1. **Neadekvatni vizuelni aseti:** Slike su često prevelike (loše performanse), nemaju deskriptivni tekst (loš SEO/A11y) i nedostaje im varijeteta (slabo angažovanje).
2. **Nedostaci u interaktivnosti i pristupačnosti:** Elementi kao što su slajderi i dugmad su premali za mobilne ekrane, nemaju imena za screen readere i imaju loš kontrast.
3. **Zastareli build i struktura:** Korišćenje legacy JavaScript-a i nedostatak semantičkih/JSON-LD elemenata usporavaju sajt i smanjuju vidljivost na pretraživačima.

---

## Navigacija i Pretraga
- [ ] **Paginacija i Filteri:** Lista postova je dugačka bez paginacije, kategorija (npr. "Psi", "Mačke", "Vakcine") ili search bara – korisnici bi se lakše snalazili sa filterima. Ovo bi poboljšalo UX za veće arhive.

## Sadržaj i Engagement
- [ ] **Ispravka datuma:** Mnogi postovi su iz marta 2026 (budući datumi) – proveriti i ispraviti datume objavljivanja.
- [ ] **Konsolidacija tema:** Postoji dupliranje tema (npr. više članaka o anksioznosti ili mačkama) – razmotriti spajanje ili jasniju diferencijaciju.
- [ ] **Poboljšanje sažetaka (Teasers):** Sažeci se prekidaju usred rečenice – podesiti da budu potpuni i privlačni "teaser-i".
- [ ] **Interakcija korisnika:** Dodati komentare, gumbe za deljenje (share) i ankete (npr. "Kako vaš pas reaguje na oluju?").
- [ ] **Vizuelni elementi:** Dodati više slika (psi, mačke), infografika i screenshot-ova aplikacije kako bi se povećao engagement (trenutno je previše teksta).

## SEO i Performanse
- [ ] **Meta tagovi i Ključne reči:** Dodati nedostajuće meta tagove i optimizovati ključne reči za bolju vidljivost na Google-u.
- [ ] **Alt Text za slike:** Obavezno dodati opisni alt text za sve nove slike (npr. "Vet Record app interfejs za praćenje vakcina").
- [ ] **Optimizacija za društvene mreže:** Poboljšati naslove i opise za Open Graph (Facebook/LinkedIn) i Twitter/X kartice.
- [ ] **Lighthouse - Performanse (Trenutno 65/100):**
    - [ ] **Optimizacija veličine slika (Est savings ~469 KiB):**
        - [x] `keyftr1.png`: Smanjeno sa 1126x1430 na 284x361.
        - [ ] Slider slike (`slide-01.webp` do `slide-10.webp`): Smanjiti sa 1080x1080 na ~320x320. (Potreban alat za WebP resize, sips ne podržava)
        - [x] Avatari (`banavt1.png` do `banavt4.png`): Smanjeno sa 60x60 na 36x36.
        - [x] Download badges (`googleplay.png`, `appstore.png`): Smanjeno na visinu od 56px.
        - [ ] Razmotriti modernije formate (WebP/AVIF) za preostale PNG fajlove.
    - [ ] **Smanjiti resurse koji blokiraju renderovanje:** 
        - [ ] Rešiti render-blocking CSS (`1efa74d1ef62e969.css`) kako bi se ubrzao LCP i FCP.
    - [ ] **Ukloniti Legacy i Nekorišćen JavaScript:** 
        - [ ] **Google Tag Manager:** Optimizovati GTM učitavanje (~123 KiB uštede).
        - [ ] **Surveys Extension:** Proveriti `static/surveys.js` (~25 KiB uštede) i `surveys-extension-utils.tsx`.
        - [ ] Optimizovati build proces da ne uključuje nepotrebne polifile: `Array.at`, `flat`, `flatMap`, `Object.fromEntries`, `Object.hasOwn`, `String.trimEnd`, `String.trimStart`, `Math.trunc`.
    - [ ] **LCP Optimizacija:** 
        - [ ] Primeti se `fetchpriority="high"` na LCP slici (`slide-01.webp`) kako bi se brže otkrila.
        - [ ] Smanjiti "Element render delay" koji je trenutno ~1.95s.
        - [ ] Smanjiti "Critical Path Latency" koji je trenutno 615ms (između hosta i CSS-a).
    - [ ] **Eksplicitne dimenzije slika:** Osigurati `width` i `height` za sve elemente.
- [ ] **Multilingual podrška:** Implementirati podršku za više jezika, prvenstveno srpski prevod.
- [ ] **Kanonizacija URL-ova:** Osigurati da sve dinamičke rute ispravno koriste kanonske tagove.
- [ ] **Preconnect rane izvore:** Preporučuje se preconnect za ključne domene (npr. fonts, tagmanager).

## Opšte i Kredibilitet
- [ ] **Biografije autora:** Umesto generičkog "vet record", dodati biografije autora ili guest autore za veći kredibilitet.
- [ ] **Integracija sa društvenim mrežama:** Direktna integracija/linkovi ka X (Twitter) i Instagram profilima za promociju.

## Pristupačnost (Accessibility - Trenutno 86/100)
- [ ] **Imena dugmadi:** 
    - [ ] **Slider navigacija:** Strelice (levo/desno) nemaju pristupačna imena (`aria-label`).
- [ ] **Kontrast boja:** 
    - [ ] "features" span (`text-[#FF5733]`) na svetloj pozadini nema dovoljan kontrast.
    - [ ] Proveriti kontrast za `bg-[#F3F5FF]` sekcije.
- [ ] **Veličina i razmak touch meta:** 
    - [ ] **Slider dugmad (pagination dots):** Dugmad `Go to slide 1-10` su premala. Povećati touch area na minimum 44x44px.
- [ ] **Lighthouse/WAVE testiranje:** Identifikovati i popraviti probleme koji sprečavaju skor 100/100 (cilj je popraviti ARIA atribute i landmark role).
- [ ] **Semantički HTML:** Koristiti `<header>`, `<nav>`, `<main>`, `<footer>` i druge semantičke elemente za bolju navigaciju tastaturom.
- [ ] **Ispravka anchor linkova:** Proveriti da li `#reviews` i slični linkovi zbunjuju asistivne tehnologije.


insagram https://www.instagram.com/vetrecord.app/

tiktok https://www.tiktok.com/@vet.record

[omterest https://www.pinterest.com/vetrecord/
]