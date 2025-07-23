'use client'

import { format } from 'date-fns'
import Image from 'next/image'

export interface Incident {
  id: string
  type: string
  tsStart: string
  tsEnd: string
  thumbnailUrl: string
  resolved: boolean
  cameraId: string
  camera: {
    id: string
    name: string
    location: string
  }
}

interface IncidentPlayerProps {
  selectedIncident: Incident | null
  otherIncidents: Incident[]
  onIncidentSelect: (incident: Incident) => void
}

export default function IncidentPlayer({
  selectedIncident,
  otherIncidents,
  onIncidentSelect,
}: IncidentPlayerProps) {
  const otherThumbnails = otherIncidents.slice(0, 2)

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-full flex flex-col">
      {/* Main Video/Image Display */}
      <div className="flex-1 bg-black rounded-lg mb-4 relative overflow-hidden">
        {selectedIncident ? (
          <div className="relative w-full h-full min-h-[400px]">
            <Image
              src={selectedIncident.thumbnailUrl}
              alt={`${selectedIncident.type} - ${selectedIncident.camera.location}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            />
            
            {/* Overlay Info */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 rounded-lg px-3 py-2">
              <div className="text-white font-semibold text-sm">
                {selectedIncident.camera.name}
              </div>
              <div className="text-gray-300 text-xs">
                {selectedIncident.camera.location}
              </div>
            </div>

            {/* Time Range */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded-lg px-3 py-2">
              <div className="text-white text-sm">
                {format(new Date(selectedIncident.tsStart), 'HH:mm:ss')} - {format(new Date(selectedIncident.tsEnd), 'HH:mm:ss')}
              </div>
              <div className="text-gray-300 text-xs">
                {format(new Date(selectedIncident.tsStart), 'dd MMM yyyy')}
              </div>
            </div>

            {/* Type Badge */}
            <div className="absolute top-4 right-4">
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                selectedIncident.type === 'Gun Threat'
                  ? 'bg-red-600 text-white'
                  : selectedIncident.type === 'Unauthorized Access'
                  ? 'bg-orange-600 text-white'
                  : selectedIncident.type === 'Face Recognised'
                  ? 'bg-blue-600 text-white'
                  : selectedIncident.type === 'Traffic Congestion'
                  ? 'bg-yellow-600 text-black'
                  : 'bg-purple-600 text-white'
              }`}>
                {selectedIncident.type}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-6xl mb-4">📹</div>
              <div className="text-xl">Select an incident to view</div>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2">
        {otherThumbnails.map((incident) => (
          <button
            key={incident.id}
            onClick={() => onIncidentSelect(incident)}
            className="relative flex-1 aspect-video bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <Image
              src={incident.thumbnailUrl}
              alt={`${incident.type} - ${incident.camera.location}`}
              fill
              className="object-cover"
              sizes="150px"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-20 transition-all">
              <div className="absolute bottom-1 left-1 text-white text-xs font-medium">
                {incident.camera.name}
              </div>
              <div className="absolute top-1 right-1">
                <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded ${
                  incident.type === 'Gun Threat'
                    ? 'bg-red-600 text-white'
                    : incident.type === 'Unauthorized Access'
                    ? 'bg-orange-600 text-white'
                    : incident.type === 'Face Recognised'
                    ? 'bg-blue-600 text-white'
                    : incident.type === 'Traffic Congestion'
                    ? 'bg-yellow-600 text-black'
                    : 'bg-purple-600 text-white'
                }`}>
                  •
                </span>
              </div>
            </div>
          </button>
        ))}
        
        {/* Fill remaining space if less than 2 other incidents */}
        {otherThumbnails.length < 2 && (
          <div className="flex-1 aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
            <span className="text-sm">No camera</span>
          </div>
        )}
      </div>
    </div>
  )
}