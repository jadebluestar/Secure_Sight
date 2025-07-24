'use client'

import { Incident } from '@/types/incident'
import { format } from 'date-fns'

interface TimelineProps {
  incidents: Incident[]
  onSelect: (incident: Incident) => void
}

export default function Timeline({ incidents, onSelect }: TimelineProps) {
  // Example: 06:00 to 24:00 timeline
  const hours = Array.from({ length: 19 }, (_, i) => i + 6) // 6 AM to midnight

  const getColor = (type: string) => {
    switch (type) {
      case 'Gun Threat': return 'bg-red-500'
      case 'Unauthorized Access': return 'bg-orange-500'
      case 'Face Recognised': return 'bg-blue-500'
      case 'Traffic Congestion': return 'bg-yellow-400'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Time scale */}
        <div className="flex justify-between text-gray-400 text-xs mb-2">
          {hours.map(h => (
            <div key={h} className="w-[80px] text-center">{h}:00</div>
          ))}
        </div>

        {/* Camera List */}
        <div className="space-y-3">
          {['Camera-01', 'Camera-02', 'Camera-03'].map(cam => (
            <div key={cam} className="flex items-center gap-2">
              <div className="w-24 text-gray-300 text-sm">{cam}</div>
              <div className="flex-1 h-6 bg-gray-800 rounded relative">
                {incidents
                  .filter(i => i.camera.name === cam)
                  .map(incident => (
                    <div
                      key={incident.id}
                      className={`absolute h-6 rounded ${getColor(incident.type)} cursor-pointer`}
                      style={{
                        left: `${Math.random() * 80}%`, // for now random positioning
                        width: '40px'
                      }}
                      onClick={() => onSelect(incident)}
                      title={`${incident.type} (${format(new Date(incident.tsStart), 'HH:mm')})`}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
