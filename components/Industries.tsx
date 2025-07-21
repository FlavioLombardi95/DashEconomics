'use client'

import React, { useState, useEffect } from 'react'
import { Factory, BarChart3, PieChart, TrendingUp, RefreshCw } from 'lucide-react'
import { getIndustryData, countryCodes, IndustryData } from '../lib/api'

const countries = ['Stati Uniti', 'Cina', 'Germania', 'Giappone', 'India', 'Regno Unito', 'Francia', 'Italia', 'Canada', 'Brasile']
const chartTypes = ['bar', 'pie', 'area']

export default function Industries() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [chartType, setChartType] = useState('bar')
  const [currentData, setCurrentData] = useState<IndustryData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  useEffect(() => {
    fetchIndustryData()
  }, [selectedCountry])

  // Carica i dati iniziali quando il componente si monta
  useEffect(() => {
    if (currentData.length === 0 && !loading) {
      fetchIndustryData()
    }
  }, [])

  const fetchIndustryData = async () => {
    setLoading(true)
    try {
      const code = countryCodes[selectedCountry]
      console.log('Paese selezionato:', selectedCountry, 'Codice:', code)
      
      if (code) {
        const data = await getIndustryData(code)
        console.log('Dati ricevuti:', data)
        
        // Verifica che i dati siano validi
        if (data && data.length > 0) {
          setCurrentData(data)
          setLastUpdate(new Date().toLocaleString('it-IT'))
        } else {
          console.warn('Nessun dato ricevuto per:', selectedCountry)
          setCurrentData([])
        }
      } else {
        console.error('Codice paese non trovato per:', selectedCountry)
        setCurrentData([])
      }
    } catch (error) {
      console.error('Errore nel caricamento dati industrie:', error)
      setCurrentData([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Caricamento dati industrie...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Industrie Principali</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={fetchIndustryData}
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

      {/* Controlli */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleziona Paese
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo di Grafico
            </label>
            <div className="flex gap-2">
              {chartTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    chartType === type
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'bar' && <BarChart3 className="w-4 h-4 mr-1" />}
                  {type === 'pie' && <PieChart className="w-4 h-4 mr-1" />}
                  {type === 'area' && <TrendingUp className="w-4 h-4 mr-1" />}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grafico */}
      <div className="card overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Top 10 Industrie - {selectedCountry}
        </h2>
        
        {currentData.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            Fonte: {currentData[0]?.source} | Ultimo aggiornamento: {currentData[0]?.lastUpdated}
          </div>
        )}
        
        {currentData.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">Nessun dato disponibile per {selectedCountry}</p>
            <p className="text-sm text-gray-400">Prova a selezionare un altro paese o aggiorna i dati</p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-sm text-gray-600">Debug info:</p>
              <p className="text-xs text-gray-500">Paese selezionato: {selectedCountry}</p>
              <p className="text-xs text-gray-500">Codice paese: {countryCodes[selectedCountry] || 'Non trovato'}</p>
              <p className="text-xs text-gray-500">Dati caricati: {currentData.length}</p>
              <p className="text-xs text-gray-500">Stato loading: {loading ? 'Caricamento...' : 'Completato'}</p>
            </div>
            <button
              onClick={fetchIndustryData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Riprova
            </button>
          </div>
        )}
        
        {chartType === 'bar' && (
          <div className="space-y-3">
            {currentData.map((industry) => (
              <div key={industry.name} className="flex items-center">
                <div className="w-48 text-sm font-medium text-gray-700">
                  {industry.name}
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-6 relative">
                    <div
                      className="h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ 
                        width: `${Math.min(industry.value * 2, 100)}%`,
                        backgroundColor: industry.color 
                      }}
                    >
                      <span className="text-white text-xs font-medium">
                        {industry.value.toFixed(1)}%
                      </span>
                    </div>
                    {/* Percentuale sempre visibile a destra */}
                    <div className="absolute right-0 top-0 h-6 flex items-center pr-2">
                      <span className="text-gray-700 text-xs font-medium">
                        {industry.value.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {chartType === 'pie' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {currentData.map((industry, index) => {
                    const previousValues = currentData
                      .slice(0, index)
                      .reduce((sum, item) => sum + item.value, 0)
                    const startAngle = (previousValues / 100) * 360
                    const endAngle = ((previousValues + industry.value) / 100) * 360
                    
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                    
                    const largeArcFlag = industry.value > 50 ? 1 : 0
                    
                    return (
                      <path
                        key={industry.name}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={industry.color}
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    )
                  })}
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              {currentData.map((industry) => (
                <div key={industry.name} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: industry.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {industry.name}
                  </span>
                  <span className="ml-auto text-sm text-gray-600">
                    {industry.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {chartType === 'area' && (
          <div className="space-y-4">
            {currentData.map((industry) => (
              <div key={industry.name} className="flex items-center">
                <div className="w-48 text-sm font-medium text-gray-700">
                  {industry.name}
                </div>
                <div className="flex-1 mx-4">
                  <div className="relative">
                    <div
                      className="h-8 rounded-lg"
                      style={{ 
                        width: `${industry.value * 2}%`,
                        backgroundColor: industry.color,
                        opacity: 0.8
                      }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{ 
                        width: `${industry.value * 2}%`,
                        background: `linear-gradient(45deg, ${industry.color}40, ${industry.color})`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">
                  {industry.value}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistiche aggiuntive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Industria Dominante</h3>
          <div className="flex items-center">
            <Factory className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">{currentData[0]?.name || 'N/A'}</p>
              <p className="text-sm text-gray-600">{currentData[0]?.value || 0}% del PIL</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Diversificazione</h3>
          <div className="text-2xl font-bold text-green-600">
            {currentData.length}
          </div>
          <p className="text-sm text-gray-600">settori principali</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Top 3 Settori</h3>
          <div className="space-y-1">
            {currentData.slice(0, 3).map((industry) => (
              <div key={industry.name} className="flex justify-between text-sm">
                <span className="text-gray-700">{industry.name}</span>
                <span className="font-medium">{industry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 