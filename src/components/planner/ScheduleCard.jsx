import React from "react";

const daysHeader = ["Mon", "Tue", "Wed", "Thu", "Fri" ];
const daysFull = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" ];

const ScheduleCard = React.forwardRef(({ schedule, index, onExport }, ref) => {
  // 1. Flatten all slots across the schedule
  const allSlots = schedule.flatMap((section) =>
    section.schedule.map((slot) => ({
      ...slot,
      courseCode: section.courseCode,
      sectionId: section.sectionId,
      courseName: section.courseName,
    }))
  );

  // 2. Define standard 1.5-hour blocks starting from 08:00
  // Considering 30m lunch break at 12:30-13:00
  const timeBlocks = [
    { start: "08:00", end: "09:30" },
    { start: "09:30", end: "11:00" },
    { start: "11:00", end: "12:30" },
    // Lunch Break 12:30 - 13:00
    { start: "13:00", end: "14:30" },
    { start: "14:30", end: "16:00" },
    { start: "16:00", end: "17:30" },
    { start: "17:30", end: "19:00" },
    { start: "19:00", end: "20:30" },
  ];

  const visibleBlocks = timeBlocks.filter(block => {
    return allSlots.some(slot => 
      (slot.startTime >= block.start && slot.startTime < block.end) || // Starts within block
      (slot.endTime > block.start && slot.endTime <= block.end) || // Ends within block
      (slot.startTime <= block.start && slot.endTime >= block.end) // Spans across block
    );
  });
return (
  <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden mb-12">

    {/* Header */}
    <div className="px-4 py-2 border-b border-border bg-primary/5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md">
          {index + 1}
        </div>
        <h3 className="text-foreground font-bold tracking-tight">
          Schedule Configuration
        </h3>
      </div>
<button
  onClick={() => onExport(index)}
  className="px-5 cursor-pointer py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all duration-300 shadow-md flex items-center gap-2"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v12m0 0l-4-4m4 4l4-4m-9 6h10"
    />
  </svg>

  Export Schedule
</button>
    </div>

    {/* Grid Container */}
    <div ref={ref} className="bg-background p-4">
      <div className="relative overflow-x-auto">
        <div className="min-w-[900px]">

          {/* Days Header */}
          <div className="grid grid-cols-[100px_repeat(5,1fr)] mb-1">
            <div></div>
            {daysHeader.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Timetable */}
          <div className="relative">
            <div className="flex flex-col">

              {timeBlocks.map((block) => (
                <div
                  key={block.start}
                  className="grid grid-cols-[100px_repeat(5,1fr)] border-t border-border"
                >
                  {/* Time Column */}
                  <div className="py-2 px-1  text-right">
                    <div className="text-sm font-semibold text-foreground tabular-nums">
                      {block.start}-{block.end}
                    </div>
                     
                  </div>

                  {/* Day Columns */}
                  {daysFull.map((day) => {
                    const slot = allSlots.find(
                      (s) =>
                        s.day === day &&
                        (
                          (s.startTime >= block.start && s.startTime < block.end) ||
                          (s.endTime > block.start && s.endTime <= block.end) ||
                          (s.startTime <= block.start && s.endTime >= block.end)
                        )
                    );

                    return (
                      <div
                        key={day}
                        className="relative border-l border-border flex items-center justify-center hover:bg-muted/40 transition-colors"
                      >
                        {slot ? (
                          <div className="w-[90%] h-[75%] py-auto rounded-2xl flex flex-col items-center justify-center text-center bg-primary/10 border border-primary/30 shadow-sm hover:scale-[1.02] transition-transform">

                            <div className="font-bold text-xs text-primary mb-1">
                              {slot.courseCode}-{slot.sectionId}
                              
                              </div>

                             

                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);
});

ScheduleCard.displayName = "ScheduleCard";
export default ScheduleCard;
