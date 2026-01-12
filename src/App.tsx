import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Chauffeurs from "@/pages/admin/Chauffeurs";
import Vehicules from "@/pages/admin/Vehicules";
import Versements from "@/pages/admin/Versements";
import RapportsVehicules from "@/pages/admin/RapportsVehicules";
import Statistiques from "@/pages/admin/Statistiques";
import RendementChauffeurs from "@/pages/admin/RendementChauffeurs";
import AjouterVehicule from "@/pages/admin/AjouterVehicule";
import AjouterChauffeur from "@/pages/admin/AjouterChauffeur";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="chauffeurs" element={<Chauffeurs />} />
<Route path="vehicules" element={<Vehicules />} />
            <Route path="vehicules/ajouter" element={<AjouterVehicule />} />
            <Route path="chauffeurs/ajouter" element={<AjouterChauffeur />} />
            <Route path="versements" element={<Versements />} />
            <Route path="rendement-chauffeurs" element={<RendementChauffeurs />} />
            <Route path="rapports" element={<RapportsVehicules />} />
            <Route path="statistiques" element={<Statistiques />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
