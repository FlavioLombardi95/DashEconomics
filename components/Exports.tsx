'use client'

import React, { useState } from 'react'
import { Ship, BarChart3, PieChart, TrendingUp } from 'lucide-react'

// Dati simulati per le esportazioni
const exportsData = {
  'Stati Uniti': [
    { name: 'Servizi Finanziari', value: 18.5, color: '#3B82F6' },
    { name: 'Tecnologia', value: 15.2, color: '#10B981' },
    { name: 'Aeronautica', value: 12.8, color: '#F59E0B' },
    { name: 'Agricoltura', value: 11.3, color: '#EF4444' },
    { name: 'Armamenti', value: 9.7, color: '#8B5CF6' },
    { name: 'Entertainment', value: 8.4, color: '#06B6D4' },
    { name: 'Farmaceutica', value: 7.2, color: '#84CC16' },
    { name: 'Automotive', value: 6.1, color: '#F97316' },
    { name: 'Chimica', value: 4.8, color: '#EC4899' },
    { name: 'Altri', value: 6.0, color: '#6B7280' },
  ],
  'Cina': [
    { name: 'Elettronica', value: 25.3, color: '#3B82F6' },
    { name: 'Tessile', value: 18.7, color: '#10B981' },
    { name: 'Acciaio', value: 12.4, color: '#F59E0B' },
    { name: 'Giocattoli', value: 10.8, color: '#EF4444' },
    { name: 'Mobili', value: 8.9, color: '#8B5CF6' },
    { name: 'Macchinari', value: 7.5, color: '#06B6D4' },
    { name: 'Automotive', value: 6.2, color: '#84CC16' },
    { name: 'Chimica', value: 4.1, color: '#F97316' },
    { name: 'Agricoltura', value: 3.8, color: '#EC4899' },
    { name: 'Altri', value: 2.3, color: '#6B7280' },
  ],
  'Germania': [
    { name: 'Automotive', value: 28.4, color: '#3B82F6' },
    { name: 'Macchinari', value: 22.1, color: '#10B981' },
    { name: 'Chimica', value: 15.7, color: '#F59E0B' },
    { name: 'Elettronica', value: 12.3, color: '#EF4444' },
    { name: 'Farmaceutica', value: 8.9, color: '#8B5CF6' },
    { name: 'Acciaio', value: 5.2, color: '#06B6D4' },
    { name: 'Tessile', value: 3.1, color: '#84CC16' },
    { name: 'Agricoltura', value: 2.4, color: '#F97316' },
    { name: 'Servizi', value: 1.5, color: '#EC4899' },
    { name: 'Altri', value: 0.4, color: '#6B7280' },
  ],
  'Giappone': [
    { name: 'Automotive', value: 22.5, color: '#3B82F6' },
    { name: 'Elettronica', value: 18.3, color: '#10B981' },
    { name: 'Macchinari', value: 15.7, color: '#F59E0B' },
    { name: 'Chimica', value: 12.1, color: '#EF4444' },
    { name: 'Acciaio', value: 9.8, color: '#8B5CF6' },
    { name: 'Farmaceutica', value: 7.4, color: '#06B6D4' },
    { name: 'Tessile', value: 5.2, color: '#84CC16' },
    { name: 'Agricoltura', value: 3.1, color: '#F97316' },
    { name: 'Servizi', value: 2.8, color: '#EC4899' },
    { name: 'Altri', value: 3.1, color: '#6B7280' },
  ],
  'India': [
    { name: 'Servizi IT', value: 24.6, color: '#3B82F6' },
    { name: 'Tessile', value: 18.9, color: '#10B981' },
    { name: 'Agricoltura', value: 15.3, color: '#F59E0B' },
    { name: 'Farmaceutica', value: 12.7, color: '#EF4444' },
    { name: 'Acciaio', value: 9.5, color: '#8B5CF6' },
    { name: 'Automotive', value: 7.2, color: '#06B6D4' },
    { name: 'Chimica', value: 5.8, color: '#84CC16' },
    { name: 'Gioielli', value: 3.4, color: '#F97316' },
    { name: 'Servizi', value: 1.8, color: '#EC4899' },
    { name: 'Altri', value: 0.8, color: '#6B7280' },
  ],
  'Regno Unito': [
    { name: 'Servizi Finanziari', value: 26.8, color: '#3B82F6' },
    { name: 'Tecnologia', value: 16.4, color: '#10B981' },
    { name: 'Farmaceutica', value: 13.2, color: '#F59E0B' },
    { name: 'Automotive', value: 11.7, color: '#EF4444' },
    { name: 'Aeronautica', value: 9.3, color: '#8B5CF6' },
    { name: 'Chimica', value: 7.8, color: '#06B6D4' },
    { name: 'Agricoltura', value: 5.1, color: '#84CC16' },
    { name: 'Tessile', value: 3.9, color: '#F97316' },
    { name: 'Servizi', value: 2.8, color: '#EC4899' },
    { name: 'Altri', value: 3.0, color: '#6B7280' },
  ],
  'Francia': [
    { name: 'Lusso', value: 23.5, color: '#3B82F6' },
    { name: 'Automotive', value: 18.7, color: '#10B981' },
    { name: 'Aeronautica', value: 15.2, color: '#F59E0B' },
    { name: 'Farmaceutica', value: 12.8, color: '#EF4444' },
    { name: 'Agricoltura', value: 10.3, color: '#8B5CF6' },
    { name: 'Chimica', value: 8.1, color: '#06B6D4' },
    { name: 'Tecnologia', value: 5.7, color: '#84CC16' },
    { name: 'Tessile', value: 3.2, color: '#F97316' },
    { name: 'Servizi', value: 1.8, color: '#EC4899' },
    { name: 'Altri', value: 0.7, color: '#6B7280' },
  ],
  'Italia': [
    { name: 'Moda', value: 25.3, color: '#3B82F6' },
    { name: 'Automotive', value: 19.1, color: '#10B981' },
    { name: 'Agricoltura', value: 16.8, color: '#F59E0B' },
    { name: 'Macchinari', value: 12.4, color: '#EF4444' },
    { name: 'Farmaceutica', value: 9.7, color: '#8B5CF6' },
    { name: 'Chimica', value: 6.8, color: '#06B6D4' },
    { name: 'Tecnologia', value: 4.2, color: '#84CC16' },
    { name: 'Tessile', value: 3.1, color: '#F97316' },
    { name: 'Servizi', value: 1.9, color: '#EC4899' },
    { name: 'Altri', value: 0.7, color: '#6B7280' },
  ],
  'Canada': [
    { name: 'Energia', value: 28.4, color: '#3B82F6' },
    { name: 'Automotive', value: 18.7, color: '#10B981' },
    { name: 'Agricoltura', value: 15.2, color: '#F59E0B' },
    { name: 'Servizi', value: 12.8, color: '#EF4444' },
    { name: 'Farmaceutica', value: 9.3, color: '#8B5CF6' },
    { name: 'Tecnologia', value: 7.1, color: '#06B6D4' },
    { name: 'Chimica', value: 4.8, color: '#84CC16' },
    { name: 'Tessile', value: 2.5, color: '#F97316' },
    { name: 'Manifatturiero', value: 1.2, color: '#EC4899' },
    { name: 'Altri', value: 0.0, color: '#6B7280' },
  ],
  'Brasile': [
    { name: 'Agricoltura', value: 32.1, color: '#3B82F6' },
    { name: 'Minerario', value: 18.9, color: '#10B981' },
    { name: 'Automotive', value: 14.7, color: '#F59E0B' },
    { name: 'Servizi', value: 12.3, color: '#EF4444' },
    { name: 'Tessile', value: 8.5, color: '#8B5CF6' },
    { name: 'Chimica', value: 6.2, color: '#06B6D4' },
    { name: 'Farmaceutica', value: 3.8, color: '#84CC16' },
    { name: 'Tecnologia', value: 2.1, color: '#F97316' },
    { name: 'Manifatturiero', value: 1.2, color: '#EC4899' },
    { name: 'Altri', value: 0.2, color: '#6B7280' },
  ],
}

const countries = Object.keys(exportsData)
const chartTypes = ['bar', 'pie', 'area']

export default function Exports() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [chartType, setChartType] = useState('bar')

  const currentData = exportsData[selectedCountry as keyof typeof exportsData]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Export</h1>
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
          Top 10 Categorie di Export - {selectedCountry}
        </h2>
        
        {chartType === 'bar' && (
          <div className="space-y-3">
            {currentData.map((exportItem) => (
              <div key={exportItem.name} className="flex items-center">
                <div className="w-48 text-sm font-medium text-gray-700">
                  {exportItem.name}
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ 
                        width: `${exportItem.value * 2}%`,
                        backgroundColor: exportItem.color 
                      }}
                    >
                      <span className="text-white text-xs font-medium">
                        {exportItem.value}%
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
                  {currentData.map((exportItem, index) => {
                    const previousValues = currentData
                      .slice(0, index)
                      .reduce((sum, item) => sum + item.value, 0)
                    const startAngle = (previousValues / 100) * 360
                    const endAngle = ((previousValues + exportItem.value) / 100) * 360
                    
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                    
                    const largeArcFlag = exportItem.value > 50 ? 1 : 0
                    
                    return (
                      <path
                        key={exportItem.name}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={exportItem.color}
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    )
                  })}
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              {currentData.map((exportItem) => (
                <div key={exportItem.name} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: exportItem.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {exportItem.name}
                  </span>
                  <span className="ml-auto text-sm text-gray-600">
                    {exportItem.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {chartType === 'area' && (
          <div className="space-y-4">
            {currentData.map((exportItem) => (
              <div key={exportItem.name} className="flex items-center">
                <div className="w-48 text-sm font-medium text-gray-700">
                  {exportItem.name}
                </div>
                <div className="flex-1 mx-4">
                  <div className="relative">
                    <div
                      className="h-8 rounded-lg"
                      style={{ 
                        width: `${exportItem.value * 2}%`,
                        backgroundColor: exportItem.color,
                        opacity: 0.8
                      }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{ 
                        width: `${exportItem.value * 2}%`,
                        background: `linear-gradient(45deg, ${exportItem.color}40, ${exportItem.color})`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">
                  {exportItem.value}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistiche aggiuntive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Settore Export Dominante</h3>
          <div className="flex items-center">
            <Ship className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">{currentData[0].name}</p>
              <p className="text-sm text-gray-600">{currentData[0].value}% delle esportazioni</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Diversificazione Export</h3>
          <div className="text-2xl font-bold text-green-600">
            {currentData.length}
          </div>
          <p className="text-sm text-gray-600">categorie principali</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Top 3 Export</h3>
          <div className="space-y-1">
            {currentData.slice(0, 3).map((exportItem) => (
              <div key={exportItem.name} className="flex justify-between text-sm">
                <span className="text-gray-700">{exportItem.name}</span>
                <span className="font-medium">{exportItem.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 