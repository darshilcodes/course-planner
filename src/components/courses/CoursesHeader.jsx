import React from "react";

export default function CoursesHeader({ courseCount, searchTerm, onSearchChange, onClear }) {
  return (
    <div className="p-6 rounded-1xl border-border bg-foreground/[0.02] relative overflow-hidden">
      {/* Abstract background element */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/5 rounded-1xl blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xs md:text-xl font-black tracking-tight text-foreground mb-1">
            All Courses
          </h1>
          <p className="text-foreground/50 text-xs md:text-sm max-w-xl font-medium leading-relaxed mx-auto md:mx-0">
            Browse <span className="text-primary font-bold">{courseCount}</span> courses. Filter by code or name.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1 w-full md:w-auto">
          <div className="relative w-full md:w-72 group order-1 sm:order-2">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-background border-2 border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all pr-10 group-hover:border-border"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-primary/10 text-primary">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
        </div>
          <button
            onClick={onClear}
            className="cursor-pointer flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-background hover:bg-foreground/[0.02] text-foreground/70 hover:text-primary transition-all text-sm font-bold order-2 sm:order-1 w-full sm:w-auto justify-center"
            title="Deselect all courses"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
             
          </button>
      </div>
    </div>
  );
}
