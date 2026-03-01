import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import GamesPage from "./pages/GamesPage";
import AppsPage from "./pages/AppsPage";
import TurkishPatches from "./pages/TurkishPatches";
import Requests from "./pages/Requests";
import Complaints from "./pages/Complaints";
import GameDetail from "./pages/GameDetail";
import AppDetail from "./pages/AppDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./hooks/useAuth";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/oyunlar/" replace />} />
            <Route path="/oyunlar/" element={<GamesPage />} />
            <Route path="/oyunlar/:slug" element={<GameDetail />} />
            <Route path="/uygulamalar/" element={<AppsPage />} />
            <Route path="/uygulamalar/:slug" element={<AppDetail />} />
            <Route path="/turkce-yamalar/" element={<TurkishPatches />} />
            <Route path="/istekler/" element={<Requests />} />
            <Route path="/sikayetler/" element={<Complaints />} />
            <Route path="/giris-yap/" element={<Login />} />
            <Route path="/hesap-olustur/" element={<Register />} />
            {/* Legacy routes */}
            <Route path="/Games" element={<Navigate to="/oyunlar/" replace />} />
            <Route path="/Apps" element={<Navigate to="/uygulamalar/" replace />} />
            <Route path="/Turkish-patches" element={<Navigate to="/turkce-yamalar/" replace />} />
            <Route path="/Requests" element={<Navigate to="/istekler/" replace />} />
            <Route path="/Complaints" element={<Navigate to="/sikayetler/" replace />} />
            <Route path="*" element={<Navigate to="/oyunlar/" replace />} />
          </Routes>
        </main>
        <Toaster position="top-center" />
      </div>
    </AuthProvider>
  );
}
