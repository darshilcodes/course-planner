import { Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import ShowAllCourses from "./pages/ShowAllCourses"
import Planner from "./pages/Planner"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Planner />} />
        <Route path="courses" element={<ShowAllCourses />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
