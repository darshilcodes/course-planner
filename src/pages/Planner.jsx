import { useEffect, useState, useRef } from "react"
import { toPng } from "html-to-image"
import { generateSchedules } from "../utils/scheduler"
import CourseSelection from "../components/planner/CourseSelection"
import ScheduleList from "../components/planner/ScheduleList"
import { useCourseContext } from "../context/CourseContext"

export default function Planner() {
  const { courses, toggleCourse, toggleSection, clearSelection } = useCourseContext()
  const [schedules, setSchedules] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const scheduleRefs = useRef([])

  // Generate schedules
  useEffect(() => {
    const selectedCourses = courses.filter(
      (c) => c.selected && c.selectedSections.length > 0
    )

    if (selectedCourses.length === 0) {
      setSchedules([])
      return
    }

    const result = generateSchedules(selectedCourses)
    setSchedules(result)
  }, [courses])
  
  // Export as Image
  const handleExportImage = async (index) => {
    if (scheduleRefs.current[index]) {
      try {
        const bgCard = getComputedStyle(document.documentElement).getPropertyValue('--card').trim() || "#ffffff";
        
        const dataUrl = await toPng(scheduleRefs.current[index], {
          quality: 1.0,
          pixelRatio: 3,
          backgroundColor: bgCard,
          style: {
            borderRadius: "0px",
            padding: "20px",
          }
        })
        const link = document.createElement("a")
        link.download = `schedule-${index + 1}.png`
        link.href = dataUrl
        link.click()
      } catch (err) {
        console.error("Export failed", err)
      }
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-screen lg:h-[calc(100vh-160px)] overflow-hidden my-0">
      <CourseSelection
        courses={courses}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearSelection={clearSelection}
        onToggleCourse={toggleCourse}
        onToggleSection={toggleSection}
      />

      <section className="flex-1 flex flex-col min-w-0 h-full">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h2 className="text-xl font-extrabold text-foreground tracking-tight">
              Generated Schedules
            </h2>
            <p className="text-foreground/50 mt-0">
              Found <span className="text-primary font-bold">{schedules.length}</span> possible combinations
            </p>
          </div>
        </div>

        <ScheduleList
          schedules={schedules}
          scheduleRefs={scheduleRefs}
          onExport={handleExportImage}
        />
      </section>
    </div>
  )
}

