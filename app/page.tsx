
"use client";

import { useEffect, useState } from "react";
import IncidentPlayer from "@/components/IncidentPlayer";
import IncidentList from "@/components/IncidentList";
import Timeline from "@/components/Timeline";
import { Incident } from "@/types/incident";

export default function HomePage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch unresolved incidents only (with fallback)
  const fetchIncidents = async () => {
    try {
      const response = await fetch("/api/incidents?resolved=false");
      if (!response.ok) throw new Error("API failed");

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid API response");

      setIncidents(data);

      if (data.length > 0 && !selectedIncident) {
        setSelectedIncident(data[0]);
      }
    } catch (error) {
      console.error("Error fetching incidents:", error);

      // ✅ Fallback to mock data for deployment
      const mockData: Incident[] = [
        {
          id: "demo1",
          type: "Demo Incident",
          tsStart: new Date(),
          tsEnd: new Date(),
          thumbnailUrl: "/thumbnails/thumb1.jpg",
          resolved: false,
          cameraId: "mock-camera",
          camera: {
            id: "mock-camera",
            name: "Demo Camera",
            location: "Virtual"
          },
          videoUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      setIncidents(mockData);
      setSelectedIncident(mockData[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  // ✅ Mock resolve (since real DB won't work on Vercel)
  const handleIncidentResolve = async (incidentId: string) => {
    try {
      console.log(`Mock resolve for incident ${incidentId}`);
      const remainingIncidents = incidents.filter((i) => i.id !== incidentId);
      setIncidents(remainingIncidents);
      setSelectedIncident(remainingIncidents.length > 0 ? remainingIncidents[0] : null);
    } catch (error) {
      console.error("Error resolving incident:", error);
    }
  };

  const otherIncidents = selectedIncident
    ? incidents.filter((incident) => incident.id !== selectedIncident.id)
    : incidents;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading incidents...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 flex-1">
        <div className="lg:col-span-2">
          <IncidentPlayer
            selectedIncident={selectedIncident}
            otherIncidents={otherIncidents}
            onIncidentSelect={handleIncidentSelect}
          />
        </div>
        <div className="lg:col-span-1">
          <IncidentList
            incidents={incidents}
            selectedIncident={selectedIncident}
            onIncidentSelect={handleIncidentSelect}
            onIncidentResolve={handleIncidentResolve}
          />
        </div>
      </div>

      {/* ✅ Timeline */}
      <div className="bg-gray-900 border-t border-gray-700 px-4 py-2">
        <Timeline incidents={incidents} onSelect={handleIncidentSelect} />
      </div>
    </div>
  );
}
