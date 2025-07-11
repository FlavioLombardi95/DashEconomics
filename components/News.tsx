'use client'

import React, { useState } from 'react'
import { Newspaper } from 'lucide-react'

const newsData = [
  {
    country: 'Stati Uniti',
    title: 'La Fed mantiene i tassi invariati',
    category: 'Politica Monetaria',
    date: '2024-07-10',
    url: '#'
  },
  {
    country: 'Cina',
    title: 'Crescita del PIL superiore alle attese',
    category: 'Crescita',
    date: '2024-07-09',
    url: '#'
  },
  {
    country: 'Germania',
    title: 'Industria automobilistica in ripresa',
    category: 'Industria',
    date: '2024-07-08',
    url: '#'
  },
  {
    country: 'Italia',
    title: 'Aumentano le esportazioni di vino',
    category: 'Export',
    date: '2024-07-07',
    url: '#'
  },
  {
    country: 'India',
    title: 'Nuove riforme fiscali approvate',
    category: 'Fisco',
    date: '2024-07-06',
    url: '#'
  },
]

const countries = Array.from(new Set(newsData.map(n => n.country)))
const categories = Array.from(new Set(newsData.map(n => n.category)))

export default function News() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [keyword, setKeyword] = useState('')

  const filteredNews = newsData.filter(n =>
    (!selectedCountry || n.country === selectedCountry) &&
    (!selectedCategory || n.category === selectedCategory) &&
    (!keyword || n.title.toLowerCase().includes(keyword.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Notizie Economiche</h1>
        <div className="text-sm text-gray-500">
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
        </div>
      </div>

      {/* Filtri */}
      <div className="card flex flex-col md:flex-row gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.length === 0 && (
          <div className="col-span-2 text-center text-gray-500">Nessuna notizia trovata.</div>
        )}
        {filteredNews.map((news, idx) => (
          <a
            key={idx}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex flex-col gap-2 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">{news.title}</span>
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>{news.country}</span>
              <span>{news.category}</span>
              <span>{news.date}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
} 