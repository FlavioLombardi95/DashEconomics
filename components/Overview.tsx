'use client'

import React, { useState, useEffect } from 'react'
import { TrendingUp, Users, DollarSign, Globe, RefreshCw } from 'lucide-react'
import { getWorldBankData, countryCodes, CountryData } from '../lib/api'

export default function Overview() {
  const [countriesData, setCountriesData] = useState<CountryData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  const topCountries = ['Stati Uniti', 'Cina', 'Giappone', 'Germania', 'India', 'Regno Unito', 'Francia', 'Italia', 'Canada', 'Brasile']

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const dataPromises = topCountries.map(async (country) => {
        const code = countryCodes[country]
        if (code) {
          const data = await getWorldBankData(code)
          return {
            country,
            gdp: data.gdp || 0,
            population: data.population || 0,
            gdpPerCapita: data.gdpPerCapita || 0,
            lastUpdated: data.lastUpdated || 'N/A',
            source: data.source || 'World Bank'
          }
        }
        return null
      })

      const results = await Promise.all(dataPromises)
      const validResults = results.filter(Boolean) as CountryData[]
      setCountriesData(validResults)
      setLastUpdate(new Date().toLocaleString('it-IT'))
    } catch (error) {
      console.error('Errore nel caricamento dati:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalGDP = countriesData.reduce((sum, country) => sum + country.gdp, 0)
  const totalPopulation = countriesData.reduce((sum, country) => sum + country.population, 0)
  const averageGDPPerCapita = totalPopulation > 0 ? totalGDP / totalPopulation : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Caricamento dati in tempo reale...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Panoramica Globale</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Aggiorna
          </button>
          <div className="text-sm text-gray-500">
            Ultimo aggiornamento: {lastUpdate}
          </div>
        </div>
      </div>

      {/* Statistiche principali */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Paesi Analizzati</p>
              <p className="text-2xl font-bold text-gray-900">{countriesData.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">PIL Totale</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(totalGDP / 1000000000000).toFixed(1)}T
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Popolazione Totale</p>
              <p className="text-2xl font-bold text-gray-900">
                {(totalPopulation / 1000000000).toFixed(1)}B
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">PIL Medio Pro Capite</p>
              <p className="text-2xl font-bold text-gray-900">
                ${averageGDPPerCapita.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Economie */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Economie per PIL</h2>
        <div className="space-y-4">
          {countriesData
            .sort((a, b) => b.gdp - a.gdp)
            .slice(0, 5)
            .map((country, index) => (
              <div key={country.country} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{country.country}</h3>
                    <p className="text-sm text-gray-600">
                      Popolazione: {(country.population / 1000000).toFixed(0)}M
                    </p>
                    <p className="text-xs text-gray-500">
                      Fonte: {country.source} | Aggiornato: {country.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${(country.gdp / 1000000000000).toFixed(1)}T
                  </p>
                  <p className="text-sm text-gray-600">
                    ${country.gdpPerCapita.toLocaleString()}/capite
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Grafico PIL */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Distribuzione PIL - Top 10</h2>
        <div className="space-y-3">
          {countriesData
            .sort((a, b) => b.gdp - a.gdp)
            .slice(0, 10)
            .map((country) => {
              const percentage = totalGDP > 0 ? (country.gdp / totalGDP) * 100 : 0
              return (
                <div key={country.country} className="flex items-center">
                  <div className="w-32 text-sm font-medium text-gray-700">
                    {country.country}
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-20 text-sm text-gray-600 text-right">
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
} 