import React from 'react'

// Sistema di internazionalizzazione per supportare italiano e inglese
// Come richiesto dal PRD: "Supporto inglese e italiano"

export type Language = 'it' | 'en'

export interface Translations {
  // Sidebar
  overview: string
  industries: string
  exports: string
  imports: string
  news: string
  economicDashboard: string
  globalMonitoring: string
  
  // Overview
  globalOverview: string
  refresh: string
  lastUpdate: string
  countriesAnalyzed: string
  totalGDP: string
  totalPopulation: string
  averageGDPPerCapita: string
  top5Economies: string
  population: string
  source: string
  updated: string
  gdpDistribution: string
  perCapita: string
  
  // Industries
  mainIndustries: string
  selectCountry: string
  chartType: string
  bar: string
  pie: string
  area: string
  top10Industries: string
  dominantIndustry: string
  diversification: string
  mainSectors: string
  top3Sectors: string
  
  // Exports/Imports
  export: string
  import: string
  top10ExportCategories: string
  top10ImportCategories: string
  dominantExportSector: string
  dominantImportSector: string
  exportDiversification: string
  importDiversification: string
  mainCategories: string
  top3Exports: string
  top3Imports: string
  ofExports: string
  ofImports: string
  
  // News
  economicNews: string
  country: string
  category: string
  keyword: string
  search: string
  all: string
  allCategories: string
  clickToRead: string
  newsStatistics: string
  totalNews: string
  countriesCovered: string
  categories: string
  noNewsAvailable: string
  noNewsFound: string
  
  // Common
  loading: string
  loadingData: string
  loadingIndustries: string
  loadingNews: string
  error: string
  other: string
}

const translations: Record<Language, Translations> = {
  it: {
    // Sidebar
    overview: 'Panoramica Globale',
    industries: 'Industrie Principali',
    exports: 'Export',
    imports: 'Import',
    news: 'Notizie Economiche',
    economicDashboard: 'Economic Dashboard',
    globalMonitoring: 'Monitoraggio globale',
    
    // Overview
    globalOverview: 'Panoramica Globale',
    refresh: 'Aggiorna',
    lastUpdate: 'Ultimo aggiornamento',
    countriesAnalyzed: 'Paesi Analizzati',
    totalGDP: 'PIL Totale',
    totalPopulation: 'Popolazione Totale',
    averageGDPPerCapita: 'PIL Medio Pro Capite',
    top5Economies: 'Top 5 Economie per PIL',
    population: 'Popolazione',
    source: 'Fonte',
    updated: 'Aggiornato',
    gdpDistribution: 'Distribuzione PIL - Top 10',
    perCapita: '/capite',
    
    // Industries
    mainIndustries: 'Industrie Principali',
    selectCountry: 'Seleziona Paese',
    chartType: 'Tipo di Grafico',
    bar: 'Barre',
    pie: 'Torta',
    area: 'Area',
    top10Industries: 'Top 10 Industrie',
    dominantIndustry: 'Industria Dominante',
    diversification: 'Diversificazione',
    mainSectors: 'settori principali',
    top3Sectors: 'Top 3 Settori',
    
    // Exports/Imports
    export: 'Export',
    import: 'Import',
    top10ExportCategories: 'Top 10 Categorie di Export',
    top10ImportCategories: 'Top 10 Categorie di Import',
    dominantExportSector: 'Settore Export Dominante',
    dominantImportSector: 'Settore Import Dominante',
    exportDiversification: 'Diversificazione Export',
    importDiversification: 'Diversificazione Import',
    mainCategories: 'categorie principali',
    top3Exports: 'Top 3 Export',
    top3Imports: 'Top 3 Import',
    ofExports: 'delle esportazioni',
    ofImports: 'delle importazioni',
    
    // News
    economicNews: 'Notizie Economiche',
    country: 'Paese',
    category: 'Categoria',
    keyword: 'Parola chiave',
    search: 'Cerca',
    all: 'Tutti',
    allCategories: 'Tutte',
    clickToRead: 'Clicca per leggere la notizia completa →',
    newsStatistics: 'Statistiche Notizie',
    totalNews: 'Notizie totali',
    countriesCovered: 'Paesi coperti',
    categories: 'Categorie',
    noNewsAvailable: 'Nessuna notizia disponibile.',
    noNewsFound: 'Nessuna notizia trovata con i filtri selezionati.',
    
    // Common
    loading: 'Caricamento',
    loadingData: 'Caricamento dati in tempo reale...',
    loadingIndustries: 'Caricamento dati industrie...',
    loadingNews: 'Caricamento notizie economiche...',
    error: 'Errore',
    other: 'Altri'
  },
  en: {
    // Sidebar
    overview: 'Global Overview',
    industries: 'Main Industries',
    exports: 'Exports',
    imports: 'Imports',
    news: 'Economic News',
    economicDashboard: 'Economic Dashboard',
    globalMonitoring: 'Global monitoring',
    
    // Overview
    globalOverview: 'Global Overview',
    refresh: 'Refresh',
    lastUpdate: 'Last update',
    countriesAnalyzed: 'Countries Analyzed',
    totalGDP: 'Total GDP',
    totalPopulation: 'Total Population',
    averageGDPPerCapita: 'Average GDP Per Capita',
    top5Economies: 'Top 5 Economies by GDP',
    population: 'Population',
    source: 'Source',
    updated: 'Updated',
    gdpDistribution: 'GDP Distribution - Top 10',
    perCapita: '/capita',
    
    // Industries
    mainIndustries: 'Main Industries',
    selectCountry: 'Select Country',
    chartType: 'Chart Type',
    bar: 'Bar',
    pie: 'Pie',
    area: 'Area',
    top10Industries: 'Top 10 Industries',
    dominantIndustry: 'Dominant Industry',
    diversification: 'Diversification',
    mainSectors: 'main sectors',
    top3Sectors: 'Top 3 Sectors',
    
    // Exports/Imports
    export: 'Exports',
    import: 'Imports',
    top10ExportCategories: 'Top 10 Export Categories',
    top10ImportCategories: 'Top 10 Import Categories',
    dominantExportSector: 'Dominant Export Sector',
    dominantImportSector: 'Dominant Import Sector',
    exportDiversification: 'Export Diversification',
    importDiversification: 'Import Diversification',
    mainCategories: 'main categories',
    top3Exports: 'Top 3 Exports',
    top3Imports: 'Top 3 Imports',
    ofExports: 'of exports',
    ofImports: 'of imports',
    
    // News
    economicNews: 'Economic News',
    country: 'Country',
    category: 'Category',
    keyword: 'Keyword',
    search: 'Search',
    all: 'All',
    allCategories: 'All',
    clickToRead: 'Click to read full news →',
    newsStatistics: 'News Statistics',
    totalNews: 'Total news',
    countriesCovered: 'Countries covered',
    categories: 'Categories',
    noNewsAvailable: 'No news available.',
    noNewsFound: 'No news found with selected filters.',
    
    // Common
    loading: 'Loading',
    loadingData: 'Loading real-time data...',
    loadingIndustries: 'Loading industry data...',
    loadingNews: 'Loading economic news...',
    error: 'Error',
    other: 'Others'
  }
}

// Hook per gestire la lingua corrente
export function useLanguage(): [Language, (lang: Language) => void] {
  const [language, setLanguage] = React.useState<Language>('it')
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('preferred-language', lang)
  }
  
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && (savedLanguage === 'it' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])
  
  return [language, changeLanguage]
}

// Hook per ottenere le traduzioni
export function useTranslations(language: Language): Translations {
  return translations[language]
}

// Funzione per formattare i numeri secondo la lingua
export function formatNumber(value: number, language: Language): string {
  if (language === 'it') {
    return value.toLocaleString('it-IT')
  } else {
    return value.toLocaleString('en-US')
  }
}

// Funzione per formattare le date secondo la lingua
export function formatDate(date: Date, language: Language): string {
  if (language === 'it') {
    return date.toLocaleDateString('it-IT')
  } else {
    return date.toLocaleDateString('en-US')
  }
}

// Funzione per formattare le valute secondo la lingua
export function formatCurrency(value: number, language: Language): string {
  if (language === 'it') {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }
} 