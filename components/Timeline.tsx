"use client";

import { Incident } from "@/types/incident";
import { format } from "date-fns";

interface TimelineProps {
  incidents: Incident[];
  onSelect: (incident: Incident) => void;
}

export default function Timeline({ incidents, onSelect }: TimelineProps) {
  // Timeline range: 06:00 to 24:00
  const startHour = 6;
  const endHour = 24;
  const totalMinutes = (endHour - startHour) * 60;

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => i + startHour);

  const getColor = (type: string) => {
    switch (type) {
      case "Gun Threat": return "bg-red-500";
      case "Unauthorized Access": return "bg-orange-500";
      case "Face Recognised": return "bg-blue-500";
      case "Traffic Congestion": return "bg-yellow-400";
      default: return "bg-gray-500";
    }
  };

  // ✅ Calculate left position and width for each incident
  const calculatePosition = (tsStart: string, tsEnd: string) => {
    const start = new Date(tsStart);
    const end = new Date(tsEnd);

    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = end.getHours() * 60 + end.getMinutes();

    const leftPercent = ((startMinutes - startHour * 60) / totalMinutes) * 100;
    const widthPercent = ((endMinutes - startMinutes) / totalMinutes) * 100;

    return {
      left: `${Math.max(0, leftPercent)}%`,
      width: `${Math.max(2, widthPercent)}%`, // minimum width for visibility
    };
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Time Scale */}
        <div className="flex justify-between text-gray-400 text-xs mb-2">
          {hours.map(h => (
            <div key={h} className="w-[80px] text-center">{h}:00</div>
          ))}
        </div>

        {/* Camera Tracks */}
        <div className="space-y-3">
          {["Camera-01", "Camera-02", "Camera-03"].map(cam => (
            <div key={cam} className="flex items-center gap-2">
              {/* Camera Label */}
              <div className="w-24 text-gray-300 text-sm">{cam}</div>

              {/* Track */}
              <div className="flex-1 h-6 bg-gray-800 rounded relative">
                {incidents
                  .filter(i => i.camera.name === cam)
                  .map(incident => {
                    const { left, width } = calculatePosition(incident.tsStart, incident.tsEnd);
                    return (
                      <div
                        key={incident.id}
                        className={`absolute h-6 rounded ${getColor(incident.type)} cursor-pointer`}
                        style={{ left, width }}
                        onClick={() => onSelect(incident)}
                        title={`${incident.type} (${format(new Date(incident.tsStart), "HH:mm")})`}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
