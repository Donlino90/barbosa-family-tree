import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, TrendingUp, PiggyBank, Users, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [investmentBalance, setInvestmentBalance] = useState(0);
  const [familyPoolBalance, setFamilyPoolBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [accountType, setAccountType] = useState<"savings" | "investment" | "family_pool">("savings");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadFinancialData(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadFinancialData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadFinancialData = async (userId: string) => {
    // Load user accounts
    const { data: accounts } = await supabase
      .from("financial_accounts")
      .select("*")
      .eq("user_id", userId);

    if (accounts) {
      const savings = accounts.find(acc => acc.account_type === "savings");
      const investment = accounts.find(acc => acc.account_type === "investment");
      
      setSavingsBalance(savings?.balance || 0);
      setInvestmentBalance(investment?.balance || 0);
    }

    // Load family pool
    const { data: pool } = await supabase
      .from("family_pool")
      .select("total_balance")
      .single();

    if (pool) {
      setFamilyPoolBalance(pool.total_balance);
    }
  };

  const handleContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const contributionAmount = parseFloat(amount);
    if (isNaN(contributionAmount) || contributionAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, insira um valor válido."
      });
      return;
    }

    // Create transaction
    const { error: transactionError } = await supabase
      .from("transactions")
      .insert({
        from_user_id: user.id,
        to_account_type: accountType,
        amount: contributionAmount,
        description: description || `Contribuição para ${accountType === "family_pool" ? "Fundo Familiar" : accountType === "savings" ? "Poupança" : "Investimento"}`
      });

    if (transactionError) {
      toast({
        variant: "destructive",
        title: "Erro ao registrar transação",
        description: transactionError.message
      });
      return;
    }

    // Update account balance
    if (accountType !== "family_pool") {
      const { error: accountError } = await supabase
        .from("financial_accounts")
        .upsert({
          user_id: user.id,
          account_type: accountType,
          balance: accountType === "savings" ? savingsBalance + contributionAmount : investmentBalance + contributionAmount
        });

      if (accountError) {
        toast({
          variant: "destructive",
          title: "Erro ao atualizar conta",
          description: accountError.message
        });
        return;
      }
    } else {
      // Update family pool
      const { data: currentPool } = await supabase
        .from("family_pool")
        .select("id, total_balance")
        .single();

      if (currentPool) {
        await supabase
          .from("family_pool")
          .update({ total_balance: currentPool.total_balance + contributionAmount })
          .eq("id", currentPool.id);
      }
    }

    toast({
      title: "Contribuição registrada!",
      description: `R$ ${contributionAmount.toFixed(2)} adicionado com sucesso.`
    });

    // Reload data
    loadFinancialData(user.id);
    setAmount("");
    setDescription("");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            PI-Family Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Ver Árvore
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Poupança</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {savingsBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Sua poupança pessoal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investimentos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {investmentBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Seus investimentos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fundo Familiar</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {familyPoolBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Poupança compartilhada</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="contribute" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contribute">Fazer Contribuição</TabsTrigger>
            <TabsTrigger value="transactions">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="contribute" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nova Contribuição</CardTitle>
                <CardDescription>
                  Adicione fundos à sua poupança, investimentos ou ao fundo familiar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContribution} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-type">Destino</Label>
                    <Select value={accountType} onValueChange={(value: any) => setAccountType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Poupança Pessoal</SelectItem>
                        <SelectItem value="investment">Investimentos</SelectItem>
                        <SelectItem value="family_pool">Fundo Familiar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor (R$)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição (opcional)</Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Ex: Salário mensal, economia..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Registrar Contribuição
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Transações</CardTitle>
                <CardDescription>
                  Em desenvolvimento - em breve você poderá ver todas suas transações aqui
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
