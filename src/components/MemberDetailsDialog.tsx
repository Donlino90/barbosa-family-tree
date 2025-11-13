import { FamilyMember } from "@/types/family";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Calendar, MapPin, Briefcase, Heart, Users } from "lucide-react";

interface MemberDetailsDialogProps {
  member: FamilyMember | null;
  isOpen: boolean;
  onClose: () => void;
  allMembers: FamilyMember[];
}

export const MemberDetailsDialog = ({ member, isOpen, onClose, allMembers }: MemberDetailsDialogProps) => {
  if (!member) return null;

  const getRelatives = (ids?: string[]) => {
    if (!ids) return [];
    return allMembers.filter(m => ids.includes(m.id));
  };

  const parents = getRelatives(member.parents);
  const children = getRelatives(member.children);
  const spouses = getRelatives(member.spouses);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Perfil do Membro
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden shadow-card">
              <img 
                src={member.photo || defaultAvatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{member.name}</h2>
                <Badge variant="secondary" className="text-sm">
                  {member.generation}ª Geração
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>
                    Nascimento: {new Date(member.birthDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                {member.deathDate && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>
                      Falecimento: {new Date(member.deathDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
                
                {member.birthPlace && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{member.birthPlace}</span>
                  </div>
                )}
                
                {member.occupation && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span>{member.occupation}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {member.bio && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Biografia</h3>
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            </>
          )}

          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Relações Familiares
            </h3>
            
            {spouses.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-accent" />
                  Cônjuge{spouses.length > 1 ? 's' : ''}
                </p>
                <div className="flex flex-wrap gap-2">
                  {spouses.map(spouse => (
                    <Badge key={spouse.id} variant="outline" className="text-sm">{spouse.name}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {parents.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Pais</p>
                <div className="flex flex-wrap gap-2">
                  {parents.map(parent => (
                    <Badge key={parent.id} variant="outline">{parent.name}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {children.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Filhos</p>
                <div className="flex flex-wrap gap-2">
                  {children.map(child => (
                    <Badge key={child.id} variant="outline">{child.name}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
