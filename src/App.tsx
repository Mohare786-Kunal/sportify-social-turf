
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import TurfTimeSlots from "./pages/owner/TurfTimeSlots";
import MyBookings from "./pages/user/MyBookings";
import OwnerLayout from "./components/OwnerLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* User/Customer Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="turfs" element={<Turfs />} />
              <Route path="turfs/:id" element={<TurfDetail />} />
              <Route path="community" element={<Community />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="auth" element={<Auth />} />
            </Route>

            {/* Owner Routes */}
            <Route path="/owner" element={<OwnerLayout />}>
              <Route index element={<Navigate to="/owner/dashboard" replace />} />
              <Route path="dashboard" element={<OwnerDashboard />} />
              <Route path="turf" element={<OwnerTurfs />} />
              <Route path="bookings" element={<OwnerBookings />} />
              <Route path="bookings/:id" element={<BookingDetail />} />
              <Route path="sports" element={<OwnerSports />} />
              <Route path="sports/add" element={<AddSport />} />
              <Route path="sports/pricing/:id" element={<SetSportPricing />} />
              <Route path="timeslots" element={<TurfTimeSlots />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
