import React from "react";
import { useCourseContext } from "../../context/CourseContext";

export default function CourseAccordionItem({ course: propCourse, isOpen, onToggle }) {
  const { courses, toggleCourse } = useCourseContext();

  const course =
    courses.find((c) => c.courseCode === propCourse.courseCode) || propCourse;

  const isSelected = course.selected;

  const handleSelect = (e) => {
    e.stopPropagation();
    toggleCourse(course.courseCode);
  };

  return (
    <div
      className={`group bg-card rounded-2xl border transition-all duration-500 hover:shadow-lg ${
        isSelected
          ? "border-primary ring-4 ring-primary/10 bg-primary/5"
          : isOpen
          ? "border-primary/40 ring-4 ring-primary/5 bg-primary/5"
          : "border-border hover:border-primary/30"
      }`}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        className="cursor-pointer p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
      >
        <div className="flex gap-4 md:gap-8 items-center">
          {/* Course Code Badge */}
          <div
            className={`w-10 h-10 md:w-24 md:h-10 rounded-xl flex items-center justify-center font-bold text-base md:text-lg border transition-all duration-500 ${
              isSelected || isOpen
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-primary/5 text-primary border-border"
            }`}
          >
            {course.courseCode}
          </div>

          {/* Course Info */}
          <div>
            <h2
              className={`text-base md:text-lg font-bold mb-1 transition-colors ${
                isSelected
                  ? "text-primary"
                  : "text-foreground group-hover:text-primary"
              }`}
            >
              {course.courseName}
            </h2>

            <div className="flex items-center gap-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/20 ">
                {course.courseCode}
              </span>

              <span>•</span>

              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {course.credits} Credits
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4 self-end sm:self-center">
          {/* Select Button */}
          <button
            onClick={handleSelect}
            className={`px-4 py-1 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
              isSelected
                ? "bg-primary text-primary-foreground shadow-md border border-primary"
                : "bg-background text-muted-foreground border border-border hover:border-primary hover:text-primary"
            }`}
          >
            {isSelected ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Selected
              </span>
            ) : (
              "Select"
            )}
          </button>

          {/* Expand Icon */}
          <div
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border transition-all duration-500 shrink-0 ${
              isOpen
                ? "bg-primary text-primary-foreground border-primary rotate-180 shadow-md"
                : "bg-background text-muted-foreground border-border group-hover:border-primary group-hover:text-primary"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Expand Section */}
      <div
        className={`transition-all duration-500 ease-in-out px-5 ${
          isOpen
            ? "max-h-[1000px] opacity-100 pb-6 pt-2"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Instructors */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Instructors
            </h3>

            <div className="flex flex-wrap gap-2">
              {course.faculties?.map((faculty, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background text-foreground border border-border hover:bg-primary/5 hover:border-primary/30 transition-all"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {faculty.name.charAt(0)}
                  </div>
                  <span className="font-medium text-xs">
                    {faculty.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sections
            </h3>

            <div className="grid gap-2">
              {course.sections?.map((section) => (
                <div
                  key={section.sectionId}
                  className="p-3 rounded-xl bg-background border border-border hover:border-primary/40 transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-xs text-primary uppercase tracking-wider">
                      Sec {section.sectionId}
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {section.schedule?.map((slot, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <svg
                          className="w-3 h-3 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span className="font-medium text-foreground">
                          {slot.day.substring(0, 3)}
                        </span>

                        <span>{slot.startTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}