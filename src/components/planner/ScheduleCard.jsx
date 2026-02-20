import React from "react";

const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

const ScheduleCard = React.forwardRef(({ schedule, index, onExport }, ref) => {
  return (
    <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
      {/* Actions Bar (Excluded from Export) */}
      <div className="px-6 py-3 border-b border-border bg-foreground/[0.02] flex justify-end">
        <button
          onClick={() => onExport(index)}
          className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export Schedule
        </button>
      </div>

      {/* Captured Area */}
      <div ref={ref} className="bg-card">
        <div className="p-6 border-b border-border bg-foreground/[0.01]">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm">
              {index + 1}
            </span>
            Schedule Configuration
          </h3>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {days.map((day) => (
            <div key={day} className="flex flex-col gap-3">
              <div className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-1">
                {day}
              </div>

              <div className="flex-1 flex flex-col gap-3 min-h-[160px] p-3 rounded-2xl bg-foreground/[0.02] border border-border/50">
                {(() => {
                  const daySlots = schedule
                    .flatMap((section) =>
                      section.schedule
                        .filter((slot) => slot.day === day)
                        .map((slot) => ({
                          ...slot,
                          courseCode: section.courseCode,
                        }))
                    )
                    .sort((a, b) => a.startTime.localeCompare(b.startTime));

                  return daySlots.length > 0 ? (
                    daySlots.map((slot, i) => (
                      <div
                        key={i}
                        className="group/slot relative p-3 rounded-xl bg-card border border-primary/20 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl opacity-70" />
                        <div className="font-bold text-[10px] text-primary mb-1">
                          {slot.courseCode}
                        </div>
                        <div className="text-[10px] font-medium text-foreground/60 leading-tight">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ScheduleCard.displayName = "ScheduleCard";
export default ScheduleCard;
