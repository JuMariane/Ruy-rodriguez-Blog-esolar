import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Plus, X, Image, Search, Heart, Pin, Trash2, CheckCircle2, Clock, Check, AlertCircle, Eye, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";

import projetoBanner from "@/assets/projeto-banner.jpg";
import visitaIac from "@/assets/visita-iac.jpg";
import baciaHidro from "@/assets/bacia-hidrografica.jpg";
import chiquinhaImg from "@/assets/chiquinha-gonzaga.jpg";
import teatroOriki from "@/assets/teatro-oriki.jpg";
import sambaRuy from "@/assets/samba-ruy.jpg";
import nzingaImg from "@/assets/nzinga-mbandi.jpg";

// Scraped gallery local assets
import investigacao1 from "@/assets/scraped_gallery/investigacao_1.jpg";
import investigacao2 from "@/assets/scraped_gallery/investigacao_2.jpg";
import visitaIac1 from "@/assets/scraped_gallery/visita_iac_1.jpg";
import visitaIac2 from "@/assets/scraped_gallery/visita_iac_2.jpg";
import baciaHidro1 from "@/assets/scraped_gallery/bacia_hidro_1.jpg";
import baciaHidro2 from "@/assets/scraped_gallery/bacia_hidro_2.jpg";
import baciaHidro3 from "@/assets/scraped_gallery/bacia_hidro_3.jpg";
import teatroOriki1 from "@/assets/scraped_gallery/teatro_oriki_1.png";
import teatroOriki2 from "@/assets/scraped_gallery/teatro_oriki_2.jpg";
import sambaRuy1 from "@/assets/scraped_gallery/samba_ruy_1.jpg";

import { dbService, ProjectPost } from "../lib/dbService";
import { UserType } from "./LoginModal";
import ProjectDetailsModal, { ProjectDetails } from "./ProjectDetailsModal";

const tagColors: Record<string, string> = {
  Eletivas: "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/60",
  Clubes: "bg-pink-100 text-pink-700 border border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-900/60",
  "Técnico / Novotec": "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60",
  "Ciências": "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60",
  Cultura: "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900/60",
  Recado: "bg-sky-100 text-sky-700 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/60",
};

interface MuralSectionProps {
  user: UserType | null;
  onOpenLogin: () => void;
  activeModerationTab?: "approved" | "pending";
  onModerationTabChange?: (tab: "approved" | "pending") => void;
  onPendingCountChange?: (count: number) => void;
  isCreateModalOpen?: boolean;
  onCloseCreateModal?: () => void;
}

// Helper para mascarar o e-mail do aluno (RA) para privacidade (TCC/LGPD)
const maskEmail = (emailStr?: string) => {
  if (!emailStr) return "";
  const parts = emailStr.split("@");
  if (parts.length !== 2) return emailStr;
  const username = parts[0];
  const domain = parts[1];
  
  if (domain.endsWith("al.educacao.sp.gov.br")) {
    if (username.length > 6) {
      // 0000110074650xsp -> 0000••••••xsp
      return `${username.substring(0, 4)}••••••${username.substring(username.length - 3)}@${domain}`;
    }
    return `••••••sp@${domain}`;
  }
  return emailStr;
};

const getPostImage = (post: ProjectPost): string => {
  const titleLower = (post.title || "").toLowerCase();
  if (titleLower.includes("chiquinha")) return chiquinhaImg;
  if (titleLower.includes("nzinga")) return nzingaImg;
  if (titleLower.includes("samba")) return sambaRuy;
  if (titleLower.includes("olorum") || titleLower.includes("oriki") || titleLower.includes("teatro") || titleLower.includes("máscara") || titleLower.includes("mascara")) return teatroOriki;
  if (titleLower.includes("iac") || titleLower.includes("agronômico") || titleLower.includes("agronomico")) return visitaIac;
  if (titleLower.includes("bacia") || titleLower.includes("hidrográfica") || titleLower.includes("hidrografica")) return baciaHidro;
  if (titleLower.includes("ana luiza") || titleLower.includes("virti")) return investigacao1;
  if (titleLower.includes("investigação") || titleLower.includes("investigacao") || titleLower.includes("banner") || titleLower.includes("graffiti") || titleLower.includes("maculelê") || titleLower.includes("maculele")) return projetoBanner;
  
  if (post.image && !post.image.includes("unsplash.com") && (post.image.startsWith("data:") || post.image.startsWith("blob:") || post.image.startsWith("/"))) {
    return post.image;
  }
  return projetoBanner;
};

const mapPostToDetails = (post: ProjectPost): ProjectDetails => {
  const titleLower = post.title.toLowerCase();
  const realImage = getPostImage(post);
  
  if (titleLower.includes("chiquinha")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Antirracismo",
      image: realImage,
      fullDescription: [
        "Atividade desenvolvida pelos sétimos anos da PEI Ruy Rodriguez (orientada pelo professor Márcio Pimentel Rocha) sobre a pianista e compositora Chiquinha Gonzaga, de descendência negra. Ela compôs grandes sucessos do carnaval de sua época, como \"O abre alas\".",
        "O projeto buscou discutir o protagonismo de figuras negras na história e na música brasileira, combatendo preconceitos e resgatando memórias históricas importantes.",
        "Palavras-chave: Chiquinha Gonzaga, Educação Antirracista, Escola Ruy Rodriguez, Parque Itajaí, Programa de Ensino Integral, Protagonismo Juvenil"
      ],
      videos: [
        "https://video.wordpress.com/embed/ye1erQ3v?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/qHl9b2It?cover=1&preloadContent=metadata&useAverageColor=1&hd=0"
      ],
      gallery: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2023/11/13/chiquinha-gonzaga-trilha-antirracista/"
    };
  }

  if (titleLower.includes("nzinga")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Antirracismo",
      image: nzingaImg,
      fullDescription: [
        "Atividade interdisciplinar sobre a lendária rainha guerreira Nzinga Mbandi de Matamba e Ndongo, e sua liderança na resistência contra o sistema escravocrata e a colonização portuguesa, realizada com os sétimos anos.",
        "Orientação: Professor Márcio Pimentel Rocha.",
        "Habilidade Pedagógica: EF07HI20* (Identificar e debater os costumes, traditions, formas de resistência e a organização social e política de populações de origem africana, com destaque para as lideranças femininas na luta contra o sistema colonial)."
      ],
      videos: [
        "https://video.wordpress.com/embed/PJRbuXQB?cover=1&preloadContent=metadata&useAverageColor=1&hd=0"
      ],
      gallery: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2023/11/13/chiquinha-gonzaga-trilha-antirracista/"
    };
  }
  
  if (titleLower.includes("samba")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Cultura",
      image: post.image,
      fullDescription: [
        "A escola possui instrumentos de percussão que os estudantes usam no intervalo para fazer música. No primeiro semestre, recebemos em nossa escola alguns músicos para uma roda de samba!",
        "Habilidade EM13LGG603: Expressar-se e atuar em processos de criação autorais individuais e coletivos nas diferentes linguagens artísticas (artes visuais, audiovisual, dança, música e teatro) e nas intersecções entre elas, recorrendo a referências estéticas e culturais, conhecimentos de naturezas diversas (artísticos, históricos, sociais e políticos) e experiências individuais e coletivas."
      ],
      videos: [
        "https://video.wordpress.com/embed/rS3nwkDu?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/jF7zWJw8?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/DXOoxC07?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/W1eILstP?cover=1&preloadContent=metadata&useAverageColor=1&hd=0"
      ],
      gallery: [
        sambaRuy1
      ],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2023/09/11/samba-do-ruy/"
    };
  }

  if (titleLower.includes("maculelê") || titleLower.includes("maculele") || titleLower.includes("carimbó") || titleLower.includes("carimbo") || titleLower.includes("dança") || titleLower.includes("danca")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Antirracismo",
      image: projetoBanner,
      fullDescription: [
        "Atividade prática realizada com as turmas de Ensino Fundamental sob a orientação da professora Meire. O foco esteve na dança folclórica com bastões de madeira em ritmo percussivo (Maculelê).",
        "O projeto envolveu ensaios e a encenação de peças de teatro com a temática 'Cultura em Movimento', resgatando a dança do Carimbó e encerramento com celebração coletiva no pátio escolar.",
        "Habilidades Pedagógicas: EF09AR03 (Analisar criticamente e experimentar diferentes elementos das danças afro-brasileiras) e EF09AR13 (Investigar brincadeiras, jogos, danças e lutas de matriz afro-brasileira e indígena)."
      ],
      videos: [
        "https://video.wordpress.com/embed/jkYpqBJc?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/j8T2Dmig?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/vNO3TWUy?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/dyVuFdJl?cover=1&preloadContent=metadata&useAverageColor=1&hd=0"
      ],
      gallery: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/educacao-antirracista/"
    };
  }

  if (titleLower.includes("máscara") || titleLower.includes("mascara")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Antirracismo",
      image: teatroOriki,
      fullDescription: [
        "Atividade desenvolvida com as turmas dos 6ºs anos na disciplina de História. O projeto envolveu a pesquisa histórica e a confecção prática de réplicas de máscaras tradicionais de diversas regiões africanas.",
        "Através da confecção das máscaras, os alunos exploraram os conceitos de arte de resistência, as representações religiosas e a importância do patrimônio cultural africano para a formação do povo brasileiro.",
        "Habilidades Pedagógicas: EF06HI07A (Identificar formas de resistência de diferentes povos na Antiguidade) e EF06HI16 (Reconhecer a diversidade cultural e a contribuição das matrizes africanas e indígenas para a cultura nacional)."
      ],
      videos: [
        "https://video.wordpress.com/embed/yYHsb8nh?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/cJumx77p?cover=1&preloadContent=metadata&useAverageColor=1&hd=0"
      ],
      gallery: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/educacao-antirracista/"
    };
  }

  if (titleLower.includes("propaganda") || titleLower.includes("publicitária") || titleLower.includes("publicitaria") || titleLower.includes("sabotage")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Antirracismo",
      image: sambaRuy,
      fullDescription: [
        "Projeto interdisciplinar voltado para a elaboração de campanhas publicitárias de conscientização social antirracista, orientado pelo professor Carlos Amaro.",
        "Nas produções de vídeo, os estudantes roteirizaram, atuaram e editaram comerciais contra o preconceito racial. Também prestaram homenagem especial ao rapper Sabotage, no vídeo estrelado pelo estudante Angelo explicando a militância artística do músico.",
        "Habilidade Pedagógica: EF69LP02 (Analisar e construir peças publicitárias de campanhas sociais, considerando o contexto de produção, circulação e recepção)."
      ],
      videos: [
        "https://video.wordpress.com/embed/H6P18suG?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/3i1YN88S?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/WpXLQA9b?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/fedjicvN?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/myeVGUto?cover=1&preloadContent=metadata&useAverageColor=1&hd=0",
        "https://video.wordpress.com/embed/TwD9Bqv4?cover=1&preloadContent=metadata&useAverageColor=1&hd=0"
      ],
      gallery: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/educacao-antirracista/"
    };
  }

  if (titleLower.includes("investigação") || titleLower.includes("investigacao") || titleLower.includes("banner")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Ciências",
      image: post.image,
      fullDescription: [
        "Diário de bordo: Jornada de Investigação Científica – novembro de 2025.",
        "Após a finalização do Banner que levaremos à Unicamp no dia 29 de novembro de 2025, alguns participantes da eletiva realizaram uma apresentação do trabalho para os outros estudantes e professores da escola. Uma experiência muito relevante!"
      ],
      gallery: [
        investigacao1,
        investigacao2
      ],
      videos: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2025/11/29/jornada-de-investigacao-cientifica-banner-e-apresentacao-na-escola/"
    };
  }

  if (titleLower.includes("agronômico") || titleLower.includes("agronomico") || titleLower.includes("iac")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Ciências",
      image: post.image,
      fullDescription: [
        "Diário de bordo: Jornada de Investigação Científica – outubro de 2025.",
        "No dia 17 de outubro de 2025 nossos estudantes foram visitar o Instituto Agronômico de Campinas (IAC-Apta) que estava com o projeto Portas Abertas. Além da área expositiva, mostrando os resultados das diferentes linhas de pesquisa desenvolvidas pelo IAC, nossos estudantes tiveram visita guiada nos prédios históricos, estufas, biblioteca, Pós-Graduação, jardim e laboratórios.",
        "Fotos: Gilberto Marques/SAA e professora Bianca Vasconselos."
      ],
      gallery: [
        visitaIac1,
        visitaIac2
      ],
      videos: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2025/11/29/jornada-de-investigacao-cientifica-visita-ao-instituto-agronomico/"
    };
  }

  if (titleLower.includes("bacia") || titleLower.includes("hidrográfica") || titleLower.includes("hidrografica")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Meio Ambiente",
      image: post.image,
      fullDescription: [
        "Diário de bordo: Jornada de Investigação Científica - maio de 2025.",
        "No dia 13 de maio de 2025, realizamos uma visita técnica a uma das nascentes de água do Parque Itajaí com o objetivo de coletar amostras de água para análises. Durante essa atividade, observamos de perto o caminho que a água percorre desde o ponto em que nasce até trechos onde já recebe influência da ação humana.",
        "Coletamos duas amostras distintas. A primeira foi retirada de uma corrente de água de primeira ordem, que é o nome dado ao trecho inicial de um curso d’água, onde ele ainda é bem estreito e não recebeu a junção com nenhum outro córrego. Em outras palavras, um rio ou córrego de primeira ordem é aquele que nasce diretamente da fonte — seja de uma nascente, infiltração do solo ou pequenas poças que se unem. Já a segunda amostra foi coletada mais adiante, em uma corrente de segunda ordem, que se forma quando dois cursos de primeira ordem se encontram. Nesses pontos, o volume de água geralmente é maior, e a chance de receber poluição ao longo do caminho também aumenta.",
        "A visita foi acompanhada pelos professores Carlos Henrique, Marcelo Zapparoli e Simone Bandeira, que explicaram aos estudantes o funcionamento das nascentes, a importância dos mananciais e como a qualidade da água pode variar conforme o percurso. Enquanto caminhávamos, os alunos observavam a vegetação, o solo, o relevo e faziam perguntas sobre como esses elementos influenciam o fluxo da água. Também refletiram sobre a relação entre o ambiente natural e a presença humana.",
        "Ao longo do trajeto, percebemos diversos sinais da ação humana no entorno do córrego. Observamos habitações construídas a menos de 50 metros do curso d’água, o que é um problema porque áreas próximas aos rios, chamadas de APPs (Áreas de Preservação Permanente), devem ser protegidas para evitar erosão, contaminação e assoreamento. APPs são faixas de vegetação obrigatória e servem como uma espécie de “cinturão de proteção” para a água.",
        "Também encontramos uma chácara e estábulos com animais instalados muito próximos ao córrego. A presença de animais nesse tipo de área pode representar risco ambiental, pois o esterco e a urina podem escorrer para a água, aumentando a quantidade de bactérias, nutrientes em excesso (como nitrogênio e fósforo) e até substâncias tóxicas. Isso afeta não só a vida aquática, mas também os seres humanos que utilizam essa água."
      ],
      gallery: [
        baciaHidro1,
        baciaHidro2,
        baciaHidro3
      ],
      videos: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2025/11/25/jornada-de-investigacao-cientifica-1a-visita-a-bacia-hidrografica/"
    };
  }

  if (titleLower.includes("olorum") || titleLower.includes("ayé") || titleLower.includes("oriki")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Cultura",
      image: post.image,
      fullDescription: [
        "No dia 31/08/2023 alguns de nossos estudantes (do Ensino Fundamental e do Ensino Médio) tiveram a oportunidade de assistir à peça de teatro OlorumAyé, do grupo Oriki, que reúne música, dança e atuação para contar a história da criação do mundo e da humanidade pelos Orixás. Os estudantes foram acompanhados pelas professoras Francisca, Meire, Kátia e Carol e contaram com a ajuda do coletivo Vida Nova como parceria para o transporte.",
        "Embora seja o país que mais recebeu pessoas escravizadas do continente africano em toda a história, o Brasil ainda conhece e debate pouco os costumes, tradições e mitos religiosos e culturais que chegaram ao território nacional a partir desta diáspora forçada. Uma iniciativa que envolve arte e educação e nasceu no interior de São Paulo quer mudar essa realidade, inspirada em contadores e contadoras de histórias ancestrais. O grupo Oriki, com origem em Campinas, leva aos palcos os mitos fundadores da espiritualidade afrobrasileira. Primeiro projeto da iniciativa, o espetáculo OlorumAyé reúne música, dança e atuação para contar a história da criação do mundo e da humanidade pelos Orixás. Olorum é a entidade suprema que concebeu o universo e Ayé é o planeta terra. A atriz, pesquisadora e arte-educadora Ayo Bento, idealizadora do grupo, afirma que a ideia surgiu da vontade de compartilhar uma experiência de infância: o contato com as histórias ancestrais, com origem ou influência do continente africano. As narrativas contadas pelo pai, segundo a artista, foram essenciais como referências de vida e identidade.",
        "“Eu sempre tive a cultura Iorubá no meu sangue e sempre honrei muito os meus ancestrais. Sendo uma mulher preta e descendente de pessoas africanas escravizadas, ainda assim, me sinto privilegiada. Porque meu pai sempre contou histórias de pessoas pretas, grandes, reis, rainhas, artistas. Essa vontade de contar histórias pretas começou daí.”"
      ],
      gallery: [
        teatroOriki1,
        teatroOriki2
      ],
      videos: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2023/10/24/peca-de-teatro-olorum-aye-grupo-oriki/"
    };
  }

  if (titleLower.includes("graffiti") || titleLower.includes("grafite")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Cultura",
      image: post.image,
      fullDescription: [
        "Realizado ao longo de seis meses em duas escolas estaduais de Campinas — E.E. Ruy Rodriguez e E.E. Maria Helena Antônio Cardoso —, o projeto promoveu oficinas de graffiti que combinaram prática, repertório e troca direta com artistas da cena local.",
        "Mais do que aprender técnica, os alunos ocuparam os espaços da escola com suas próprias linguagens, transformando muros em murais coletivos e vivenciando a arte urbana como expressão crítica, estética e política.",
        "O projeto proporcionou um diálogo potente entre juventude, território e cultura urbana na rede pública paulista."
      ],
      gallery: [projetoBanner],
      videos: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2026/08/13/graffiti-nas-escolas/"
    };
  }

  if (titleLower.includes("ana luiza") || titleLower.includes("virti")) {
    return {
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      description: post.description,
      tag: "Ciências",
      image: post.image,
      fullDescription: [
        "Diário de bordo: Jornada de Investigação Científica – novembro de 2025. Relatório – Eletiva de Iniciação Científica (Estudante: Ana Luiza Virti).",
        "Participar da Eletiva de Iniciação Científica foi uma experiência extremamente enriquecedora e divertida. Realizamos diferentes atividades e visitas, como a ida ao bairro Itajaí para observarmos a situação da água em um trecho do rio e compreendermos a importância do saneamento básico e preservação das matas ciliares.",
        "As coletas e análises laboratoriais permitiram compreender na prática como a pesquisa científica pode transformar e cuidar da nossa comunidade local."
      ],
      gallery: [investigacao1, investigacao2],
      videos: [],
      originalUrl: "https://escolaruyrodriguez.wordpress.com/2025/11/29/jornada-de-investigacao-cientifica-relatorio-da-estudante-ana-luiza-virti/"
    };
  }

  return {
    title: post.title,
    subtitle: post.subtitle,
    date: post.date,
    description: post.description,
    tag: post.tag,
    image: post.image,
    fullDescription: [post.description],
    videos: [],
    gallery: [],
    originalUrl: post.link && post.link !== "#" ? post.link : undefined
  };
};

const MuralSection = ({
  user,
  onOpenLogin,
  activeModerationTab: externalModerationTab,
  onModerationTabChange,
  onPendingCountChange,
  isCreateModalOpen,
  onCloseCreateModal,
}: MuralSectionProps) => {
  const [projectList, setProjectList] = useState<ProjectPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const [internalModerationTab, setInternalModerationTab] = useState<"approved" | "pending">("approved");
  const currentTab = externalModerationTab || internalModerationTab;

  const handleTabChange = (tab: "approved" | "pending") => {
    setInternalModerationTab(tab);
    onModerationTabChange?.(tab);
  };

  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ruy_mural_liked_ids");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts = await dbService.getPosts();
      setProjectList(posts);
      
      const pendingCount = posts.filter(p => p.status === "pending").length;
      onPendingCountChange?.(pendingCount);
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
      toast.error("Erro ao carregar os posts do mural.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    localStorage.setItem("ruy_mural_liked_ids", JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    const count = projectList.filter(p => p.status === "pending").length;
    onPendingCountChange?.(count);
  }, [projectList, onPendingCountChange]);

  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const isModalOpen = isCreateModalOpen !== undefined ? isCreateModalOpen : internalModalOpen;
  
  const handleCloseModal = () => {
    setInternalModalOpen(false);
    onCloseCreateModal?.();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  const [selectedTag, setSelectedTag] = useState("Eletivas");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [author, setAuthor] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        toast.error("A imagem selecionada é muito grande. Escolha uma foto com menos de 15MB.");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 450;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.6);
            setImagePreview(compressedDataUrl);
          } else {
            setImagePreview(reader.result as string);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || (!isAnonymous && !author) || !description) {
      toast.error("Por favor, preencha os campos obrigatórios (Título, " + (isAnonymous ? "" : "Autor ") + "e Descrição).");
      return;
    }

    const authorDisplayName = isAnonymous ? "Anônimo" : author;
    const isStudent = user?.id === 3;
    const postStatus = isStudent ? "pending" : "approved";

    const newPost: ProjectPost = {
      id: `custom-${Date.now()}`,
      title,
      subtitle: subtitle || authorDisplayName,
      date: isStudent ? "Aguardando Aprovação" : "Hoje",
      description,
      tag: selectedTag,
      image: imagePreview || projetoBanner,
      link: link || "#",
      likes: 0,
      authorEmail: user?.email,
      authorId: user?.id,
      authorRole: user?.roleTitle || (user?.role === "management" ? "Gestão" : "Aluno"),
      status: postStatus,
    };

    try {
      const createdPost = await dbService.createPost(newPost);
      setProjectList([createdPost, ...projectList]);

      if (isStudent) {
        toast.info("Sugestão enviada com sucesso!", {
          description: "Sua postagem entrou na fila de moderação e será avaliada por um Professor (ID 1) ou Diretor (ID 2) antes de ser publicada.",
          duration: 7000,
        });
      } else {
        toast.success("Publicação adicionada ao mural com sucesso!", {
          description: "Como moderador(a), seu conteúdo foi publicado diretamente no mural público."
        });
      }

      setTitle("");
      setSubtitle("");
      setAuthor("");
      setIsAnonymous(false);
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setLink("");
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao publicar:", error);
      toast.error("Erro ao salvar! A imagem pode ser muito pesada ou ocorreu um erro de conexão.");
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await dbService.approvePost(id);
      setProjectList(prev => prev.map(p => p.id === id ? { ...p, status: "approved", date: "Recém-Aprovado" } : p));
      toast.success("Publicação aprovada com sucesso!", {
        description: "O projeto agora está disponível publicamente para todos os visitantes e alunos no Mural."
      });
    } catch (error) {
      console.error("Erro ao aprovar:", error);
      toast.error("Erro ao aprovar publicação.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await dbService.rejectPost(id);
      setProjectList(prev => prev.filter(p => p.id !== id));
      toast.success("Solicitação recusada e removida com sucesso.");
    } catch (error) {
      console.error("Erro ao recusar:", error);
      toast.error("Erro ao remover solicitação.");
    }
  };

  const handleLike = async (id: string) => {
    const isAlreadyLiked = likedPosts.includes(id);
    const post = projectList.find(p => p.id === id);
    if (!post) return;

    let newLikes = post.likes;
    let newLikedPosts = [...likedPosts];

    if (isAlreadyLiked) {
      newLikes = Math.max(0, post.likes - 1);
      newLikedPosts = likedPosts.filter((postId) => postId !== id);
    } else {
      newLikes = post.likes + 1;
      newLikedPosts = [...likedPosts, id];
    }

    setLikedPosts(newLikedPosts);
    setProjectList(
      projectList.map((p) => p.id === id ? { ...p, likes: newLikes } : p)
    );

    try {
      await dbService.updateLikes(id, newLikes);
    } catch (error) {
      console.error("Erro ao curtir:", error);
      setLikedPosts(likedPosts);
      setProjectList(projectList);
      toast.error("Erro de conexão ao curtir publicação.");
    }
  };

  const handleDelete = async (id: string) => {
    const postToDelete = projectList.find((p) => p.id === id);
    if (!postToDelete) return;

    const canDelete =
      user?.id === 1 ||
      user?.id === 2 ||
      (user?.id === 3 && postToDelete.authorEmail === user.email);

    if (!canDelete) {
      toast.error("Você não tem permissão para excluir esta publicação.");
      return;
    }

    const prevList = [...projectList];
    setProjectList(projectList.filter((p) => p.id !== id));

    try {
      await dbService.deletePost(id);
      toast.success("Publicação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setProjectList(prevList);
      toast.error("Erro ao excluir publicação. Verifique sua conexão.");
    }
  };

  useEffect(() => {
    if (isModalOpen && user) {
      setAuthor(user.name || (user as any).nome || "Estudante");
    }
  }, [isModalOpen, user]);

  const [title, setTitle] = useState("");
  const isModerator = user?.id === 1 || user?.id === 2;

  const approvedPosts = projectList.filter(p => !p.status || p.status === "approved");
  const pendingPosts = projectList.filter(p => p.status === "pending");

  const filters = ["Todos", "Eletivas", "Clubes", "Técnico / Novotec", "Ciências", "Cultura", "Recado"];

  const filteredApprovedProjects = approvedPosts.filter((project) => {
    const matchesFilter = activeFilter === "Todos" || project.tag === activeFilter;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredPendingProjects = pendingPosts.filter((project) => {
    return (
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <section id="mural" className="py-24 bg-school-cream/35 border-y border-border/80 scroll-mt-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Mural da Comunidade & Moderação
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Projetos, Eletivas & Recados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            O nosso espaço interativo de exposição. Acompanhe os projetos das Eletivas, Clubes, Cursos Técnicos/Novotec e recados importantes.
          </p>
        </motion.div>

        {/* Board Container */}
        <div className="bg-background rounded-[2rem] p-6 md:p-10 border border-border shadow-soft relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] dark:opacity-[0.05]" />

          {/* Banner Informativo & CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-school-cream/40 border border-border/60 mb-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Pin className="w-5 h-5 text-primary rotate-45" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-base mb-1 flex items-center gap-2">
                  Espaço Colaborativo Ruy Rodriguez
                  {user && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      user.id === 1 
                        ? "bg-primary text-primary-foreground" 
                        : user.id === 2 
                        ? "bg-amber-500 text-amber-950" 
                        : "bg-emerald-600 text-white"
                    }`}>
                      ID {user.id} · {user.roleTitle}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed max-w-xl">
                  {user 
                    ? isModerator
                      ? "Você tem privilégios de moderação. Revise as solicitações pendentes enviadas pelos alunos e publique conteúdos oficiais."
                      : "Identificado como Aluno (Editor). Compartilhe seus projetos e recados! Suas postagens serão revisadas pelos professores."
                    : "Espaço restrito para alunos e gestão. Entre com seu e-mail acadêmico para publicar ou moderar postagens."}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (!user) {
                  toast.error("Acesso Restrito", {
                    description: "Por favor, faça login com seu e-mail institucional ou selecione um perfil de teste do TCC para publicar."
                  });
                  onOpenLogin();
                } else {
                  setInternalModalOpen(true);
                }
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-school-red-dark active:scale-[0.98] hover:scale-[1.02] transition-all shrink-0 shadow-hero"
            >
              <Plus className="w-4 h-4" /> {isModerator ? "Nova Publicação Oficial" : user?.id === 3 ? "Enviar Sugestão" : "Criar Publicação"}
            </button>
          </div>

          {/* Moderation Tabs Header */}
          {isModerator && (
            <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-muted/60 border border-border rounded-2xl relative z-10 w-fit max-w-full">
              <button
                type="button"
                onClick={() => handleTabChange("approved")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  currentTab === "approved"
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${currentTab === "approved" ? "text-emerald-500" : ""}`} />
                <span>Mural Público (Aprovados)</span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-foreground/70 text-[10px] font-bold">
                  {approvedPosts.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("pending")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                  currentTab === "pending"
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <Clock className={`w-4 h-4 ${currentTab === "pending" ? "text-amber-500 animate-pulse" : ""}`} />
                <span>Solicitações para Aprovação</span>
                {pendingPosts.length > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold shadow-sm animate-pulse">
                    {pendingPosts.length}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-muted text-foreground/70 text-[10px] font-bold">
                    0
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Barra de Filtros e Busca */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            {/* Categorias (Filtros) */}
            {(!isModerator || currentTab === "approved") ? (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none w-full lg:w-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                      activeFilter === filter
                        ? "bg-primary border-primary text-primary-foreground shadow-sm"
                        : "bg-muted border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
                <AlertCircle className="w-4 h-4" />
                <span>Exibindo publicações enviadas por Alunos (ID 3) aguardando sua revisão</span>
              </div>
            )}

            {/* Input de Busca */}
            <div className="relative shrink-0 w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por título, descrição ou tag..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-muted/80 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors focus:ring-1 focus:ring-primary/20"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Grid de Projetos Aprovados */}
          {(!isModerator || currentTab === "approved") && (
            <>
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 animate-fade-in">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-card rounded-2xl overflow-hidden border border-border/85 p-6 space-y-5 animate-pulse">
                      <div className="aspect-[16/10] bg-muted rounded-xl" />
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="h-3 bg-muted rounded w-1/4" />
                          <div className="h-3 bg-muted rounded w-1/5" />
                        </div>
                        <div className="h-5 bg-muted rounded w-3/4" />
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded w-full" />
                          <div className="h-3 bg-muted rounded w-5/6" />
                        </div>
                      </div>
                      <div className="h-10 bg-muted/40 rounded-xl w-full pt-4" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    <AnimatePresence mode="popLayout">
                      {filteredApprovedProjects.map((project) => {
                        const isLiked = likedPosts.includes(project.id);
                        return (
                          <motion.article
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -30 }}
                            transition={{ duration: 0.4 }}
                            className="group bg-card rounded-2xl overflow-hidden border border-border/80 hover:shadow-elevated hover:border-primary/20 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                            onClick={() => setSelectedProject(mapPostToDetails(project))}
                          >
                            <div>
                              <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                                <img
                                  src={getPostImage(project)}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm ${tagColors[project.tag] || "bg-muted text-muted-foreground"}`}>
                                    {project.tag}
                                  </span>
                                  {project.status === "approved" && project.authorRole && (
                                    <span className="text-[9px] font-extrabold bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded-full">
                                      {project.authorRole.includes("Professor") ? "Professor" : project.authorRole.includes("Diretor") ? "Diretor" : "Aluno"}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="p-6">
                                <div className="flex items-center justify-between mb-3 text-[10px] text-muted-foreground">
                                  <span className="font-semibold text-primary/80">{project.subtitle}</span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {project.date}
                                  </span>
                                </div>

                                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                  {project.title}
                                </h3>
                                <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-4">
                                  {project.description}
                                </p>
                              </div>
                            </div>

                            <div className="px-6 pb-6 pt-2 border-t border-border/30 flex items-center justify-between">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(mapPostToDetails(project));
                                }}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-school-red-dark transition-colors cursor-pointer"
                              >
                                Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                              </button>

                              <div className="flex items-center gap-2">
                                {user && (isModerator || (user.id === 3 && project.authorEmail === user.email)) && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(project.id);
                                    }}
                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    title="Excluir publicação"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLike(project.id);
                                  }}
                                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isLiked
                                      ? "bg-rose-500/10 text-rose-500"
                                      : "text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5"
                                  }`}
                                  title={isLiked ? "Descurtir" : "Curtir"}
                                >
                                  <Heart className={`w-3.5 h-3.5 transition-transform duration-250 ${isLiked ? "fill-rose-500 scale-110" : ""}`} />
                                  <span>{project.likes}</span>
                                </button>
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>

                  {filteredApprovedProjects.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 relative z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center mx-auto mb-4">
                        <Search className="w-6 h-6 text-muted-foreground/60" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-1">Nenhuma publicação encontrada</h3>
                      <p className="text-muted-foreground text-xs font-body max-w-sm mx-auto">
                        Tente ajustar os termos da pesquisa ou selecione outra categoria para ver outros posts.
                      </p>
                    </motion.div>
                  )}
                </>
              )}
            </>
          )}

          {/* Grid de Solicitações Pendentes (Exclusivo para ID 1 e ID 2 na aba Pendentes) */}
          {isModerator && currentTab === "pending" && (
            <>
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                <AnimatePresence mode="popLayout">
                  {filteredPendingProjects.map((pendingPost) => {
                    return (
                      <motion.article
                        key={pendingPost.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -30 }}
                        transition={{ duration: 0.4 }}
                        className="bg-card rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-soft flex flex-col justify-between relative group"
                      >
                        <div className="bg-amber-500 text-amber-950 px-4 py-1.5 flex items-center justify-between text-[11px] font-bold">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> Pendente de Aprovação
                          </span>
                          <span className="bg-amber-950 text-amber-100 px-2 py-0.2 rounded-full text-[9px]">
                            ID 3 · Aluno
                          </span>
                        </div>

                        <div>
                          <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                            <img
                              src={getPostImage(pendingPost)}
                              alt={pendingPost.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm ${tagColors[pendingPost.tag] || "bg-muted text-muted-foreground"}`}>
                                {pendingPost.tag}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2 text-[10px] text-muted-foreground">
                              <span className="font-semibold text-amber-600 dark:text-amber-400">
                                {pendingPost.subtitle}
                              </span>
                              {/* E-mail mascarado para não ficar legível ao público */}
                              <span className="text-[10px] font-mono text-muted-foreground" title="E-mail institucional protegido">
                                {maskEmail(pendingPost.authorEmail) || "0000••••••sp@al.educacao.sp.gov.br"}
                              </span>
                            </div>

                            <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2">
                              {pendingPost.title}
                            </h3>
                            <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-4">
                              {pendingPost.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-muted/40 border-t border-border/80 flex flex-col gap-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => handleApprove(pendingPost.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
                            >
                              <Check className="w-4 h-4" /> Aprovar Publicação
                            </button>

                            <button
                              type="button"
                              onClick={() => handleReject(pendingPost.id)}
                              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-destructive/10 hover:bg-destructive hover:text-white text-destructive font-semibold text-xs border border-destructive/20 transition-all active:scale-[0.98]"
                              title="Recusar e excluir postagem"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Recusar
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedProject(mapPostToDetails(pendingPost))}
                            className="w-full text-center text-[11px] font-semibold text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 py-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" /> Pré-visualizar conteúdo completo
                          </button>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {filteredPendingProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 p-8 rounded-3xl bg-muted/20 border border-border/60 relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-1">
                    Tudo em dia com a moderação!
                  </h3>
                  <p className="text-muted-foreground text-xs font-body max-w-md mx-auto mb-4">
                    Não há nenhuma solicitação pendente no momento. Todas as postagens enviadas pelos estudantes foram revisadas e aprovadas.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleTabChange("approved")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-school-red-dark transition-colors"
                  >
                    Ver Mural Público <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de Publicação */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-elevated relative max-h-[90vh] overflow-y-auto z-10 scrollbar-thin"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    user?.id === 1 
                      ? "bg-primary text-primary-foreground" 
                      : user?.id === 2 
                      ? "bg-amber-500 text-amber-950 font-extrabold" 
                      : "bg-emerald-600 text-white"
                  }`}>
                    {user ? `ID ${user.id} · ${user.roleTitle}` : "Visitante"}
                  </span>
                  {user?.id === 3 && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                      (Entrará em estado pendente)
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground">
                  {isModerator ? "Nova Publicação Oficial" : user?.id === 3 ? "Enviar Sugestão de Postagem" : "Nova Publicação no Mural"}
                </h3>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  {isModerator
                    ? "Como moderador(a), esta publicação será publicada diretamente no Mural da escola."
                    : "Compartilhe recados, projetos escolares ou eletivas. Seu post será revisado pelos professores antes de ser publicado."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                    Categoria / Tag
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["Eletivas", "Clubes", "Técnico / Novotec", "Ciências", "Cultura", "Recado"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTag(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedTag === t
                            ? "bg-primary border-primary text-primary-foreground shadow-sm"
                            : "bg-muted border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="author" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Autor(a) {!isAnonymous && "*"}
                      </label>
                      <label className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => {
                            setIsAnonymous(e.target.checked);
                            if (e.target.checked) setAuthor("");
                          }}
                          className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5 cursor-pointer"
                        />
                        Anônimo
                      </label>
                    </div>
                    <input
                      id="author"
                      type="text"
                      required={!isAnonymous}
                      disabled={isAnonymous}
                      value={isAnonymous ? "Anônimo" : author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder={isAnonymous ? "Seu nome será ocultado" : "Ex: João - 3º Ano B"}
                      className={`w-full px-3.5 py-2.5 text-sm border rounded-xl transition-colors focus:outline-none focus:border-primary/50 ${
                        isAnonymous 
                          ? "bg-muted/40 text-muted-foreground border-border/50 cursor-not-allowed" 
                          : "bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                      Título da Publicação *
                    </label>
                    <input
                      id="title"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Protótipo de E-commerce do Novotec"
                      className="w-full px-3.5 py-2.5 text-sm bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="subtitle" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                      Subtítulo (Opcional)
                    </label>
                    <input
                      id="subtitle"
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Ex: Trabalho de Desenvolvimento de Sistemas"
                      className="w-full px-3.5 py-2.5 text-sm bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="link" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                      Link de Acesso (Opcional)
                    </label>
                    <input
                      id="link"
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Ex: https://github.com/..."
                      className="w-full px-3.5 py-2.5 text-sm bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                    Descrição / Mensagem *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Escreva do que se trata seu projeto ou recado..."
                    className="w-full px-3.5 py-2.5 text-sm bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                    Adicionar Imagem
                  </label>
                  <div className="relative border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted transition-colors cursor-pointer min-h-[100px]">
                    {imagePreview ? (
                      <div className="relative w-full h-28 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-1 right-1 p-1 bg-background/80 text-foreground hover:bg-background rounded-full hover:scale-105 transition-all shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer py-2">
                        <Image className="w-7 h-7 text-muted-foreground mb-1" />
                        <span className="text-xs font-semibold text-foreground/80">Escolher uma foto</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">JPG, PNG (máx 15MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-school-red-dark active:scale-[0.98] transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> {user?.id === 3 ? "Enviar para Moderação" : "Publicar no Mural"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ProjectDetailsModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default MuralSection;
