# AutoTech Pro — Gestionale Officina Web Edition

## Stack
- React 18 + Vite
- React Router DOM
- Lucide React icons
- Zero dipendenze esterne aggiuntive

## Installazione locale

```bash
npm install
npm run dev
# Apri http://localhost:5173
```

## Deploy GRATUITO su Vercel (5 minuti)

1. Crea account su https://vercel.com (gratis)
2. Vai su https://github.com → crea repo "autotech-pro"
3. Carica tutti i file di questa cartella
4. Su Vercel: "Add New Project" → importa da GitHub
5. Framework: Vite | Build: `npm run build` | Output: `dist`
6. Clicca Deploy → ottieni link tipo: https://autotech-pro-xxx.vercel.app

## Deploy su Netlify (alternativa)

1. Vai su https://netlify.com → "Add new site" → "Deploy manually"
2. Trascina la cartella `dist` (dopo `npm run build`)
   OPPURE connetti GitHub come Vercel

## Funzioni

- 🔧 10 sistemi riparazione con procedure OEM passo-passo
- 🔩 Esplosi 3D animati (Motore, Freni) con animazione esplosione
- 🔴 Scanner DTC 71+ codici SAE J2012 + diagnosi AI Claude
- 📋 15 Recall NHTSA reali 2024-2026 + API live NHTSA
- ⚡ 5 schemi elettrici interattivi SVG a colori
- 📊 Gestionale ordini di lavoro (dati salvati localStorage)
- 🔩 Catalogo 20+ ricambi OEM con carrello ordini
- 🚗 44.000+ veicoli selezionabili (35+ marche, 1990-2025)

## AI Integration
Il DTC Scanner usa Claude claude-sonnet-4-20250514 via API Anthropic
per diagnosi approfondite e analisi sintomi in linguaggio naturale.
