"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { Incident } from "@/types/incident";
import { AlertTriangle, Eye, Crosshair, Car, Users } from "lucide-react";

interface IncidentListProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onIncidentSelect: (incident: Incident) => void;
  onIncidentResolve: (incidentId: string) => void;
}

const getIncidentIcon = (type: string) => {
  switch (type) {
    case "Gun Threat":
      return <Crosshair className="w-4 h-4" />;
    case "Unauthorized Access":
      return <AlertTriangle className="w-4 h-4" />;
    case "Face Recognised":
      return <Eye className="w-4 h-4" />;
    case "Traffic Congestion":
      return <Car className="w-4 h-4" />;
    case "Multiple Events":
      return <Users className="w-4 h-4" />;
    default:
      return <AlertTriangle className="w-4 h-4" />;
  }
};

const getIncidentColor = (type: string) => {
  switch (type) {
    case "Gun Threat":
      return "text-red-400 bg-red-900/20";
    case "Unauthorized Access":
      return "text-orange-400 bg-orange-900/20";
    case "Face Recognised":
      return "text-blue-400 bg-blue-900/20";
    case "Traffic Congestion":
      return "text-yellow-400 bg-yellow-900/20";
    case "Multiple Events":
      return "text-purple-400 bg-purple-900/20";
    default:
      return "text-gray-400 bg-gray-900/20";
  }
};

export default function IncidentList({
  incidents,
  selectedIncident,
  onIncidentSelect,
  onIncidentResolve,
}: IncidentListProps) {
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set());

  const handleResolve = async (incidentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResolvingIds((prev) => new Set(prev.add(incidentId))); // Optimistic UI

    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Failed to resolve incident");

      onIncidentResolve(incidentId);
    } catch (error) {
      console.error("Error resolving incident:", error);
      setResolvingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(incidentId);
        return newSet;
      });
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        {incidents.length} Unresolved Incidents
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {incidents.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">✅</div>
            <div>All incidents resolved</div>
          </div>
        ) : (
          incidents.map((incident) => {
            const isResolving = resolvingIds.has(incident.id);
            const isSelected = selectedIncident?.id === incident.id;

            return (
              <div
                key={incident.id}
                onClick={() => onIncidentSelect(incident)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-blue-500 bg-blue-900/10"
                    : "border-gray-700 bg-gray-800 hover:bg-gray-700"
                } ${isResolving ? "opacity-50 scale-95" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={incident.thumbnailUrl || "/thumbnails/thumb1.jpg"}
                      alt={`${incident.type} thumbnail`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`p-1 rounded-full ${getIncidentColor(
                            incident.type
                          )}`}
                        >
                          {getIncidentIcon(incident.type)}
                        </div>
                        <span className="text-white font-medium text-sm">
                          {incident.type}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleResolve(incident.id, e)}
                        disabled={isResolving}
                        className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isResolving ? "Resolving..." : "Resolve"}
                      </button>
                    </div>

                    <div className="text-gray-300 text-sm mb-1">
                      📍 {incident.camera.location}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      🕐 {format(new Date(incident.tsStart), "HH:mm")} -{" "}
                      {format(new Date(incident.tsEnd), "HH:mm")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
