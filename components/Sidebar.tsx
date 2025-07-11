'use client'

import React, { useState } from 'react'
import { 
  BarChart3, 
  Factory, 
  Ship, 
  ShoppingCart, 
  Newspaper,
  Globe
} from 'lucide-react'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  { id: 'overview', label: 'Panoramica Globale', icon: Globe },
  { id: 'industries', label: 'Industrie Principali', icon: Factory },
  { id: 'exports', label: 'Export', icon: Ship },
  { id: 'imports', label: 'Import', icon: ShoppingCart },
  { id: 'news', label: 'Notizie Economiche', icon: Newspaper },
]

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mostra hamburger solo su mobile
  return (
    <>
      {/* Hamburger menu visibile solo su mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg border border-gray-200"
        onClick={() => setSidebarOpen(true)}
        aria-label="Apri menu"
      >
        <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Overlay e sidebar mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity ${sidebarOpen ? 'block' : 'hidden'} md:hidden`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 transform transition-transform duration-200 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block`}
      >
        <div className="p-6 flex items-center justify-between md:block">
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">Economic Dashboard</h1>
            <p className="text-sm text-gray-600">Monitoraggio globale</p>
          </div>
          {/* Bottone chiudi solo su mobile */}
          <button
            className="md:hidden ml-2 p-2 rounded-full hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
            aria-label="Chiudi menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-xs text-gray-500 text-center">
            © 2024 Global Economic Dashboard
          </div>
        </div>
      </aside>
    </>
  )
} 