import React from "react";
import CourseSelectionItem from "./CourseSelectionItem";

export default function CourseSelection({ 
  courses, 
  searchTerm, 
  onSearchChange, 
  onClearSelection, 
  onToggleCourse, 
  onToggleSection 
}) {
  const filteredCourses = courses
    .filter(
      (course) =>
        course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.selected && !b.selected) return -1;
      if (!a.selected && b.selected) return 1;
      return a.courseCode.localeCompare(b.courseCode);
    });

  return (
    <aside className="w-full lg:w-96 flex flex-col bg-card rounded-3xl border border-border overflow-hidden shadow-sm lg:h-full">
      <div className="p-6 border-b border-border bg-foreground/[0.02]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Course Selection</h2>
            <p className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider mt-1">
              Select your subjects
            </p>
          </div>
          <button
            onClick={onClearSelection}
            className="p-2 rounded-xl text-accent hover:bg-accent/10 transition-colors group"
            title="Clear all"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by code or name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10"
          />
          <svg
            className="w-4 h-4 text-foreground/30 absolute right-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredCourses.map((course) => (
          <CourseSelectionItem
            key={course.courseCode}
            course={course}
            onToggleCourse={onToggleCourse}
            onToggleSection={onToggleSection}
          />
        ))}
      </div>
    </aside>
  );
}
