"use client";

import Image from "next/image";
import { Incident } from "@/types/incident";

interface IncidentPlayerProps {
  selectedIncident: Incident | null;
  otherIncidents: Incident[];
  onIncidentSelect: (incident: Incident) => void;
}

export default function IncidentPlayer({
  selectedIncident,
  otherIncidents,
  onIncidentSelect,
}: IncidentPlayerProps) {
  if (!selectedIncident) {
    return (
      <div className="bg-gray-900 rounded-lg flex items-center justify-center h-full text-gray-400">
        Select an incident to view details
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg h-full flex flex-col overflow-hidden">
      {/* Image Display */}
      <div className="relative flex-1 bg-black">
        <Image
          src={selectedIncident.thumbnailUrl || "/thumbnails/thumb1.jpg"}
          alt={selectedIncident.type}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded text-white text-sm">
          {selectedIncident.type}
        </div>
      </div>

      {/* Incident Info */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">
            {selectedIncident.type}
          </h3>
          <span className="text-sm text-gray-400">
            {selectedIncident.camera.location}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          No additional details provided.
        </p>
      </div>

      {/* Thumbnail Strip */}
      {otherIncidents.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto bg-gray-800 p-3 border-t border-gray-700">
          {otherIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => onIncidentSelect(incident)}
              className="w-24 h-16 flex-shrink-0 relative cursor-pointer rounded overflow-hidden hover:ring-2 hover:ring-blue-500"
            >
              <Image
                src={incident.thumbnailUrl || "/thumbnails/thumb1.jpg"}
                alt={incident.type}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
