const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../ruy_escola.db');
const db = new sqlite3.Database(dbPath);

const initialPosts = [
  {
    id: "proj-0",
    title: "Graffiti nas Escolas",
    subtitle: "Arte Urbana e Protagonismo Estudantil",
    date: "Agosto 2026",
    description: "Oficinas de graffiti realizadas ao longo de seis meses em parceria com artistas da cena local de Campinas, transformando os muros da escola com arte, técnica e identidade comunitária.",
    tag: "Cultura",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/2026/08/13/graffiti-nas-escolas/",
    likes: 28,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-1",
    title: "Jornada de Investigação Científica",
    subtitle: "Apresentação e Banners na Escola",
    date: "Novembro 2025",
    description: "Estudantes apresentaram banners científicos com resultados de pesquisas sobre a qualidade da água e meio ambiente regional.",
    tag: "Ciências",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/2025/11/29/jornada-de-investigacao-cientifica-banner-e-apresentacao-na-escola/",
    likes: 19,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-1b",
    title: "Relatório Científico: Ana Luiza Virti",
    subtitle: "Diário de Bordo da Iniciação Científica",
    date: "Novembro 2025",
    description: "Relato detalhado da estudante sobre as expedições no rio do Parque Itajaí, análises de amostras e conservação ambiental.",
    tag: "Ciências",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/2025/11/29/jornada-de-investigacao-cientifica-relatorio-da-estudante-ana-luiza-virti/",
    likes: 16,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-2",
    title: "Visita ao Instituto Agronômico",
    subtitle: "IAC-Apta Portas Abertas",
    date: "Outubro 2025",
    description: "Visita técnica ao Instituto Agronômico de Campinas com apresentação de linhas de pesquisa e visitas guiadas.",
    tag: "Técnico / Novotec",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/2025/11/29/jornada-de-investigacao-cientifica-visita-ao-instituto-agronomico/",
    likes: 25,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-3",
    title: "Estudo da Bacia Hidrográfica",
    subtitle: "Visita Técnica e Análises",
    date: "Maio 2025",
    description: "Coleta e análise de amostras de água em nascentes do Parque Itajaí para verificar a qualidade hídrica regional.",
    tag: "Ciências",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/2025/11/29/jornada-de-investigacao-cientifica-segunda-visita-a-bacia-hidrografica/",
    likes: 21,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-4",
    title: "Projeto Chiquinha Gonzaga",
    subtitle: "Trilha de Educação Antirracista",
    date: "Novembro 2023",
    description: "Projeto interdisciplinar de valorização da música e cultura afro-brasileira a partir da história da compositora.",
    tag: "Eletivas",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/2023/11/13/chiquinha-gonzaga-trilha-antirracista/",
    likes: 34,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-5",
    title: "Peça Teatral Olorum Ayé",
    subtitle: "Grupo Oriki de Teatro",
    date: "Outubro 2023",
    description: "Peça de teatro auto-organizada pelos alunos celebrando a mitologia e a ancestralidade afro-brasileira.",
    tag: "Clubes",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/educacao-antirracista/",
    likes: 27,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-6",
    title: "O Samba do Ruy",
    subtitle: "Atividade de Eletiva Artística",
    date: "Setembro 2023",
    description: "Apresentação musical e debate histórico sobre o samba como patrimônio e manifestação popular brasileira.",
    tag: "Cultura",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/2023/09/11/samba-do-ruy/",
    likes: 42,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-7",
    title: "Projeto Nzinga Mbandi",
    subtitle: "Trilha de Educação Antirracista",
    date: "Novembro 2023",
    description: "Atividade interdisciplinar sobre a rainha guerreira Nzinga Mbandi e sua liderança na resistência à escravidão.",
    tag: "Eletivas",
    image: "https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/educacao-antirracista/",
    likes: 22,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor",
    status: "approved"
  },
  {
    id: "proj-8",
    title: "Maculelê e Danças Afro-Brasileiras",
    subtitle: "Cultura Popular e Movimento",
    date: "Novembro 2023",
    description: "Atividade de expressão corporal e resgate da dança folclórica Maculelê com bastões e dança do Carimbó.",
    tag: "Eletivas",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/educacao-antirracista/",
    likes: 26,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor (Moderador)",
    status: "approved"
  },
  {
    id: "proj-9",
    title: "Máscaras Africanas e Arte de Resistência",
    subtitle: "História e Resistência",
    date: "Novembro 2023",
    description: "Exposição artística com réplicas de máscaras tradicionais para discutir a religiosidade e a diversidade das culturas africanas.",
    tag: "Eletivas",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/educacao-antirracista/",
    likes: 19,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor (Moderador)",
    status: "approved"
  },
  {
    id: "proj-10",
    title: "Propaganda Publicitária Antirracista",
    subtitle: "Língua Portuguesa e Conscientização",
    date: "Novembro 2023",
    description: "Criação de propagandas publicitárias em vídeo contra o preconceito racial e homenagem ao rapper Sabotage.",
    tag: "Eletivas",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800",
    link: "https://escolaruyrodriguez.wordpress.com/educacao-antirracista/",
    likes: 31,
    author_email: "marcio.rocha@professor.educacao.sp.gov.br",
    author_id_nivel: 1,
    author_role: "Professor (Moderador)",
    status: "approved"
  },
  {
    id: "proj-pending-1",
    title: "Redesign da Biblioteca Ruy Rodriguez",
    subtitle: "Sugestão de Aluno",
    date: "Aguardando Aprovação",
    description: "Ideia para catalogar digitalmente todos os livros físicos da biblioteca em um portal de fácil busca para os estudantes.",
    tag: "Clubes",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    link: "#",
    likes: 0,
    author_email: "0000110074650xsp@al.educacao.sp.gov.br",
    author_id_nivel: 3,
    author_role: "Aluno",
    status: "pending"
  }
];

db.serialize(() => {
  db.run('DELETE FROM posts WHERE id LIKE "proj-%"', (err) => {
    if (err) {
      console.error("Erro ao limpar:", err);
      return;
    }
    const stmt = db.prepare(`INSERT OR REPLACE INTO posts 
      (id, title, subtitle, date, description, tag, image, link, likes, author_email, author_id_nivel, author_role, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    
    initialPosts.forEach((p) => {
      stmt.run([p.id, p.title, p.subtitle, p.date, p.description, p.tag, p.image, p.link, p.likes, p.author_email, p.author_id_nivel, p.author_role, p.status]);
    });
    
    stmt.finalize(() => {
      console.log(`Sucesso: ${initialPosts.length} posts oficiais do blog foram sincronizados no SQLite!`);
      db.close();
    });
  });
});
