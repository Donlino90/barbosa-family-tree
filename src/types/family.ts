export interface FamilyMember {
  id: string;
  name: string;
  birthDate: string;
  birthPlace?: string;
  deathDate?: string;
  photo?: string;
  generation: number;
  parents?: string[];
  spouses?: string[]; // Changed to array to support multiple spouses
  children?: string[];
  occupation?: string;
  bio?: string;
}

export interface Generation {
  number: number;
  label: string;
  members: FamilyMember[];
}
