
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Turfs from "./pages/Turfs";
import TurfDetail from "./pages/TurfDetail";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerTurfs from "./pages/owner/OwnerTurfs";
import OwnerBookings from "./pages/owner/OwnerBookings";
import OwnerSports from "./pages/owner/OwnerSports";
import BookingDetail from "./pages/owner/BookingDetail";
import AddSport from "./pages/owner/AddSport";
import SetSportPricing from "./pages/owner/SetSportPricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/turfs" element={<Turfs />} />
              <Route path="/turfs/:id" element={<TurfDetail />} />
              <Route path="/community" element={<Community />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/turfs" element={<OwnerTurfs />} />
              <Route path="/owner/bookings" element={<OwnerBookings />} />
              <Route path="/owner/bookings/:id" element={<BookingDetail />} />
              <Route path="/owner/sports" element={<OwnerSports />} />
              <Route path="/owner/sports/add" element={<AddSport />} />
              <Route path="/owner/sports/pricing/:id" element={<SetSportPricing />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
