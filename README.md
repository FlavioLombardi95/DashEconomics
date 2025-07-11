# Global Economic Dashboard

Dashboard web interattiva per monitorare in tempo reale le 20 economie più grandi del mondo con dati reali dalle fonti ufficiali.

## Funzionalità
- **Panoramica globale** - PIL, popolazione, top 5 economie (dati World Bank)
- **Industrie principali** - Distribuzione settoriale per paese (dati ufficiali)
- **Export e import** - Commercio internazionale (UN Comtrade)
- **Notizie economiche** - Aggiornamenti in tempo reale da fonti ufficiali
- **Grafici interattivi** - Bar, pie, area chart con dati aggiornati
- **Aggiornamento in tempo reale** - Pulsante refresh per dati freschi

## API e Fonti Dati Reali

### ✅ Implementate
- **World Bank API** - PIL e popolazione in tempo reale
- **UN Comtrade** - Dati export/import per categoria
- **Fonti ufficiali** - Notizie da banche centrali e istituti statistici

### 📊 Dati Disponibili
- **PIL nominale** (USD) - World Bank
- **Popolazione** - World Bank  
- **Industrie** - Bureau of Economic Analysis, National Bureau of Statistics, Federal Statistical Office
- **Commercio** - UN Comtrade (2022)
- **Notizie** - Federal Reserve, ISTAT, RBI, VDA, etc.

### 🔄 Aggiornamenti
- **Dati economici**: Aggiornati automaticamente dalle API
- **Notizie**: Aggiornate manualmente con fonti ufficiali
- **Ultimo aggiornamento**: Visualizzato per ogni sezione

## Come avviare in locale

1. Installa le dipendenze:
   ```bash
   npm install
   ```

2. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

3. Apri [http://localhost:3000](http://localhost:3000) nel browser.

## Deploy gratuito su Vercel

1. Vai su [https://vercel.com/import](https://vercel.com/import)
2. Collega il tuo repository GitHub (o carica la cartella del progetto)
3. Segui le istruzioni (Vercel rileva Next.js automaticamente)
4. Clicca su "Deploy"

**Non serve configurazione aggiuntiva!**

## Tecnologie
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Grafici**: Chart.js, React-Chartjs-2
- **API**: World Bank, UN Comtrade, fonti ufficiali
- **Deploy**: Vercel (gratuito)

## Note sui Dati
- Tutti i dati sono provenienti da fonti ufficiali e accreditate
- Le date di ultimo aggiornamento sono sempre visibili
- In caso di dati non disponibili, vengono mostrati i dati più recenti disponibili
- Le notizie economiche sono aggiornate manualmente da fonti ufficiali

---

**Progetto creato da Flavio Enrico Lombardi**

*Dati economici in tempo reale dalle fonti più affidabili al mondo* 