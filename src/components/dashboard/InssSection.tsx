import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Copy } from 'lucide-react';
import { useBaseInss } from '@/hooks/useBaseInss';
import { BaseInss } from '@/services/baseInssService';
import { toast } from "sonner";

interface InssSectionProps {
  cpfId: number;
}

const InssSection: React.FC<InssSectionProps> = ({ cpfId }) => {
  const [inssList, setInssList] = useState<BaseInss[]>([]);
  const [loading, setLoading] = useState(true);
  const { getInssByCpfId } = useBaseInss();

  useEffect(() => {
    loadInss();
  }, [cpfId]);

  const loadInss = async () => {
    setLoading(true);
    try {
      const data = await getInssByCpfId(cpfId);
      setInssList(data);
    } catch (error) {
      console.error('Erro ao carregar dados INSS:', error);
      setInssList([]);
    } finally {
      setLoading(false);
    }
  };

  const copyInssData = () => {
    if (inssList.length === 0) return;
    
    const dados = inssList.map((inss, idx) => 
      `Benefício ${idx + 1}:\n` +
      `NB: ${inss.nb || '-'}\n` +
      `Entidade: ${inss.entidade || '-'}\n` +
      `Espécie: ${inss.especie || '-'}\n` +
      `Descrição da Espécie: ${inss.especie_descricao || '-'}\n` +
      `Valor: ${inss.valor || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados INSS copiados!');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Shield className="h-5 w-5" />
            INSS
          </CardTitle>
          <CardDescription>Dados previdenciários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            <div className="animate-spin mx-auto w-6 h-6 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
            <p className="text-sm">Carregando...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
              <Shield className="h-5 w-5" />
              INSS
            </CardTitle>
            {inssList.length > 0 && (
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                {inssList.length}
              </div>
            )}
          </div>
          {inssList.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copyInssData}
              className="h-8 w-8"
              title="Copiar dados da seção"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {inssList.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <Shield className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm">Nenhum benefício INSS encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inssList.map((inss, index) => (
              <div key={inss.id}>
                {index > 0 && <div className="border-t pt-3"></div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`nb_${inss.id}`}>NB</Label>
                    <Input
                      id={`nb_${inss.id}`}
                      value={inss.nb || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`entidade_${inss.id}`}>Entidade</Label>
                    <Input
                      id={`entidade_${inss.id}`}
                      value={inss.entidade?.toUpperCase() || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`especie_${inss.id}`}>Espécie</Label>
                    <Input
                      id={`especie_${inss.id}`}
                      value={inss.especie || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`valor_${inss.id}`}>Valor</Label>
                    <Input
                      id={`valor_${inss.id}`}
                      value={inss.valor?.toUpperCase() || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor={`descricao_${inss.id}`}>Espécie Descrição</Label>
                    <Input
                      id={`descricao_${inss.id}`}
                      value={inss.especie_descricao?.toUpperCase() || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InssSection;
