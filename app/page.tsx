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

  // ✅ Fetch unresolved incidents only
  const fetchIncidents = async () => {
    try {
      const response = await fetch("/api/incidents?resolved=false");
      const data: Incident[] = await response.json();
      setIncidents(data);

      if (data.length > 0 && !selectedIncident) {
        setSelectedIncident(data[0]);
      }
    } catch (error) {
      console.error("Error fetching incidents:", error);
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

  // ✅ Resolve via API and refresh list
  const handleIncidentResolve = async (incidentId: string) => {
    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Failed to resolve incident");

      // ✅ Refresh incidents list
      await fetchIncidents();

      // ✅ Update selected incident
      if (selectedIncident?.id === incidentId) {
        const remainingIncidents = incidents.filter((i) => i.id !== incidentId);
        setSelectedIncident(remainingIncidents.length > 0 ? remainingIncidents[0] : null);
      }
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
