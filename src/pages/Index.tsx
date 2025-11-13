import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { familyMembers } from "@/data/familyData";
import { FamilyMember, Generation } from "@/types/family";
import { MemberCard } from "@/components/MemberCard";
import { MemberDetailsDialog } from "@/components/MemberDetailsDialog";
import { AddMemberDialog } from "@/components/AddMemberDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroTree from "@/assets/hero-tree.jpg";
import { Plus, Users, TreePine, LogIn, LayoutDashboard } from "lucide-react";

const Index = () => {
  const [members, setMembers] = useState<FamilyMember[]>(familyMembers);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const generations: Generation[] = [
    { number: 1, label: "1ª Geração - Fundadores", members: members.filter(m => m.generation === 1) },
    { number: 2, label: "2ª Geração", members: members.filter(m => m.generation === 2) },
    { number: 3, label: "3ª Geração", members: members.filter(m => m.generation === 3) },
    { number: 4, label: "4ª Geração", members: members.filter(m => m.generation === 4) },
  ].filter(g => g.members.length > 0);

  const handleMemberClick = (member: FamilyMember) => {
    setSelectedMember(member);
    setIsDetailsOpen(true);
  };

  const handleAddMember = (newMember: FamilyMember) => {
    setMembers([...members, newMember]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TreePine className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PI-Family
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")} variant="default">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            ) : (
              <Button onClick={() => navigate("/auth")} variant="default">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img 
            src={heroTree} 
            alt="Árvore Genealógica" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        </div>
        
        <div className="relative z-10 text-center space-y-6 px-4 animate-fade-in">
          <div className="flex justify-center mb-4">
            <TreePine className="w-20 h-20 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Família Barbosa
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Uma jornada através das gerações, preservando nossa história e legado
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary shadow-elegant"
              onClick={() => setIsAddOpen(true)}
            >
              <Plus className="mr-2 h-5 w-5" />
              Adicionar Membro
            </Button>
            <Button size="lg" variant="secondary">
              <Users className="mr-2 h-5 w-5" />
              {members.length} Membros
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-card/50 p-2">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              Todas as Gerações
            </TabsTrigger>
            {generations.map((gen) => (
              <TabsTrigger 
                key={gen.number} 
                value={gen.number.toString()}
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                {gen.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="space-y-12">
              {generations.map((generation) => (
                <div key={generation.number} className="animate-slide-up">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-1 flex-1 bg-gradient-primary rounded" />
                    <h2 className="text-3xl font-bold text-foreground">
                      {generation.label}
                    </h2>
                    <div className="h-1 flex-1 bg-gradient-primary rounded" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {generation.members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        onClick={() => handleMemberClick(member)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {generations.map((generation) => (
            <TabsContent key={generation.number} value={generation.number.toString()} className="mt-8">
              <div className="animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {generation.members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onClick={() => handleMemberClick(member)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <TreePine className="w-5 h-5 text-primary" />
            Árvore Genealógica da Família Barbosa - Preservando nossa história
          </p>
        </div>
      </footer>

      <MemberDetailsDialog
        member={selectedMember}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        allMembers={members}
      />

      <AddMemberDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddMember}
      />
    </div>
  );
};

export default Index;
