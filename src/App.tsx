import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AgenciaLandingPage from "@/app/demos/agencia/page";
import ClinicaLandingPage from "@/app/demos/clinica/page";
import GestaoLandingPage from "@/app/demos/gestao/page";
import EscritorioLandingPage from "@/app/demos/escritorio/page";
import LancamentoIaLandingPage from "@/app/demos/lancamento/page";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demos/agencia" element={<AgenciaLandingPage />} />
          <Route path="/demos/clinica" element={<ClinicaLandingPage />} />
          <Route path="/demos/gestao" element={<GestaoLandingPage />} />
          <Route path="/demos/escritorio" element={<EscritorioLandingPage />} />
          <Route path="/demos/lancamento" element={<LancamentoIaLandingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
