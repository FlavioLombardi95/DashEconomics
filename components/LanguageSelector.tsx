'use client'

import React from 'react'
import { Globe } from 'lucide-react'
import { Language } from '../lib/i18n'

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="px-2 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="it">🇮🇹 Italiano</option>
        <option value="en">🇺🇸 English</option>
      </select>
    </div>
  )
} 