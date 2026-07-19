import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DirectoryPage } from "@/pages/DirectoryPage"
import { ClubPage } from "@/pages/ClubPage"
import { DashboardPage } from "@/pages/DashboardPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DirectoryPage />} />
        <Route path="/club/:clubId" element={<ClubPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
