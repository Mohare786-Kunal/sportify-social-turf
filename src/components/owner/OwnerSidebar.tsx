
import { BarChart2, Calendar, Edit, MapPin, Clock } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "../ThemeSwitcher";

const OwnerSidebar = () => {
  return (
    <Sidebar className="bg-sidebar border-r border-border shadow-lg">
      <SidebarHeader className="flex items-center justify-between px-8 py-7">
        <div className="flex items-center">
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-turfGreen bg-clip-text text-transparent font-futura">TurfBook</span>
        </div>
        <ThemeSwitcher />
      </SidebarHeader>
      <SidebarContent className="px-5">
        <SidebarMenu className="mt-4 space-y-6">
          <SidebarMenuItem className="mb-3">
            <SidebarMenuButton asChild tooltip="Dashboard" className="py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300">
              <NavLink
                to="/owner/dashboard"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary py-2 px-4 rounded-lg flex items-center" : "flex items-center px-4 py-2")}
              >
                <BarChart2 className="text-primary mr-4 h-5 w-5" />
                <span className="font-medium font-futura">Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mb-3">
            <SidebarMenuButton asChild tooltip="Turf" className="py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300">
              <NavLink
                to="/owner/turf"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary py-2 px-4 rounded-lg flex items-center" : "flex items-center px-4 py-2")}
              >
                <MapPin className="text-primary mr-4 h-5 w-5" />
                <span className="font-medium font-futura">My Turf</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mb-3">
            <SidebarMenuButton asChild tooltip="Sports" className="py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300">
              <NavLink
                to="/owner/sports"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary py-2 px-4 rounded-lg flex items-center" : "flex items-center px-4 py-2")}
              >
                <Edit className="text-primary mr-4 h-5 w-5" />
                <span className="font-medium font-futura">Sports</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mb-3">
            <SidebarMenuButton asChild tooltip="Time Slots" className="py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300">
              <NavLink
                to="/owner/timeslots"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary py-2 px-4 rounded-lg flex items-center" : "flex items-center px-4 py-2")}
              >
                <Clock className="text-primary mr-4 h-5 w-5" />
                <span className="font-medium font-futura">Time Slots</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mb-3">
            <SidebarMenuButton asChild tooltip="Bookings" className="py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300">
              <NavLink
                to="/owner/bookings"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary py-2 px-4 rounded-lg flex items-center" : "flex items-center px-4 py-2")}
              >
                <Calendar className="text-primary mr-4 h-5 w-5" />
                <span className="font-medium font-futura">Bookings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default OwnerSidebar;
