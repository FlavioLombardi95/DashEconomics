
# 🧾 Product Requirements Document (PRD)

## 📌 Titolo del Prodotto
**Global Economic Dashboard**

## 🧭 Obiettivo
Creare una dashboard web leggera, responsive e interattiva per fornire agli **analisti finanziari** una panoramica chiara, aggiornata e comparabile dei dati economici principali delle 20 economie più grandi del mondo. L’obiettivo è aiutare l’utente a prendere decisioni strategiche nei mercati finanziari.

## 🧑‍💻 Utenti Target
- Analisti finanziari
- Economisti
- Decision maker aziendali
- Studenti avanzati di economia

## 🧩 Caratteristiche Principali

### 🔍 Panoramica Globale
- PIL nominale e popolazione da **World Bank API**
- Evidenza delle top 5 economie in tempo reale

### 🏭 Settori Industriali
- Visualizzazione della distribuzione settoriale per ciascun paese
- Fonte: Bureau of Economic Analysis, National Bureau of Statistics, etc.

### 🌍 Export / Import
- Dati da **UN Comtrade**, divisi per categorie di prodotto

### 📰 Notizie Economiche
- Recuperate automaticamente via API **(se disponibili)**
- Non prioritarie e non gestite via CMS

### 📊 Grafici Interattivi
- Tipi: Bar, Pie, Area chart
- Possibilità di switchare tipo di grafico (massimo 3)
- Interattività su hover, clic, tooltips
- Grafici aggiornabili manualmente con pulsante **“Refresh”**

### 🔄 Aggiornamento Dati
- Ogni **6 ore**
- Timer/clock visibile in UI con "Ultimo aggiornamento"
- Se API fallisce: mantenere ultimi dati disponibili in cache locale

### 🌐 Multilingua
- Supporto **inglese** e **italiano**
- Dati numerici (valute, date) adattati al formato linguistico

## 📱 UX/UI

### Responsive Design
- Ottimizzato per desktop e mobile (mobile-first)

### Filtri Utente
- Filtro per anno, paese, settore industriale

### Esclusioni
- Nessuna autenticazione
- Nessuna esportazione dei dati o grafici
- Nessuna ricerca testuale o gestione utenti

## 🏗️ Architettura Tecnica

| Componente    | Tecnologia                       |
|---------------|----------------------------------|
| Frontend      | **Next.js 14**, React 18         |
| Styling       | Tailwind CSS                     |
| Grafici       | Chart.js, React-Chartjs-2        |
| Dati API      | World Bank, UN Comtrade, fonti ufficiali |
| Backend       | Nessuno, tutto client-side       |
| Database      | **Non previsto**, possibile utilizzo file JSON/localStorage |
| Deploy        | Vercel (gratuito)                |

## 🧪 Requisiti Tecnici Futuri

- ✅ **CI/CD Pipeline**: da implementare (GitHub Actions consigliato)
- ✅ **Monitoring & Logging**: da prevedere (es. Sentry per errori client-side)
- ❌ **Gestione utenti e ACL**: **espressamente esclusa**

## 📆 Roadmap Iniziale

| Fase       | Task principali                                       | Deadline stimata |
|------------|--------------------------------------------------------|------------------|
| Design     | Wireframe UI/UX multilingua, responsive                | +3 giorni        |
| Setup      | Ambiente Next.js, setup API e grafici                  | +5 giorni        |
| Implement. | Panoramica, filtri, refresh, gestione errori API       | +7 giorni        |
| Refine     | Aggiunta supporto lingue, clock aggiornamento, mobile | +3 giorni        |
| Deploy     | Su Vercel + test live                                  | +2 giorni        |

## 📌 Considerazioni Finali

- **Lite-first**: no DB, no backend, tutto client-driven
- **Priorità assoluta**: **dati affidabili, aggiornati e leggibili**
- **Scalabilità futura**: può crescere facilmente verso backend/serverless se necessario
