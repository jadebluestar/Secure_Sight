'use client'

import { useEffect, useState } from 'react'
import IncidentPlayer, { Incident } from '@/components/IncidentPlayer'
import IncidentList from '@/components/IncidentList'

export default function HomePage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/incidents?resolved=false')
      const data = await response.json()
      setIncidents(data)
      
      // Auto-select the first incident if none selected
      if (data.length > 0 && !selectedIncident) {
        setSelectedIncident(data[0])
      }
    } catch (error) {
      console.error('Error fetching incidents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident)
  }

  const handleIncidentResolve = (incidentId: string) => {
    // Remove the resolved incident from the list
    setIncidents(prev => prev.filter(incident => incident.id !== incidentId))
    
    // If the resolved incident was selected, select the next one
    if (selectedIncident?.id === incidentId) {
      const remainingIncidents = incidents.filter(incident => incident.id !== incidentId)
      setSelectedIncident(remainingIncidents.length > 0 ? remainingIncidents[0] : null)
    }
  }

  // Get other incidents for the thumbnail strip (excluding selected)
  const otherIncidents = incidents.filter(incident => incident.id !== selectedIncident?.id)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading incidents...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <h1 className="text-2xl font-bold text-white">SecureSight</h1>
          <div className="ml-auto flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Monitoring</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
        {/* Left Side - Incident Player (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          <IncidentPlayer
            selectedIncident={selectedIncident}
            otherIncidents={otherIncidents}
            onIncidentSelect={handleIncidentSelect}
          />
        </div>

        {/* Right Side - Incident List (1/3 width on large screens) */}
        <div className="lg:col-span-1">
          <IncidentList
            incidents={incidents}
            selectedIncident={selectedIncident}
            onIncidentSelect={handleIncidentSelect}
            onIncidentResolve={handleIncidentResolve}
          />
        </div>
      </div>
    </div>
  )
}