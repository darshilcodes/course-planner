import React from "react";
import { useCourseContext } from "../../context/CourseContext";

export default function CourseAccordionItem({ course: propCourse, isOpen, onToggle }) {
  const { courses, toggleCourse } = useCourseContext();
  
  // Find the course in the context to get its latest selection state
  const course = courses.find(c => c.courseCode === propCourse.courseCode) || propCourse;
  const isSelected = course.selected;

  const handleSelect = (e) => {
    e.stopPropagation();
    toggleCourse(course.courseCode);
  };

  return (
    <div
      className={`group bg-card rounded-2xl border transition-all duration-500 hover:shadow-lg ${
        isSelected
          ? "border-primary/50 ring-4 ring-primary/5 shadow-primary/5 bg-primary/[0.02]"
          : isOpen
          ? "border-primary/30 ring-4 ring-primary/5 shadow-primary/5 bg-primary/[0.01]"
          : "border-border hover:border-primary/20 bg-transparent"
      }`}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        className={`cursor-pointer p-4 md:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors`}
      >
        <div className="flex gap-3 md:gap-8 items-center">
          <div
            className={`w-10 h-10 md:w-25 md:h-12 rounded-xl flex items-center justify-center font-black text-base md:text-lg border transition-all duration-500 ${
              isSelected || isOpen
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                : "bg-primary/5 text-primary border-primary/10 group-hover:bg-primary/10"
            }`}
          >
            {course.courseCode}
          </div>
          <div>
            <h2 className={`text-base md:text-lg font-bold mb-0.5 transition-colors ${isSelected ? 'text-primary' : 'text-zinc-100 dark:text-zinc-100 group-hover:text-primary'}`}>
              {course.courseName}
            </h2>
            <div className="flex items-center gap-2 md:gap-3 text-[9px] font-bold text-primary/40 uppercase tracking-widest">
              <span className="px-1.5 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-primary/60">
                {course.courseCode}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-primary/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {course.credits} Credits
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          <button
            onClick={handleSelect}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
              isSelected
                ? "bg-primary text-white shadow-lg shadow-primary/25 border border-primary"
                : "bg-background text-foreground/60 border border-border hover:border-primary/50 hover:text-primary"
            }`}
          >
            {isSelected ? (
              <span className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Selected
              </span>
            ) : (
              "Select"
            )}
          </button>

          <div
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border transition-all duration-500 shrink-0 ${
              isOpen
                ? "bg-primary text-white border-primary rotate-180 shadow-lg shadow-primary/20"
                : "bg-background text-foreground/40 border-border group-hover:border-primary/50 group-hover:text-primary"
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
            ? "max-h-[1000px] opacity-100 pb-6 pt-1"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Faculties */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground/30">
                Instructors
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.faculties?.map((faculty, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-foreground/[0.03] text-foreground border border-border group/fac transition-all hover:bg-primary/5 hover:border-primary/20"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold transition-all group-hover/fac:bg-primary group-hover/fac:text-white">
                    {faculty.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-xs">{faculty.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-primary/30">
                Sections
              </h3>
            </div>

            <div className="grid gap-2">
              {course.sections?.map((section) => (
                <div
                  key={section.sectionId}
                  className="p-3 rounded-xl bg-foreground/[0.01] border border-border/60 hover:border-primary/30 transition-all bg-card"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-black text-[9px] text-primary/80 uppercase tracking-wider">
                      Sec {section.sectionId}
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {section.schedule?.map((slot, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[10px] text-foreground/60"
                      >
                        <div className="text-primary">
                          <svg
                            className="w-3 h-3"
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
                        </div>
                        <span className="font-bold text-foreground/70">
                          {slot.day.substring(0, 3)}
                        </span>
                        <span className="font-medium">{slot.startTime}</span>
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
