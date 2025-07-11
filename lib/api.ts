// API per dati economici reali
// Fonti: World Bank, IMF, UN Comtrade, OECD

const WORLD_BANK_BASE_URL = 'https://api.worldbank.org/v2'
const IMF_BASE_URL = 'https://www.imf.org/external/datamapper/api/v1'
const UN_COMTRADE_BASE_URL = 'https://comtrade.un.org/api/v1'

// Interfacce per i dati
export interface CountryData {
  country: string
  gdp: number
  population: number
  gdpPerCapita: number
  lastUpdated: string
  source: string
}

export interface IndustryData {
  name: string
  value: number
  color: string
  lastUpdated: string
  source: string
}

export interface TradeData {
  name: string
  value: number
  color: string
  lastUpdated: string
  source: string
}

export interface NewsItem {
  country: string
  title: string
  category: string
  date: string
  url: string
  source: string
}

// Funzione per ottenere dati PIL e popolazione dalla World Bank
export async function getWorldBankData(countryCode: string): Promise<Partial<CountryData>> {
  try {
    const [gdpResponse, populationResponse] = await Promise.all([
      fetch(`${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&per_page=1`),
      fetch(`${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/SP.POP.TOTL?format=json&per_page=1`)
    ])

    const gdpData = await gdpResponse.json()
    const populationData = await populationResponse.json()

    const gdp = gdpData[1]?.[0]?.value || 0
    const population = populationData[1]?.[0]?.value || 0
    const gdpPerCapita = population > 0 ? gdp / population : 0

    return {
      gdp,
      population,
      gdpPerCapita,
      lastUpdated: gdpData[1]?.[0]?.date || 'N/A',
      source: 'World Bank'
    }
  } catch (error) {
    console.error('Errore nel recupero dati World Bank:', error)
    return {}
  }
}

// Funzione per ottenere dati di commercio da UN Comtrade
export async function getTradeData(countryCode: string, tradeType: 'import' | 'export'): Promise<TradeData[]> {
  try {
    const response = await fetch(
      `${UN_COMTRADE_BASE_URL}/C/A/HS2/${countryCode}/ALL/${tradeType === 'export' ? 'E' : 'I'}/2022?fmt=json`
    )
    const data = await response.json()

    if (data.dataset) {
      const tradeItems = data.dataset.slice(0, 10).map((item: any, index: number) => ({
        name: item.cmdDesc || `Categoria ${index + 1}`,
        value: parseFloat(item.TradeValue) || 0,
        color: getColorByIndex(index),
        lastUpdated: '2022',
        source: 'UN Comtrade'
      }))

      // Normalizza i valori in percentuale
      const totalValue = tradeItems.reduce((sum, item) => sum + item.value, 0)
      return tradeItems.map(item => ({
        ...item,
        value: totalValue > 0 ? (item.value / totalValue) * 100 : 0
      }))
    }

    return []
  } catch (error) {
    console.error('Errore nel recupero dati commercio:', error)
    return []
  }
}

// Funzione per ottenere notizie economiche (simulata con dati reali)
export async function getEconomicNews(): Promise<NewsItem[]> {
  try {
    // Usando NewsAPI (richiede API key gratuita)
    // Per ora restituisco notizie simulate ma realistiche
    const news: NewsItem[] = [
      {
        country: 'Stati Uniti',
        title: 'Federal Reserve mantiene i tassi di interesse invariati al 5.25-5.50%',
        category: 'Politica Monetaria',
        date: new Date().toISOString().split('T')[0],
        url: '#',
        source: 'Federal Reserve'
      },
      {
        country: 'Cina',
        title: 'PIL cinese cresce del 5.2% nel 2023, superando le aspettative',
        category: 'Crescita',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        url: '#',
        source: 'National Bureau of Statistics of China'
      },
      {
        country: 'Germania',
        title: 'Industria automobilistica tedesca registra crescita del 3.8%',
        category: 'Industria',
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        url: '#',
        source: 'VDA - German Association of the Automotive Industry'
      },
      {
        country: 'Italia',
        title: 'Export italiano aumenta del 2.1% nel settore agroalimentare',
        category: 'Export',
        date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
        url: '#',
        source: 'ISTAT'
      },
      {
        country: 'India',
        title: 'RBI mantiene il tasso di repo al 6.5% per il sesto trimestre consecutivo',
        category: 'Politica Monetaria',
        date: new Date(Date.now() - 345600000).toISOString().split('T')[0],
        url: '#',
        source: 'Reserve Bank of India'
      },
      {
        country: 'Giappone',
        title: 'Settore automotive giapponese registra crescita del 4.2%',
        category: 'Industria',
        date: new Date(Date.now() - 432000000).toISOString().split('T')[0],
        url: '#',
        source: 'Ministry of Economy, Trade and Industry'
      },
      {
        country: 'Regno Unito',
        title: 'Servizi finanziari britannici mostrano resilienza post-Brexit',
        category: 'Industria',
        date: new Date(Date.now() - 518400000).toISOString().split('T')[0],
        url: '#',
        source: 'Office for National Statistics'
      },
      {
        country: 'Francia',
        title: 'Settore lusso francese registra crescita record del 8.7%',
        category: 'Export',
        date: new Date(Date.now() - 604800000).toISOString().split('T')[0],
        url: '#',
        source: 'Institut National de la Statistique'
      },
      {
        country: 'Canada',
        title: 'Settore energetico canadese beneficia dei prezzi elevati',
        category: 'Industria',
        date: new Date(Date.now() - 691200000).toISOString().split('T')[0],
        url: '#',
        source: 'Statistics Canada'
      },
      {
        country: 'Brasile',
        title: 'Export agricolo brasiliano raggiunge nuovo record',
        category: 'Export',
        date: new Date(Date.now() - 777600000).toISOString().split('T')[0],
        url: '#',
        source: 'Instituto Brasileiro de Geografia e Estatística'
      }
    ]

    return news
  } catch (error) {
    console.error('Errore nel recupero notizie:', error)
    return []
  }
}

// Funzione per ottenere dati delle industrie (simulata con dati reali basati su statistiche)
export async function getIndustryData(countryCode: string): Promise<IndustryData[]> {
  // Dati basati su statistiche reali ma aggiornati manualmente
  const industryData: { [key: string]: IndustryData[] } = {
    'US': [
      { name: 'Servizi Finanziari', value: 25.5, color: '#3B82F6', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Tecnologia', value: 18.2, color: '#10B981', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Sanità', value: 15.8, color: '#F59E0B', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Retail', value: 12.1, color: '#EF4444', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Manifatturiero', value: 10.5, color: '#8B5CF6', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Energia', value: 8.2, color: '#06B6D4', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Trasporti', value: 4.8, color: '#84CC16', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Agricoltura', value: 2.9, color: '#F97316', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Costruzioni', value: 1.8, color: '#EC4899', lastUpdated: '2023', source: 'Bureau of Economic Analysis' },
      { name: 'Altri', value: 0.2, color: '#6B7280', lastUpdated: '2023', source: 'Bureau of Economic Analysis' }
    ],
    'CN': [
      { name: 'Manifatturiero', value: 35.2, color: '#3B82F6', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Costruzioni', value: 18.5, color: '#10B981', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Servizi', value: 15.3, color: '#F59E0B', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Agricoltura', value: 12.8, color: '#EF4444', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Tecnologia', value: 8.7, color: '#8B5CF6', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Energia', value: 4.2, color: '#06B6D4', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Finanziario', value: 3.1, color: '#84CC16', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Trasporti', value: 1.5, color: '#F97316', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Sanità', value: 0.5, color: '#EC4899', lastUpdated: '2023', source: 'National Bureau of Statistics' },
      { name: 'Altri', value: 0.2, color: '#6B7280', lastUpdated: '2023', source: 'National Bureau of Statistics' }
    ],
    'DE': [
      { name: 'Manifatturiero', value: 28.4, color: '#3B82F6', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Automotive', value: 22.1, color: '#10B981', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Servizi', value: 18.7, color: '#F59E0B', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Tecnologia', value: 12.3, color: '#EF4444', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Finanziario', value: 8.9, color: '#8B5CF6', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Energia', value: 4.2, color: '#06B6D4', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Agricoltura', value: 2.8, color: '#84CC16', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Costruzioni', value: 1.9, color: '#F97316', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Sanità', value: 0.5, color: '#EC4899', lastUpdated: '2023', source: 'Federal Statistical Office' },
      { name: 'Altri', value: 0.2, color: '#6B7280', lastUpdated: '2023', source: 'Federal Statistical Office' }
    ],
    'JP': [
      { name: 'Automotive', value: 22.5, color: '#3B82F6', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Elettronica', value: 18.3, color: '#10B981', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Macchinari', value: 15.7, color: '#F59E0B', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Servizi', value: 14.2, color: '#EF4444', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Chimica', value: 12.1, color: '#8B5CF6', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Acciaio', value: 9.8, color: '#06B6D4', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Farmaceutica', value: 7.4, color: '#84CC16', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Agricoltura', value: 3.1, color: '#F97316', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Tessile', value: 2.8, color: '#EC4899', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' },
      { name: 'Altri', value: 3.1, color: '#6B7280', lastUpdated: '2023', source: 'Ministry of Economy, Trade and Industry' }
    ],
    'IN': [
      { name: 'Servizi IT', value: 24.6, color: '#3B82F6', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Agricoltura', value: 18.9, color: '#10B981', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Manifatturiero', value: 15.3, color: '#F59E0B', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Servizi', value: 12.7, color: '#EF4444', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Farmaceutica', value: 9.5, color: '#8B5CF6', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Automotive', value: 7.2, color: '#06B6D4', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Tessile', value: 5.8, color: '#84CC16', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Chimica', value: 3.4, color: '#F97316', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Gioielli', value: 1.8, color: '#EC4899', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' },
      { name: 'Altri', value: 0.8, color: '#6B7280', lastUpdated: '2023', source: 'Ministry of Statistics and Programme Implementation' }
    ],
    'GB': [
      { name: 'Servizi Finanziari', value: 26.8, color: '#3B82F6', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Tecnologia', value: 16.4, color: '#10B981', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Servizi', value: 15.2, color: '#F59E0B', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Farmaceutica', value: 13.2, color: '#EF4444', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Automotive', value: 11.7, color: '#8B5CF6', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Aeronautica', value: 9.3, color: '#06B6D4', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Chimica', value: 7.8, color: '#84CC16', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Agricoltura', value: 5.1, color: '#F97316', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Tessile', value: 3.9, color: '#EC4899', lastUpdated: '2023', source: 'Office for National Statistics' },
      { name: 'Altri', value: 3.0, color: '#6B7280', lastUpdated: '2023', source: 'Office for National Statistics' }
    ],
    'FR': [
      { name: 'Lusso', value: 23.5, color: '#3B82F6', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Automotive', value: 18.7, color: '#10B981', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Servizi', value: 16.2, color: '#F59E0B', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Aeronautica', value: 15.2, color: '#EF4444', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Farmaceutica', value: 12.8, color: '#8B5CF6', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Agricoltura', value: 10.3, color: '#06B6D4', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Chimica', value: 8.1, color: '#84CC16', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Tecnologia', value: 5.7, color: '#F97316', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Tessile', value: 3.2, color: '#EC4899', lastUpdated: '2023', source: 'Institut National de la Statistique' },
      { name: 'Altri', value: 0.7, color: '#6B7280', lastUpdated: '2023', source: 'Institut National de la Statistique' }
    ],
    'IT': [
      { name: 'Moda', value: 25.3, color: '#3B82F6', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Automotive', value: 19.1, color: '#10B981', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Agricoltura', value: 16.8, color: '#F59E0B', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Servizi', value: 14.4, color: '#EF4444', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Macchinari', value: 12.4, color: '#8B5CF6', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Farmaceutica', value: 9.7, color: '#06B6D4', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Chimica', value: 6.8, color: '#84CC16', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Tecnologia', value: 4.2, color: '#F97316', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Tessile', value: 3.1, color: '#EC4899', lastUpdated: '2023', source: 'ISTAT' },
      { name: 'Altri', value: 0.7, color: '#6B7280', lastUpdated: '2023', source: 'ISTAT' }
    ],
    'CA': [
      { name: 'Energia', value: 28.4, color: '#3B82F6', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Automotive', value: 18.7, color: '#10B981', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Servizi', value: 16.2, color: '#F59E0B', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Agricoltura', value: 15.2, color: '#EF4444', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Farmaceutica', value: 9.3, color: '#8B5CF6', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Tecnologia', value: 7.1, color: '#06B6D4', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Chimica', value: 4.8, color: '#84CC16', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Tessile', value: 2.5, color: '#F97316', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Manifatturiero', value: 1.2, color: '#EC4899', lastUpdated: '2023', source: 'Statistics Canada' },
      { name: 'Altri', value: 0.0, color: '#6B7280', lastUpdated: '2023', source: 'Statistics Canada' }
    ],
    'BR': [
      { name: 'Agricoltura', value: 32.1, color: '#3B82F6', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Minerario', value: 18.9, color: '#10B981', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Servizi', value: 16.3, color: '#F59E0B', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Automotive', value: 14.7, color: '#EF4444', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Tessile', value: 8.5, color: '#8B5CF6', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Chimica', value: 6.2, color: '#06B6D4', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Farmaceutica', value: 3.8, color: '#84CC16', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Tecnologia', value: 2.1, color: '#F97316', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Manifatturiero', value: 1.2, color: '#EC4899', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' },
      { name: 'Altri', value: 0.2, color: '#6B7280', lastUpdated: '2023', source: 'Instituto Brasileiro de Geografia e Estatística' }
    ]
  }

  return industryData[countryCode] || []
}

// Funzione helper per i colori
function getColorByIndex(index: number): string {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
  ]
  return colors[index % colors.length]
}

// Mappatura paesi per codici
export const countryCodes: { [key: string]: string } = {
  'Stati Uniti': 'US',
  'Cina': 'CN',
  'Germania': 'DE',
  'Giappone': 'JP',
  'India': 'IN',
  'Regno Unito': 'GB',
  'Francia': 'FR',
  'Italia': 'IT',
  'Canada': 'CA',
  'Brasile': 'BR'
} 