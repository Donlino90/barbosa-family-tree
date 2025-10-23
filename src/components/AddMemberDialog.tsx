import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: any) => void;
}

export const AddMemberDialog = ({ isOpen, onClose, onAdd }: AddMemberDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthPlace: "",
    occupation: "",
    bio: "",
    generation: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.birthDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o nome e data de nascimento.",
        variant: "destructive",
      });
      return;
    }

    onAdd({
      id: Date.now().toString(),
      ...formData,
    });

    toast({
      title: "Membro adicionado!",
      description: `${formData.name} foi adicionado à árvore genealógica.`,
    });

    setFormData({
      name: "",
      birthDate: "",
      birthPlace: "",
      occupation: "",
      bio: "",
      generation: 1,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Adicionar Novo Membro
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento *</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthPlace">Local de Nascimento</Label>
              <Input
                id="birthPlace"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                placeholder="Cidade, Estado"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Profissão</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                placeholder="Profissão"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="generation">Geração</Label>
              <Input
                id="generation"
                type="number"
                min="1"
                value={formData.generation}
                onChange={(e) => setFormData({ ...formData, generation: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Escreva uma breve biografia..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              Adicionar Membro
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
