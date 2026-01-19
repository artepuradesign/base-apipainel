import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Copy } from 'lucide-react';
import { useBaseClaro } from '@/hooks/useBaseClaro';
import { BaseClaro } from '@/services/baseClaroService';
import { toast } from "sonner";
import { formatPhone } from '@/utils/formatters';

interface ClaroSectionProps {
  cpfId: number;
}

const ClaroSection: React.FC<ClaroSectionProps> = ({ cpfId }) => {
  const [clarosList, setClarosList] = useState<BaseClaro[]>([]);
  const [loading, setLoading] = useState(true);
  const { getClarosByCpfId } = useBaseClaro();

  useEffect(() => {
    loadClaro();
  }, [cpfId]);

  const loadClaro = async () => {
    setLoading(true);
    try {
      const data = await getClarosByCpfId(cpfId);
      setClarosList(data);
    } catch (error) {
      console.error('Erro ao carregar dados Claro:', error);
      setClarosList([]);
    } finally {
      setLoading(false);
    }
  };

  const copyClaroData = () => {
    if (clarosList.length === 0) return;
    
    const dados = clarosList.map((claro, idx) => 
      `Registro ${idx + 1}:\n` +
      `Nome: ${claro.nome || '-'}\n` +
      `Tipo Pessoa: ${claro.pessoa || '-'}\n` +
      `Telefone: ${claro.ddd && claro.fone ? formatPhone(`${claro.ddd}${claro.fone}`) : '-'}\n` +
      `Instalação: ${claro.inst || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados Claro copiados!');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Phone className="h-5 w-5" />
            Operadora Claro
          </CardTitle>
          <CardDescription>Dados da operadora</CardDescription>
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
              <Phone className="h-5 w-5" />
              Operadora Claro
            </CardTitle>
            {clarosList.length > 0 && (
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                {clarosList.length}
              </div>
            )}
          </div>
          {clarosList.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copyClaroData}
              className="h-8 w-8"
              title="Copiar dados da seção"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {clarosList.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <Phone className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm">Nenhum registro encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {clarosList.map((claro, index) => (
              <div key={claro.id}>
                {index > 0 && <div className="border-t pt-3"></div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`nome_${claro.id}`}>Nome</Label>
                    <Input
                      id={`nome_${claro.id}`}
                      value={claro.nome?.toUpperCase() || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`pessoa_${claro.id}`}>Tipo Pessoa</Label>
                    <Input
                      id={`pessoa_${claro.id}`}
                      value={claro.pessoa?.toUpperCase() || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`telefone_${claro.id}`}>Telefone</Label>
                    <Input
                      id={`telefone_${claro.id}`}
                      value={claro.ddd && claro.fone ? formatPhone(`${claro.ddd}${claro.fone}`) : '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`inst_${claro.id}`}>Instalação</Label>
                    <Input
                      id={`inst_${claro.id}`}
                      value={claro.inst || '-'}
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

export default ClaroSection;