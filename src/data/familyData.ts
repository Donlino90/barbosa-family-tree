import { FamilyMember } from "@/types/family";
import joaoBarbosaPhoto from "@/assets/members/joao-barbosa.jpg";
import mariaBarbosaPhoto from "@/assets/members/maria-barbosa.jpg";
import carlosBarbosaPhoto from "@/assets/members/carlos-barbosa.jpg";
import anaBarbosaPhoto from "@/assets/members/ana-barbosa.jpg";
import pedroBarbosaPhoto from "@/assets/members/pedro-barbosa.jpg";
import juliaBarbosaPhoto from "@/assets/members/julia-barbosa.jpg";

export const familyMembers: FamilyMember[] = [
  {
    id: "1",
    name: "José Barbosa",
    birthDate: "1920-03-15",
    deathDate: "1995-08-20",
    birthPlace: "São Paulo, SP",
    generation: 1,
    children: ["3", "4"],
    spouse: "2",
    occupation: "Comerciante",
    photo: joaoBarbosaPhoto,
    bio: "Fundador da família Barbosa em São Paulo. Empreendedor visionário que estabeleceu um dos primeiros comércios da região."
  },
  {
    id: "2",
    name: "Maria Silva Barbosa",
    birthDate: "1925-07-10",
    deathDate: "2000-12-05",
    birthPlace: "Rio de Janeiro, RJ",
    generation: 1,
    children: ["3", "4"],
    spouse: "1",
    occupation: "Professora",
    photo: mariaBarbosaPhoto,
    bio: "Dedicada educadora que inspirou gerações de alunos e sua própria família."
  },
  {
    id: "3",
    name: "Carlos Barbosa",
    birthDate: "1950-05-20",
    birthPlace: "São Paulo, SP",
    generation: 2,
    parents: ["1", "2"],
    children: ["5", "6"],
    spouse: "7",
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
    children: ["8"],
    occupation: "Médica",
    photo: anaBarbosaPhoto,
    bio: "Médica pediatra que dedicou sua vida ao cuidado de crianças carentes."
  },
  {
    id: "5",
    name: "Pedro Barbosa",
    birthDate: "1978-02-14",
    birthPlace: "São Paulo, SP",
    generation: 3,
    parents: ["3", "7"],
    children: ["9", "10"],
    occupation: "Advogado",
    photo: pedroBarbosaPhoto,
    bio: "Advogado especializado em direito empresarial."
  },
  {
    id: "6",
    name: "Juliana Barbosa",
    birthDate: "1980-09-05",
    birthPlace: "São Paulo, SP",
    generation: 3,
    parents: ["3", "7"],
    occupation: "Arquiteta",
    photo: juliaBarbosaPhoto,
    bio: "Arquiteta premiada com foco em sustentabilidade."
  },
  {
    id: "7",
    name: "Lucia Santos Barbosa",
    birthDate: "1953-04-18",
    birthPlace: "Belo Horizonte, MG",
    generation: 2,
    spouse: "3",
    children: ["5", "6"],
    occupation: "Dentista",
    bio: "Dentista renomada na comunidade local."
  },
  {
    id: "8",
    name: "Roberto Costa",
    birthDate: "1975-12-22",
    birthPlace: "São Paulo, SP",
    generation: 3,
    parents: ["4"],
    occupation: "Empresário",
    bio: "Empresário do ramo de tecnologia."
  },
  {
    id: "9",
    name: "Lucas Barbosa",
    birthDate: "2005-06-10",
    birthPlace: "São Paulo, SP",
    generation: 4,
    parents: ["5"],
    bio: "Estudante universitário de engenharia."
  },
  {
    id: "10",
    name: "Beatriz Barbosa",
    birthDate: "2008-03-25",
    birthPlace: "São Paulo, SP",
    generation: 4,
    parents: ["5"],
    bio: "Estudante do ensino médio, apaixonada por artes."
  }
];
