import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GharsProvider } from "@/stores/useGharsStore";
import WelcomePage from "./pages/WelcomePage";
import SeedAnimationPage from "./pages/SeedAnimationPage";
import HomePage from "./pages/HomePage";
import AdhkarPage from "./pages/AdhkarPage";
import AdhkarDetailPage from "./pages/AdhkarDetailPage";
import DuasPage from "./pages/DuasPage";
import DuasDeceasedPage from "./pages/DuasDeceasedPage";
import DuasSelfPage from "./pages/DuasSelfPage";
import RamadanPage from "./pages/RamadanPage";
import RamadanDetailPage from "./pages/RamadanDetailPage";
import MessagePage from "./pages/MessagePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GharsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/seed-animation" element={<SeedAnimationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/adhkar" element={<AdhkarPage />} />
            <Route path="/adhkar/:type" element={<AdhkarDetailPage />} />
            <Route path="/duas" element={<DuasPage />} />
            <Route path="/duas/deceased" element={<DuasDeceasedPage />} />
            <Route path="/duas/self" element={<DuasSelfPage />} />
            <Route path="/ramadan" element={<RamadanPage />} />
            <Route path="/ramadan/:type" element={<RamadanDetailPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GharsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
