import { motion } from "framer-motion";
import { Sun, Moon, Clock, CheckCircle2, PlusCircle, ArrowRight, BookOpen } from "lucide-react";
import heroImg from "@/assets/borboleta-escola.jpg";
import { UserType } from "./LoginModal";

interface HeroSectionProps {
  user: UserType | null;
  pendingCount?: number;
  onSelectModerationTab?: (tab: "pending" | "approved") => void;
  onOpenCreatePost?: () => void;
}

const HeroSection = ({
  user,
  pendingCount = 0,
  onSelectModerationTab,
  onOpenCreatePost,
}: HeroSectionProps) => {
  const isModerator = user?.id === 1 || user?.id === 2;
  const isStudent = user?.id === 3;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const cleanId = targetId.replace(/^[#/]+/, "");
    const targetElement = document.getElementById(cleanId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${cleanId}`);
    }
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Escola Ruy Rodriguez - Jardim e Fachada"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/20" />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-left"
        >
          {/* Dynamic Badge */}
          <motion.div
            key={user ? `logged-${user.id}-${user?.name || (user as any)?.nome || "user"}` : "guest"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/95 text-primary-foreground mb-6"
          >
            {user ? (
              <>
                <BookOpen className="w-3.5 h-3.5" />
                <span>Painel do {user.roleTitle || "Usuário"}</span>
              </>
            ) : (
              <span>Escola Estadual · Integral</span>
            )}
          </motion.div>

          {/* Dynamic Main Title */}
          {isModerator ? (
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4 animate-fade-in">
              Olá, {user?.name ? user.name.split(" ")[0] : "Professor"}
              <br />
              <span className="text-xl md:text-2xl font-body font-semibold text-primary-foreground/90 block mt-2">
                Painel do {user?.roleTitle || "Professor"}
              </span>
            </h1>
          ) : isStudent ? (
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4 animate-fade-in">
              Olá, {user?.name ? user.name.split(" ")[0] : (user as any)?.nome ? (user as any).nome.split(" ")[0] : "Estudante"}
              <br />
              <span className="text-xl md:text-2xl font-body font-semibold text-primary-foreground/90 block mt-2">
                Espaço do Estudante · Editor
              </span>
            </h1>
          ) : (
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Escola Ruy
              <br />
              Rodriguez
            </h1>
          )}

          {/* Dynamic Description Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-primary-foreground/80 font-body leading-relaxed mb-4 max-w-lg"
          >
            {isModerator
              ? "Supervisione e aprove as publicações do blog enviadas pelos estudantes. Garanta a qualidade e a segurança das informações."
              : isStudent
              ? "Crie postagens sobre eletivas, clubes ou recados para o mural. Suas sugestões serão analisadas pela gestão antes da publicação oficial."
              : "Formando cidadãos críticos e profissionais qualificados através da educação, ciência e cultura."}
          </motion.p>

          {/* Courses sub-list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {["Desenvolvimento de Sistemas", "Vendas", "Administração"].map((curso) => (
              <span
                key={curso}
                className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-primary-foreground/15 text-primary-foreground/90 backdrop-blur-sm border border-primary-foreground/10"
              >
                Técnico em {curso}
              </span>
            ))}
          </motion.div>

          {/* Dynamic Action Buttons Block */}
          <motion.div
            key={user ? `buttons-${user.id}` : "guest-buttons"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {isModerator ? (
              <>
                {/* Pending Requests Button */}
                <a
                  href="#mural"
                  onClick={(e) => {
                    handleScrollTo(e, "#mural");
                    onSelectModerationTab?.("pending");
                  }}
                  className="relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-foreground font-bold text-sm transition-all shadow-hero active:scale-[0.98] hover:scale-[1.02] group cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-foreground animate-pulse" />
                  <span>Solicitações Pendentes</span>
                  {pendingCount > 0 && (
                    <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold shadow-sm animate-bounce">
                      {pendingCount}
                    </span>
                  )}
                </a>

                {/* Approved feed button */}
                <a
                  href="#mural"
                  onClick={(e) => {
                    handleScrollTo(e, "#mural");
                    onSelectModerationTab?.("approved");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all border border-white/20 active:scale-[0.98] cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mural de Aprovados
                </a>

                {/* Nova Publicação Oficial button */}
                <button
                  type="button"
                  onClick={onOpenCreatePost}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary hover:bg-school-red-dark text-primary-foreground font-bold text-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" /> Nova Publicação
                </button>
              </>
            ) : isStudent ? (
              <>
                {/* Aluno: Enviar Sugestão */}
                <button
                  type="button"
                  onClick={onOpenCreatePost}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary hover:bg-school-red-dark text-primary-foreground font-bold text-sm transition-all shadow-hero active:scale-[0.98] cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" /> Enviar Sugestão de Postagem
                </button>

                {/* Aluno: Explorar Mural */}
                <a
                  href="#mural"
                  onClick={(e) => handleScrollTo(e, "#mural")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all border border-white/20 active:scale-[0.98] cursor-pointer"
                >
                  Explorar Mural <ArrowRight className="w-4 h-4" />
                </a>
              </>
            ) : (
              <>
                {/* Guest Turn buttons */}
                <a
                  href="#horarios-fundamental"
                  onClick={(e) => handleScrollTo(e, "#horarios-fundamental")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 text-foreground font-semibold text-sm hover:bg-amber-600 transition-colors shadow-soft cursor-pointer"
                >
                  <Sun className="w-4 h-4" /> Turno Matutino - Fundamental
                </a>
                <a
                  href="#horarios-medio"
                  onClick={(e) => handleScrollTo(e, "#horarios-medio")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-school-red-dark transition-colors shadow-hero cursor-pointer"
                >
                  <Moon className="w-4 h-4" /> Turno Vespertino - Médio
                </a>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
