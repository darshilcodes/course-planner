function isTimeOverlap(a, b) {
  if (a.day !== b.day) return false

  return (
    a.startTime < b.endTime &&
    b.startTime < a.endTime
  )
}

function hasClash(sections) {
  const slots = []

  for (const section of sections) {
    for (const slot of section.schedule) {
      for (const existing of slots) {
        if (isTimeOverlap(slot, existing)) {
          return true
        }
      }
      slots.push(slot)
    }
  }

  return false
}

export function generateSchedules(selectedCourses) {
  if (selectedCourses.length === 0) return []

  const results = []

  function backtrack(index, current) {
    if (index === selectedCourses.length) {
      if (!hasClash(current)) {
        results.push([...current])
      }
      return
    }

    const course = selectedCourses[index]

    for (const section of course.selectedSections) {
      current.push({
        ...section,
        courseCode: course.courseCode,
        courseName: course.courseName,
      })

      backtrack(index + 1, current)
      current.pop()
    }
  }

  backtrack(0, [])
  return results
}
