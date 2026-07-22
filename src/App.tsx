import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DirectoryPage } from "@/pages/DirectoryPage"
import { ClubPage } from "@/pages/ClubPage"
import { EditClubPage } from "@/pages/EditClubPage"
import { ClaimClubPage } from "@/pages/ClaimClubPage"
import { AdminPage } from "@/pages/AdminPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { LoginPage } from "@/pages/LoginPage"
import { SignupPage } from "@/pages/SignupPage"
import { AuthProvider } from "@/lib/auth"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DirectoryPage />} />
          <Route path="/club/:clubId" element={<ClubPage />} />
          <Route path="/clubs/:clubId/edit" element={<EditClubPage />} />
          <Route path="/claim" element={<ClaimClubPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
