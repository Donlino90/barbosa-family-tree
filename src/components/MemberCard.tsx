import { FamilyMember } from "@/types/family";
import { Card, CardContent } from "@/components/ui/card";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Calendar, MapPin } from "lucide-react";

interface MemberCardProps {
  member: FamilyMember;
  onClick: () => void;
}

export const MemberCard = ({ member, onClick }: MemberCardProps) => {
  const getAge = (birthDate: string, deathDate?: string) => {
    const birth = new Date(birthDate);
    const end = deathDate ? new Date(deathDate) : new Date();
    const age = end.getFullYear() - birth.getFullYear();
    return age;
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-elegant border-border/50 bg-card animate-fade-in overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
        <img 
          src={member.photo || defaultAvatar}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(member.birthDate).getFullYear()}</span>
          {member.deathDate && (
            <span>- {new Date(member.deathDate).getFullYear()}</span>
          )}
          {!member.deathDate && (
            <span className="text-xs text-accent">({getAge(member.birthDate)} anos)</span>
          )}
        </div>
        {member.birthPlace && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{member.birthPlace}</span>
          </div>
        )}
        {member.occupation && (
          <p className="text-sm text-secondary font-medium">{member.occupation}</p>
        )}
      </CardContent>
    </Card>
  );
};
