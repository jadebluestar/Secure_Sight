"use client";

import Image from "next/image";
import { Incident } from "@/types/incident";
import { Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [selectedIncident]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!selectedIncident) {
    return (
      <div className="bg-gray-900 rounded-lg flex items-center justify-center h-full text-gray-400">
        Select an incident to view details
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg h-full flex flex-col overflow-hidden">
      {/* Video Section */}
      <div className="relative flex-1 bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls={false}
        >
          {/* If no videoUrl, fallback to thumbnail */}
          {selectedIncident.videoUrl ? (
            <source src={selectedIncident.videoUrl} type="video/mp4" />
          ) : null}
        </video>

        {/* Overlay Controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div className="bg-black/50 px-3 py-1 rounded text-white text-sm">
              {selectedIncident.type}
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <button
              onClick={handlePlayPause}
              className="bg-black/70 p-3 rounded-full text-white hover:bg-black/90"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Incident Info */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">{selectedIncident.type}</h3>
          <span className="text-sm text-gray-400">{selectedIncident.camera.location}</span>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          {selectedIncident.description || "No additional details provided."}
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
                src={incident.thumbnailUrl}
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
