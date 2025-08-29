import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/home/HomePage'
import { MetricsPage } from './components/pages/metrics/MetricsPage'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/metrics" element={<MetricsPage />} />
    </Routes>
  )
}

export default AppRoutes
