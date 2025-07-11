'use client'

import React from 'react'
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
  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Economic Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Monitoraggio globale
        </p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full sidebar-item ${
                activeSection === item.id ? 'active' : ''
              }`}
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
    </div>
  )
} 