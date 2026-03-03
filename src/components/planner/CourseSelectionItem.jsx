import React from "react";

export default function CourseSelectionItem({ course, onToggleCourse, onToggleSection }) {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all duration-300 ${
        course.selected
          ? "bg-primary/10 border-primary shadow-md"
          : "bg-card border-border hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      <label className="flex items-center gap-4 cursor-pointer group">
        <input
          type="checkbox"
          className="w-5 h-5 rounded-md border-border accent-primary focus:ring-primary"
          checked={course.selected}
          onChange={() => onToggleCourse(course.courseCode)}
        />

        <div className="flex flex-col">
          <span
            className={`text-sm font-bold transition-colors ${
              course.selected
                ? "text-foreground"
                : "text-foreground/70 group-hover:text-foreground"
            }`}
          >
            {course.courseCode}
          </span>

          <span className="text-xs text-foreground/50 truncate w-48 group-hover:text-primary transition-colors">
            {course.courseName}
          </span>
        </div>
      </label>

      {course.selected && (
        <div className="mt-4 pt-4 border-t border-border ml-9 space-y-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            Selected Sections
          </p>

          {course.sections.map((section) => (
            <label
              key={section.sectionId}
              className="flex items-center gap-3 text-sm cursor-pointer group py-1"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border accent-primary focus:ring-primary"
                checked={
                  !!course.selectedSections.find(
                    (s) => s.sectionId === section.sectionId
                  )
                }
                onChange={() =>
                  onToggleSection(course.courseCode, section.sectionId)
                }
              />

              <span className="text-foreground/70 group-hover:text-primary transition-colors font-medium">
                Section {section.sectionId}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}