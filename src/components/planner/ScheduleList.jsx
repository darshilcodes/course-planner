import React from "react";
import ScheduleCard from "./ScheduleCard";

export default function ScheduleList({ schedules, scheduleRefs, onExport }) {
  if (schedules.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-card/50 rounded-2xl border-2 border-dashed border-border">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground">No Schedules Yet</h3>
        <p className="text-foreground/50 max-w-sm mt-2">
          Select some courses and sections from the left panel to automatically
          generate your optimized class schedules.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-10 pb-10">
      {schedules.map((schedule, index) => (
        <ScheduleCard
          key={index}
          schedule={schedule}
          index={index}
          onExport={onExport}
          ref={(el) => (scheduleRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}
