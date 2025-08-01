import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Scale,
  Home,
  Upload,
  BarChart3,
  Settings,
  Sparkles,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
  { title: "Upload", url: createPageUrl("Upload"), icon: Upload },
  { title: "Analytics", url: createPageUrl("Analytics"), icon: BarChart3 },
];

const settingsNav = {
  title: "Settings", url: createPageUrl("Settings"), icon: Settings
};

const noLayoutPages = ['Landing', 'SignIn'];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (noLayoutPages.includes(currentPageName)) {
    return children;
  }
  
  const handleLogout = () => {
    // Implement logout functionality here
    navigate(createPageUrl("Landing"));
  };

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --bg-primary: #0a0a0a;
          --bg-secondary: #121212;
          --surface: #1a1a1a;
          --border-color: rgba(255, 255, 255, 0.1);
          --text-primary: #ffffff;
          --text-secondary: #a3a3a3;
          --accent: #3b82f6;
        }
        body {
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }
        .logo-gradient {
          background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .logo-bg-gradient {
          background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
        }
        /* Force sidebar dark theme */
        [data-sidebar="sidebar"] {
          background-color: #121212 !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        [data-sidebar="sidebar"] * {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-[#0a0a0a]">
        <Sidebar className="!bg-[#121212] !border-r !border-white/10 data-[sidebar=sidebar]:bg-[#121212]">
          <SidebarHeader className="p-4 border-b border-white/10 bg-[#121212]">
            <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3">
              <div className="w-9 h-9 logo-bg-gradient rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-white text-lg logo-gradient">JuriBot</h2>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="flex flex-col justify-between h-full p-2 bg-[#121212]">
            <SidebarGroup className="bg-[#121212]">
              <SidebarMenu className="bg-[#121212]">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="bg-[#121212]">
                    <SidebarMenuButton 
                      asChild 
                      className={`hover:bg-white/10 focus:bg-white/10 text-white/70 hover:text-white transition-colors duration-200 rounded-lg mb-1 bg-[#121212] ${
                        location.pathname === item.url ? 'bg-white/10 text-white' : ''
                      }`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5 bg-[#121212]">
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="bg-[#121212]">
              <SidebarMenu className="bg-[#121212]">
                <SidebarMenuItem className="bg-[#121212]">
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-white/10 focus:bg-white/10 text-white/70 hover:text-white transition-colors duration-200 rounded-lg mb-1 bg-[#121212] ${
                      location.pathname === settingsNav.url ? 'bg-white/10 text-white' : ''
                    }`}
                  >
                    <Link to={settingsNav.url} className="flex items-center gap-3 px-3 py-2.5 bg-[#121212]">
                      <settingsNav.icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{settingsNav.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem className="bg-[#121212]">
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="hover:bg-white/10 focus:bg-white/10 text-white/70 hover:text-white transition-colors duration-200 rounded-lg bg-[#121212]"
                  >
                    <div className="flex items-center gap-3 px-3 py-2.5 bg-[#121212]">
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium text-sm">Logout</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a]">
          <header className="bg-[#121212]/50 backdrop-blur-sm border-b border-white/10 px-6 py-3 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-white/10 p-2 rounded-lg text-white" />
              <h1 className="text-xl font-semibold text-white logo-gradient">JuriBot</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-4 md:p-8 bg-[#0a0a0a]">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}