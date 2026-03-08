import { Toaster } from "./toaster";
import { Toaster as Sonner } from "./sonner";
import { TooltipProvider } from "./tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GharsProvider } from "@/stores/useGharsStore";
import WelcomePage from "./WelcomePage";
import SeedAnimationPage from "./SeedAnimationPage";
import HomePage from "./HomePage";
import AdhkarPage from "./AdhkarPage";
import AdhkarDetailPage from "./AdhkarDetailPage";
import DuasPage from "./DuasPage";
import DuasDeceasedPage from "./DuasDeceasedPage";
import DuasSelfPage from "./DuasSelfPage";
import RamadanPage from "./RamadanPage";
import RamadanDetailPage from "./RamadanDetailPage";
import MessagePage from "./MessagePage";
import NotFound from "./NotFound";

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
