import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inicio" element={<Index />} />
          <Route path="/sobre" element={<Index />} />
          <Route path="/horarios" element={<Index />} />
          <Route path="/horarios-fundamental" element={<Index />} />
          <Route path="/horarios-medio" element={<Index />} />
          <Route path="/vida-escolar" element={<Index />} />
          <Route path="/mural" element={<Index />} />
          <Route path="/antirracista" element={<Index />} />
          <Route path="/documentos" element={<Index />} />
          <Route path="/duvidas" element={<Index />} />
          <Route path="/contato" element={<Index />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

