# 🍷 Vino App

Moderna web aplikacija za prikaz i pretragu vina iz srpskih vinarija. Aplikacija učitava podatke iz Google Sheets-a i prikazuje ih u interaktivnom, responsive interfejsu.

## ✨ Funkcionalnosti

- 📋 **Lista vina** - Grid prikaz svih vina sa karticama
- 🔍 **Pretraga** - Pretraga po imenu vina ili vinariji
- 🎚️ **Filteri** - Napredni filteri po:
  - Godini (od-do)
  - Ceni (min-max u RSD)
  - Sortiranje po ceni i oceni (rastuće/opadajuće)
- 📄 **Detalji vina** - Klik na karticu vodi na stranicu sa detaljnim informacijama
- 🌓 **Dark mode** - Podrška za svetli i tamni režim (sačuvan u local storage)
- 🔗 **URL state** - Svi filteri i pretraga se čuvaju u URL-u (shareable links)
- 📱 **Responsive** - Potpuno prilagodljiv prikaz za desktop, tablet i mobile
- ⚡ **Brz UX** - Skeleton loading, error boundary, optimizovan caching

## 🛠️ Tehnologije

### Frontend
- **React 19** - Najnovija verzija React biblioteke
- **TypeScript** - Type-safe development
- **Vite** - Brz build tool i dev server
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Server state management i caching
- **Material-UI (MUI)** - Moderna UI komponente biblioteka
- **Zustand** - Lightweight state management (za dark mode)
- **Zod** - Runtime type validation

### Tooling
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

### Deployment
- **GitHub Actions** - CI/CD pipeline
- **FTPS Deploy** - Automatski deploy na Loopiu

## 🚀 Pokretanje projekta

### Preduslovi
- Node.js 20+
- npm ili pnpm

### Instalacija

```bash
# Kloniraj repozitorijum
git clone <repo-url>
cd vino-app

# Instaliraj dependencies
npm install

# Kopiraj .env.example u .env i popuni Google Sheets kredencijale
cp .env.example .env
```

### Environment Variables

Kreiraj `.env` fajl u root-u projekta:

```env
# Google Sheets ID - iz URL-a: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
VITE_SHEET_ID=your_sheet_id_here

# GID (sheet tab ID) - obično 0 za prvu tabelu
VITE_SHEET_GID=0
```

### Development

```bash
# Pokreni dev server (http://localhost:5173)
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Format code
npm run format
```

### Production Build

```bash
# Build za produkciju
npm run build

# Preview production build
npm run preview
```

## 📊 Google Sheets Format

Aplikacija očekuje sledeće kolone u Google Sheets tabeli:

| Kolona            | Tip     | Obavezan | Opis                            |
|-------------------|---------|----------|---------------------------------|
| winery_name       | string  | Da       | Ime vinarije                    |
| wine_name         | string  | Da       | Naziv vina                      |
| wine_year         | number  | Ne       | Godina proizvodnje              |
| wine_caption_srb  | string  | Ne       | Opis na srpskom                 |
| wine_caption_eng  | string  | Ne       | Opis na engleskom               |
| wine_rate         | number  | Ne       | Ocena (0-10)                    |
| wine_price_rsd    | number  | Ne       | Cena u dinarima                 |
| wine_price_eur    | number  | Ne       | Cena u evrima                   |
| wine_image_url    | string  | Ne       | URL slike vina                  |
| wine_instagram    | string  | Ne       | Instagram handle vinarije       |

**Napomena:** Google Sheets tabela mora biti javno dostupna (Anyone with the link can view).

## 🏗️ Arhitektura projekta

```
vino-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── app/
│   │   ├── queryClient.ts      # TanStack Query config
│   │   └── themeStore.ts       # Zustand store za dark mode
│   ├── features/
│   │   └── wines/
│   │       ├── api/
│   │       │   ├── normalize.ts # Data transformation + Zod validation
│   │       │   └── sheets.ts    # Google Sheets API fetch
│   │       ├── components/
│   │       │   ├── Filters.tsx  # Filter komponenta sa accordion
│   │       │   ├── SearchBar.tsx
│   │       │   └── WineCard.tsx # Klikabilna kartica sa linkom
│   │       ├── pages/
│   │       │   ├── WinesPage.tsx       # Lista vina
│   │       │   └── WineDetailPage.tsx  # Detalji pojedinačnog vina
│   │       ├── hooks.ts         # useWines hook + filter logika
│   │       └── types.ts         # TypeScript types
│   ├── routes/
│   │   ├── __root.tsx          # Root route sa RouterDevtools
│   │   ├── index.tsx           # Home route (/) sa search params
│   │   └── wine.$id.tsx        # Wine detail route (/wine/:id)
│   ├── shared/
│   │   ├── components/
│   │   │   └── ErrorBoundary.tsx # React Error Boundary
│   │   └── ui/
│   │       └── Page.tsx          # Page wrapper sa dark mode toggle
│   ├── App.tsx                   # Root App component sa router
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts             # Vite env types
├── .env                          # Environment variables (git ignored)
├── .env.example                  # Example env file
├── .gitignore
├── .prettierrc                   # Prettier config
├── eslint.config.js              # ESLint flat config
├── package.json
├── tsconfig.json                 # TypeScript config (paths)
├── vite.config.ts                # Vite + TanStack Router plugin
└── README.md
```

## 🎯 Ključne komponente

### Routing
- **TanStack Router** sa file-based routing
- URL search params za filtere (shareable links)
- Type-safe navigation

### Data Fetching
- **TanStack Query** za caching (5 min stale time)
- Automatska normalizacija podataka iz Google Sheets
- Zod validacija za runtime type safety

### UI/UX
- Skeleton loading umesto spinnera
- "No results" poruka
- Error boundary za graceful error handling
- Dark mode sa Zustand (localStorage persistence)

## 🚢 Deployment

Aplikacija se automatski deployuje na Loopiu preko GitHub Actions kada se push-uje na `main` branch.

### Setup GitHub Secrets

U GitHub repozitorijumu, dodaj sledeće secrets:

```
FTP_SERVER=ftpcluster.loopia.se
FTP_USERNAME=your_username
FTP_PASSWORD=your_password
```

### Deploy proces

1. `npm ci` - Clean install dependencies
2. `npm run build` - Build za produkciju
3. FTPS upload `dist/` foldera na server

## 📝 TODO / Buduća poboljšanja

- [ ] PWA support (service worker, manifest)
- [ ] Meta tagovi za SEO
- [ ] Open Graph za social sharing
- [ ] Unit i integration testovi (Vitest + React Testing Library)
- [ ] E2E testovi (Playwright)
- [ ] Accessibility audit (ARIA labele, keyboard navigation)
- [ ] Image optimizacija (WebP, CDN)
- [ ] Paginacija ili virtualizacija za velike liste
- [ ] Analytics (Google Analytics ili Plausible)
- [ ] i18n (srpski/engleski)
- [ ] Dodaj tip vina filter (red/white/rose) u Google Sheets i app

## 🤝 Doprinos

Pull request-ovi su dobrodošli! Za veće izmene, molimo prvo otvorite issue da diskutujemo šta biste želeli da promenite.

## 📄 Licenca

MIT

---

⭐ Ako vam se projekat sviđa, ostavite zvezdicu!
