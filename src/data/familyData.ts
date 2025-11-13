import { FamilyMember } from "@/types/family";
import joaoBarbosaPhoto from "@/assets/members/joao-barbosa.jpg";
import mariaBarbosaPhoto from "@/assets/members/maria-barbosa.jpg";
import carlosBarbosaPhoto from "@/assets/members/carlos-barbosa.jpg";
import anaBarbosaPhoto from "@/assets/members/ana-barbosa.jpg";
import pedroBarbosaPhoto from "@/assets/members/pedro-barbosa.jpg";
import juliaBarbosaPhoto from "@/assets/members/julia-barbosa.jpg";

export const familyMembers: FamilyMember[] = [
  // Generation 1 - José Barbosa (patriarch with 3 spouses)
  {
    id: "1",
    name: "José Barbosa",
    birthDate: "1920-03-15",
    deathDate: "1995-08-20",
    birthPlace: "São Paulo, SP",
    generation: 1,
    children: ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
    spouses: ["2", "16", "17"],
    occupation: "Comerciante",
    photo: joaoBarbosaPhoto,
    bio: "Fundador da família Barbosa em São Paulo. Empreendedor visionário que estabeleceu um dos primeiros comércios da região."
  },
  
  // First spouse - Maria Silva Barbosa (9 children)
  {
    id: "2",
    name: "Maria Silva Barbosa",
    birthDate: "1925-07-10",
    deathDate: "2000-12-05",
    birthPlace: "Rio de Janeiro, RJ",
    generation: 1,
    children: ["3", "4", "5", "6", "7", "8", "9", "10", "11"],
    spouses: ["1"],
    occupation: "Professora",
    photo: mariaBarbosaPhoto,
    bio: "Dedicada educadora que inspirou gerações de alunos e sua própria família."
  },

  // Children from first marriage (9 children)
  {
    id: "3",
    name: "Carlos Barbosa",
    birthDate: "1950-05-20",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    children: ["18"],
    occupation: "Engenheiro",
    photo: carlosBarbosaPhoto,
    bio: "Engenheiro civil responsável por importantes obras de infraestrutura na cidade."
  },
  {
    id: "4",
    name: "Ana Barbosa Costa",
    birthDate: "1952-11-30",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    children: ["19"],
    occupation: "Médica",
    photo: anaBarbosaPhoto,
    bio: "Médica pediatra que dedicou sua vida ao cuidado de crianças carentes."
  },
  {
    id: "5",
    name: "Pedro Barbosa",
    birthDate: "1954-02-14",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    children: ["20", "21"],
    occupation: "Advogado",
    photo: pedroBarbosaPhoto,
    bio: "Advogado especializado em direito empresarial."
  },
  {
    id: "6",
    name: "Juliana Barbosa",
    birthDate: "1956-09-05",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    occupation: "Arquiteta",
    photo: juliaBarbosaPhoto,
    bio: "Arquiteta premiada com foco em sustentabilidade."
  },
  {
    id: "7",
    name: "Roberto Barbosa",
    birthDate: "1958-03-22",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    occupation: "Empresário",
    bio: "Empresário do ramo de tecnologia."
  },
  {
    id: "8",
    name: "Lucia Barbosa",
    birthDate: "1960-06-18",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    occupation: "Dentista",
    bio: "Dentista renomada na comunidade local."
  },
  {
    id: "9",
    name: "Fernando Barbosa",
    birthDate: "1962-08-25",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    occupation: "Professor",
    bio: "Professor universitário de matemática."
  },
  {
    id: "10",
    name: "Patricia Barbosa",
    birthDate: "1964-11-12",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    occupation: "Jornalista",
    bio: "Jornalista investigativa premiada."
  },
  {
    id: "11",
    name: "Ricardo Barbosa",
    birthDate: "1966-01-30",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    occupation: "Músico",
    bio: "Músico e compositor profissional."
  },

  // Second spouse - Helena Costa Barbosa (5 children)
  {
    id: "16",
    name: "Helena Costa Barbosa",
    birthDate: "1935-04-18",
    birthPlace: "Belo Horizonte, MG",
    generation: 1,
    spouses: ["1"],
    children: ["12", "13", "14", "15", "22"],
    occupation: "Enfermeira",
    bio: "Enfermeira dedicada que trabalhou em hospitais públicos."
  },

  // Children from second marriage (5 children)
  {
    id: "12",
    name: "Marcos Barbosa",
    birthDate: "1968-05-08",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "16"],
    occupation: "Veterinário",
    bio: "Veterinário especializado em animais silvestres."
  },
  {
    id: "13",
    name: "Cristina Barbosa",
    birthDate: "1970-07-22",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "16"],
    occupation: "Psicóloga",
    bio: "Psicóloga clínica com foco em terapia familiar."
  },
  {
    id: "14",
    name: "Rafael Barbosa",
    birthDate: "1972-09-14",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "16"],
    occupation: "Contador",
    bio: "Contador e consultor financeiro."
  },
  {
    id: "15",
    name: "Beatriz Barbosa",
    birthDate: "1974-12-03",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "16"],
    occupation: "Chef",
    bio: "Chef de cozinha renomada."
  },
  {
    id: "22",
    name: "Gabriel Barbosa",
    birthDate: "1976-03-28",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "16"],
    occupation: "Designer",
    bio: "Designer gráfico e ilustrador."
  },

  // Third spouse - Sandra Oliveira Barbosa (1 child)
  {
    id: "17",
    name: "Sandra Oliveira Barbosa",
    birthDate: "1945-09-20",
    birthPlace: "Salvador, BA",
    generation: 1,
    spouses: ["1"],
    children: ["23"],
    occupation: "Artista Plástica",
    bio: "Artista plástica com obras expostas em galerias nacionais."
  },

  // Child from third marriage (1 child)
  {
    id: "23",
    name: "Isabela Barbosa",
    birthDate: "1978-11-15",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "17"],
    occupation: "Advogada",
    bio: "Advogada especializada em direitos humanos."
  },

  // Generation 3 - Grandchildren
  {
    id: "18",
    name: "Lucas Barbosa",
    birthDate: "2005-06-10",
    birthPlace: "São Paulo, SP",
    generation: 3,
    parents: ["3"],
    bio: "Estudante universitário de engenharia."
  },
  {
    id: "19",
    name: "Beatriz Costa",
    birthDate: "2008-03-25",
    birthPlace: "São Paulo, SP",
    generation: 3,
    parents: ["4"],
    bio: "Estudante do ensino médio, apaixonada por artes."
  },
  {
    id: "20",
    name: "Miguel Barbosa",
    birthDate: "2010-08-14",
    birthPlace: "São Paulo, SP",
    generation: 3,
    parents: ["5"],
    bio: "Estudante do ensino fundamental."
  },
  {
    id: "21",
    name: "Sofia Barbosa",
    birthDate: "2012-12-20",
    birthPlace: "São Paulo, SP",
    generation: 3,
    parents: ["5"],
    bio: "Estudante do ensino fundamental."
  }
];
