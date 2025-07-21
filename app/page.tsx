'use client'

import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview'
import Industries from '../components/Industries'
import Exports from '../components/Exports'
import Imports from '../components/Imports'
import News from '../components/News'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview')

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />
      case 'industries':
        return <Industries />
      case 'exports':
        return <Exports />
      case 'imports':
        return <Imports />
      case 'news':
        return <News />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 md:flex-row flex-col">
      {/* Sidebar: sempre presente per gestire mobile e desktop */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 md:ml-0">
        <div className="max-w-7xl mx-auto w-full">
          {renderSection()}
        </div>
      </main>
    </div>
  )
} 