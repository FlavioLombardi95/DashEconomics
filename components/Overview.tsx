'use client'

import React from 'react'
import { TrendingUp, Users, DollarSign, Globe } from 'lucide-react'

// Dati simulati per le top 20 economie
const topEconomies = [
  { country: 'Stati Uniti', gdp: 25462700, population: 339996563, gdpPerCapita: 74873 },
  { country: 'Cina', gdp: 17963170, population: 1425671352, gdpPerCapita: 12608 },
  { country: 'Giappone', gdp: 4231141, population: 123294513, gdpPerCapita: 34322 },
  { country: 'Germania', gdp: 4072191, population: 83294633, gdpPerCapita: 48818 },
  { country: 'India', gdp: 3385089, population: 1428627663, gdpPerCapita: 2368 },
  { country: 'Regno Unito', gdp: 3070667, population: 67736802, gdpPerCapita: 45350 },
  { country: 'Francia', gdp: 2782905, population: 64756584, gdpPerCapita: 42907 },
  { country: 'Italia', gdp: 2010430, population: 58870762, gdpPerCapita: 34164 },
  { country: 'Canada', gdp: 2139840, population: 38250000, gdpPerCapita: 55928 },
  { country: 'Brasile', gdp: 1920095, population: 214300000, gdpPerCapita: 8961 },
]

const totalGDP = topEconomies.reduce((sum, country) => sum + country.gdp, 0)
const totalPopulation = topEconomies.reduce((sum, country) => sum + country.population, 0)
const averageGDPPerCapita = totalGDP / totalPopulation

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Panoramica Globale</h1>
        <div className="text-sm text-gray-500">
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
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
              <p className="text-2xl font-bold text-gray-900">{topEconomies.length}</p>
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
                ${(totalGDP / 1000000).toFixed(0)}T
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
                ${averageGDPPerCapita.toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Economie */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Economie per PIL</h2>
        <div className="space-y-4">
          {topEconomies.slice(0, 5).map((country, index) => (
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
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${(country.gdp / 1000000).toFixed(0)}T
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
          {topEconomies.slice(0, 10).map((country) => {
            const percentage = (country.gdp / totalGDP) * 100
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