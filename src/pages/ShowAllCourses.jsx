import { useState } from "react"
import CoursesHeader from "../components/courses/CoursesHeader"
import CourseAccordionItem from "../components/courses/CourseAccordionItem"
import { useCourseContext } from "../context/CourseContext"

export default function ShowAllCourses() {
  const { courses, loading, clearSelection } = useCourseContext()
  const [activeCourse, setActiveCourse] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const toggleCourse = (code) => {
    setActiveCourse(activeCourse === code ? null : code)
  }

  const filteredCourses = courses
    .filter(
      (course) =>
        course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by selected status first
      if (a.selected && !b.selected) return -1;
      if (!a.selected && b.selected) return 1;
      // Then sort alphabetically by courseCode
      return a.courseCode.localeCompare(b.courseCode);
    });

  return (
    <div className="flex flex-col min-h-[calc(100vh-160px)] lg:h-[calc(100vh-140px)] max-w-5xl mx-auto bg-card rounded-2xl md:rounded-[32px] border border-border overflow-hidden shadow-2xl">
      <CoursesHeader 
        courseCount={courses.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={clearSelection}
      />

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-foreground/[0.01] rounded-[24px] border-2 border-dashed border-border/50">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">No courses found</h3>
            <p className="text-xs text-foreground/50 mt-1 max-w-xs">
              Try another keyword for "{searchTerm}".
            </p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <CourseAccordionItem 
              key={course.courseCode}
              course={course}
              isOpen={activeCourse === course.courseCode}
              onToggle={() => toggleCourse(course.courseCode)}
            />
          ))
        )}
      </div>
    </div>
  )
}

