import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AnalysisProvider } from "./contexts/AnalysisContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import Education from "./pages/Education";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalysisProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/scanner" element={<Scanner />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/education" element={<Education />} />
                <Route path="/about" element={<About />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnalysisProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
