import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";

const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("ruy_lgpd_accepted");
    if (!accepted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ruy_lgpd_accepted", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[80] bg-card/95 backdrop-blur-md border border-border p-5 rounded-2xl shadow-elevated flex flex-col gap-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-foreground font-display">
                Política de Privacidade & Cookies (LGPD)
              </h4>
              <p className="text-[11px] text-muted-foreground font-body leading-relaxed">
                Este portal acadêmico utiliza cookies para coletar estatísticas anônimas de acessos e garantir a segurança das sessões de login dos alunos e professores, em total conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end pt-1">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Recusar
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-[10px] hover:bg-school-red-dark transition-colors shadow-sm"
            >
              Aceitar e Prosseguir
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
