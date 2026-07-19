import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DirectoryPage } from "@/pages/DirectoryPage"
import { ClubPage } from "@/pages/ClubPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DirectoryPage />} />
        <Route path="/club/:clubId" element={<ClubPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
