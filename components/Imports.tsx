'use client'

import React, { useState } from 'react'
import { ShoppingCart, BarChart3, PieChart, TrendingUp } from 'lucide-react'

// Dati simulati per le importazioni
const importsData = {
  'Stati Uniti': [
    { name: 'Elettronica', value: 22.3, color: '#3B82F6' },
    { name: 'Automotive', value: 18.7, color: '#10B981' },
    { name: 'Tessile', value: 15.2, color: '#F59E0B' },
    { name: 'Mobili', value: 12.8, color: '#EF4444' },
    { name: 'Giocattoli', value: 10.4, color: '#8B5CF6' },
    { name: 'Macchinari', value: 8.9, color: '#06B6D4' },
    { name: 'Farmaceutica', value: 6.2, color: '#84CC16' },
    { name: 'Acciaio', value: 3.8, color: '#F97316' },
    { name: 'Agricoltura', value: 1.5, color: '#EC4899' },
    { name: 'Altri', value: 0.2, color: '#6B7280' },
  ],
  'Cina': [
    { name: 'Petrolio', value: 28.5, color: '#3B82F6' },
    { name: 'Materie Prime', value: 20.3, color: '#10B981' },
    { name: 'Macchinari', value: 16.7, color: '#F59E0B' },
    { name: 'Tecnologia', value: 14.2, color: '#EF4444' },
    { name: 'Automotive', value: 9.8, color: '#8B5CF6' },
    { name: 'Farmaceutica', value: 5.4, color: '#06B6D4' },
    { name: 'Agricoltura', value: 3.1, color: '#84CC16' },
    { name: 'Servizi', value: 1.5, color: '#F97316' },
    { name: 'Lusso', value: 0.4, color: '#EC4899' },
    { name: 'Altri', value: 0.1, color: '#6B7280' },
  ],
  'Germania': [
    { name: 'Energia', value: 25.8, color: '#3B82F6' },
    { name: 'Materie Prime', value: 19.4, color: '#10B981' },
    { name: 'Elettronica', value: 16.2, color: '#F59E0B' },
    { name: 'Automotive', value: 12.7, color: '#EF4444' },
    { name: 'Tecnologia', value: 10.3, color: '#8B5CF6' },
    { name: 'Farmaceutica', value: 7.8, color: '#06B6D4' },
    { name: 'Agricoltura', value: 4.1, color: '#84CC16' },
    { name: 'Tessile', value: 2.7, color: '#F97316' },
    { name: 'Servizi', value: 1.0, color: '#EC4899' },
    { name: 'Altri', value: 0.0, color: '#6B7280' },
  ],
}

const countries = Object.keys(importsData)
const chartTypes = ['bar', 'pie', 'area']

export default function Imports() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [chartType, setChartType] = useState('bar')

  const currentData = importsData[selectedCountry as keyof typeof importsData]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Import</h1>
        <div className="text-sm text-gray-500">
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
        </div>
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
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Top 10 Categorie di Import - {selectedCountry}
        </h2>
        
        {chartType === 'bar' && (
          <div className="space-y-3">
            {currentData.map((importItem) => (
              <div key={importItem.name} className="flex items-center">
                <div className="w-48 text-sm font-medium text-gray-700">
                  {importItem.name}
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ 
                        width: `${importItem.value * 2}%`,
                        backgroundColor: importItem.color 
                      }}
                    >
                      <span className="text-white text-xs font-medium">
                        {importItem.value}%
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
                  {currentData.map((importItem, index) => {
                    const previousValues = currentData
                      .slice(0, index)
                      .reduce((sum, item) => sum + item.value, 0)
                    const startAngle = (previousValues / 100) * 360
                    const endAngle = ((previousValues + importItem.value) / 100) * 360
                    
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                    
                    const largeArcFlag = importItem.value > 50 ? 1 : 0
                    
                    return (
                      <path
                        key={importItem.name}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={importItem.color}
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    )
                  })}
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              {currentData.map((importItem) => (
                <div key={importItem.name} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: importItem.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {importItem.name}
                  </span>
                  <span className="ml-auto text-sm text-gray-600">
                    {importItem.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {chartType === 'area' && (
          <div className="space-y-4">
            {currentData.map((importItem) => (
              <div key={importItem.name} className="flex items-center">
                <div className="w-48 text-sm font-medium text-gray-700">
                  {importItem.name}
                </div>
                <div className="flex-1 mx-4">
                  <div className="relative">
                    <div
                      className="h-8 rounded-lg"
                      style={{ 
                        width: `${importItem.value * 2}%`,
                        backgroundColor: importItem.color,
                        opacity: 0.8
                      }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{ 
                        width: `${importItem.value * 2}%`,
                        background: `linear-gradient(45deg, ${importItem.color}40, ${importItem.color})`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">
                  {importItem.value}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistiche aggiuntive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Settore Import Dominante</h3>
          <div className="flex items-center">
            <ShoppingCart className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">{currentData[0].name}</p>
              <p className="text-sm text-gray-600">{currentData[0].value}% delle importazioni</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Diversificazione Import</h3>
          <div className="text-2xl font-bold text-green-600">
            {currentData.length}
          </div>
          <p className="text-sm text-gray-600">categorie principali</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Top 3 Import</h3>
          <div className="space-y-1">
            {currentData.slice(0, 3).map((importItem) => (
              <div key={importItem.name} className="flex justify-between text-sm">
                <span className="text-gray-700">{importItem.name}</span>
                <span className="font-medium">{importItem.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 