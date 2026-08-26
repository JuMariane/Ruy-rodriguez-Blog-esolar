import { useState, useEffect } from "react";
import SchoolNav from "@/components/SchoolNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SchedulesSection from "@/components/SchedulesSection";
import SchoolLifeSection from "@/components/SchoolLifeSection";
import MuralSection from "@/components/MuralSection";
import AntiracistSection from "@/components/AntiracistSection";
import DownloadsSection from "@/components/DownloadsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import SchoolFooter from "@/components/SchoolFooter";
import LoginModal, { UserType } from "@/components/LoginModal";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [activeModerationTab, setActiveModerationTab] = useState<"approved" | "pending">("approved");
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Load user from localStorage on mount and normalize
  useEffect(() => {
    const savedUser = localStorage.getItem("ruy_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === "object") {
          let id: 1 | 2 | 3 = parsed.id;
          let roleTitle: "Professor" | "Diretor" | "Aluno" = parsed.roleTitle;
          let role: "professor" | "director" | "student" | "management" = parsed.role;
          
          if (!id) {
            if (parsed.role === "management" || (parsed.email && parsed.email.includes("@professor.educacao.sp.gov.br"))) {
              id = 1;
              roleTitle = "Professor";
              role = "professor";
            } else if (parsed.email === "direcao@ruy.br") {
              id = 2;
              roleTitle = "Diretor";
              role = "director";
            } else {
              id = 3;
              roleTitle = "Aluno";
              role = "student";
            }
          }

          const normalizedUser: UserType = {
            ...parsed,
            name: parsed.name || parsed.nome || (id === 1 ? "Prof. Márcio Rocha" : id === 2 ? "Diretoria Ruy" : "Angelo Aluno"),
            id: id || 1,
            roleTitle: roleTitle || (id === 1 ? "Professor" : id === 2 ? "Diretor" : "Aluno"),
            role: role || (id === 3 ? "student" : "management"),
          };
          setUser(normalizedUser);
        }
      } catch (e) {
        console.error("Erro ao carregar usuário:", e);
      }
    }
  }, []);

  const handleLogin = (newUser: UserType) => {
    setUser(newUser);
    localStorage.setItem("ruy_user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("ruy_user");
    setActiveModerationTab("approved");
  };

  const handleSelectModerationTab = (tab: "pending" | "approved") => {
    setActiveModerationTab(tab);
    // Smooth scroll to mural
    const muralEl = document.getElementById("mural");
    if (muralEl) {
      muralEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCreatePost = () => {
    if (!user) {
      setIsLoginOpen(true);
    } else {
      setIsCreatePostModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SchoolNav 
        user={user} 
        onLogout={handleLogout} 
        onOpenLogin={() => setIsLoginOpen(true)} 
      />
      <HeroSection 
        user={user} 
        pendingCount={pendingCount} 
        onSelectModerationTab={handleSelectModerationTab}
        onOpenCreatePost={handleOpenCreatePost}
      />
      <AboutSection />
      <SchedulesSection />
      <SchoolLifeSection />
      <MuralSection 
        user={user} 
        onOpenLogin={() => setIsLoginOpen(true)} 
        activeModerationTab={activeModerationTab}
        onModerationTabChange={setActiveModerationTab}
        onPendingCountChange={setPendingCount}
        isCreateModalOpen={isCreatePostModalOpen}
        onCloseCreateModal={() => setIsCreatePostModalOpen(false)}
      />
      <AntiracistSection />
      <DownloadsSection />
      <FAQSection />
      <ContactSection />
      <SchoolFooter />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />

      <CookieConsent />
    </div>
  );
};

export default Index;
