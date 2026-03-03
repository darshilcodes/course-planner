import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => {
        const initialized = data.map((course) => ({
          ...course,
          selected: false,
          selectedSections: [],
        }));
        setCourses(initialized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading courses:", err);
        setLoading(false);
      });
  }, []);

  const toggleCourse = (courseCode) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.courseCode === courseCode) {
          const isSelected = !course.selected;
          return {
            ...course,
            selected: isSelected,
            selectedSections: isSelected ? [...course.sections] : [],
          };
        }
        return course;
      })
    );
  };

  const toggleSection = (courseCode, sectionId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.courseCode === courseCode) {
          const section = course.sections.find((s) => s.sectionId === sectionId);
          const isAlreadySelected = course.selectedSections.some((s) => s.sectionId === sectionId);
          
          let updatedSections;
          if (isAlreadySelected) {
            updatedSections = course.selectedSections.filter((s) => s.sectionId !== sectionId);
          } else {
            updatedSections = [...course.selectedSections, section];
          }

          return {
            ...course,
            selected: updatedSections.length > 0,
            selectedSections: updatedSections,
          };
        }
        return course;
      })
    );
  };

  const clearSelection = () => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => ({
        ...course,
        selected: false,
        selectedSections: [],
      }))
    );
  };

  const totalCredits = courses
    .filter((course) => course.selected)
    .reduce((sum, course) => sum + (course.credits || 0), 0);

  const totalCourses= courses
    .filter((course) => course.selected)
    .reduce((sum, course) => sum + 1, 0);

  return (
    <CourseContext.Provider value={{ courses, loading, toggleCourse, toggleSection, clearSelection, totalCredits, totalCourses}}>
      {children}
    </CourseContext.Provider>
  );
};
