import React from "react";

export default function CourseSelectionItem({ course, onToggleCourse, onToggleSection }) {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all duration-300 ${
        course.selected
          ? "bg-primary/5 border-primary/20 shadow-sm"
          : "bg-transparent border-transparent hover:border-border hover:bg-foreground/[0.02]"
      }`}
    >
      <label className="flex items-center gap-4 cursor-pointer group">
        <input
          type="checkbox"
          className="w-5 h-5 rounded-md border-border text-primary focus:ring-primary accent-primary"
          checked={course.selected}
          onChange={() => onToggleCourse(course.courseCode)}
        />
        <div className="flex flex-col">
          <span
            className={`text-sm font-bold transition-colors ${
              course.selected ? "text-primary" : "text-foreground"
            }`}
          >
            {course.courseCode}
          </span>
          <span className="text-[10px] text-foreground/50 truncate w-48">
            {course.courseName}
          </span>
        </div>
      </label>

      {course.selected && (
        <div className="mt-4 pt-4 border-t border-primary/10 ml-9 space-y-2">
          <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-1">
            Select Sections
          </p>
          {course.sections.map((section) => (
            <label
              key={section.sectionId}
              className="flex items-center gap-3 text-sm cursor-pointer group py-1"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary accent-secondary"
                checked={
                  !!course.selectedSections.find(
                    (s) => s.sectionId === section.sectionId
                  )
                }
                onChange={() =>
                  onToggleSection(course.courseCode, section.sectionId)
                }
              />
              <span className="text-foreground/70 group-hover:text-foreground transition-colors font-medium">
                Section {section.sectionId}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
