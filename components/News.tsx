'use client'

import React, { useState, useEffect } from 'react'
import { Newspaper, RefreshCw, ExternalLink } from 'lucide-react'
import { getEconomicNews, NewsItem } from '../lib/api'

export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    fetchNews()
  }, [])

  useEffect(() => {
    filterNews()
  }, [newsData, selectedCountry, selectedCategory, keyword])

  const fetchNews = async () => {
    setLoading(true)
    try {
      const news = await getEconomicNews()
      setNewsData(news)
      setLastUpdate(new Date().toLocaleString('it-IT'))
    } catch (error) {
      console.error('Errore nel caricamento notizie:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterNews = () => {
    const filtered = newsData.filter(n =>
      (!selectedCountry || n.country === selectedCountry) &&
      (!selectedCategory || n.category === selectedCategory) &&
      (!keyword || n.title.toLowerCase().includes(keyword.toLowerCase()))
    )
    setFilteredNews(filtered)
  }

  const handleNewsClick = (news: NewsItem) => {
    // Apre l'URL della notizia in una nuova tab
    if (news.url && news.url !== '#') {
      window.open(news.url, '_blank', 'noopener,noreferrer')
    }
  }

  const countries = Array.from(new Set(newsData.map(n => n.country)))
  const categories = Array.from(new Set(newsData.map(n => n.category)))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Caricamento notizie economiche...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Notizie Economiche</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={fetchNews}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Aggiorna
          </button>
          <div className="text-sm text-gray-500 hidden sm:block">
            Ultimo aggiornamento: {lastUpdate}
          </div>
        </div>
        <div className="text-xs text-gray-500 sm:hidden w-full text-right">Ultimo aggiornamento: {lastUpdate}</div>
      </div>

      {/* Filtri */}
      <div className="card flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Paese</label>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Tutti</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Tutte</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Parola chiave</label>
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Cerca..."
          />
        </div>
      </div>

      {/* Lista notizie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredNews.length === 0 && (
          <div className="col-span-2 text-center text-gray-500">
            {newsData.length === 0 ? 'Nessuna notizia disponibile.' : 'Nessuna notizia trovata con i filtri selezionati.'}
          </div>
        )}
        {filteredNews.map((news, idx) => (
          <div
            key={idx}
            className="card flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleNewsClick(news)}
          >
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">{news.title}</span>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>{news.country}</span>
              <span>{news.category}</span>
              <span>{news.date}</span>
            </div>
            <div className="text-xs text-gray-400">
              Fonte: {news.source}
            </div>
            <div className="text-xs text-blue-600 font-medium">
              Clicca per leggere la notizia completa →
            </div>
          </div>
        ))}
      </div>

      {/* Statistiche */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiche Notizie</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{newsData.length}</div>
            <div className="text-sm text-gray-600">Notizie totali</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{countries.length}</div>
            <div className="text-sm text-gray-600">Paesi coperti</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-gray-600">Categorie</div>
          </div>
        </div>
      </div>
    </div>
  )
} 