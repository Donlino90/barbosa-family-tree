export interface FamilyMember {
  id: string;
  name: string;
  birthDate: string;
  birthPlace?: string;
  deathDate?: string;
  photo?: string;
  generation: number;
  parents?: string[];
  spouse?: string;
  children?: string[];
  occupation?: string;
  bio?: string;
}

export interface Generation {
  number: number;
  label: string;
  members: FamilyMember[];
}
