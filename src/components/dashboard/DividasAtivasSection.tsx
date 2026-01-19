import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Loader2, Copy } from 'lucide-react';
import { useBaseDividasAtivas } from '@/hooks/useBaseDividasAtivas';
import { toast } from "sonner";

interface DividasAtivasSectionProps {
  cpf: string;
}

const DividasAtivasSection: React.FC<DividasAtivasSectionProps> = ({ cpf }) => {
  const { getDividasAtivasByCpf, dividasAtivas, isLoading } = useBaseDividasAtivas();

  useEffect(() => {
    if (cpf) {
      console.log('🔄 [DIVIDAS_ATIVAS_SECTION] Buscando dados para CPF ID:', cpf);
      getDividasAtivasByCpf(cpf);
    }
  }, [cpf, getDividasAtivasByCpf]);

  console.log('🔍 [DIVIDAS_ATIVAS_SECTION] Estado atual:', {
    cpf,
    isLoading,
    dividasAtivasCount: dividasAtivas?.length || 0,
    dividasAtivas
  });

  const copyDividasData = () => {
    if (!dividasAtivas || dividasAtivas.length === 0) return;
    
    const dados = dividasAtivas.map((divida, idx) => 
      `Dívida ${idx + 1}:\n` +
      `Tipo Devedor: ${divida.tipo_devedor || '-'}\n` +
      `Nome Devedor: ${divida.nome_devedor || '-'}\n` +
      `UF: ${divida.uf_devedor || '-'}\n` +
      `Número Inscrição: ${divida.numero_inscricao || '-'}\n` +
      `Tipo Situação: ${divida.tipo_situacao_inscricao || '-'}\n` +
      `Situação: ${divida.situacao_inscricao || '-'}\n` +
      `Receita Principal: ${divida.receita_principal || '-'}\n` +
      `Data Inscrição: ${divida.data_inscricao || '-'}\n` +
      `Indicador Ajuizado: ${divida.indicador_ajuizado || '-'}\n` +
      `Valor Consolidado: ${divida.valor_consolidado ? `R$ ${Number(divida.valor_consolidado).toFixed(2)}` : '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados de dívidas ativas copiados!');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <AlertTriangle className="h-5 w-5" />
            Dívidas Ativas (SIDA)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!dividasAtivas || dividasAtivas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <AlertTriangle className="h-5 w-5" />
            Dívidas Ativas (SIDA)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Nenhum registro encontrado</p>
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
              <AlertTriangle className="h-5 w-5" />
              Dívidas Ativas (SIDA)
            </CardTitle>
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
              {dividasAtivas.length}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyDividasData}
            className="h-8 w-8"
            title="Copiar dados da seção"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {dividasAtivas.map((divida, index) => (
          <div key={divida.id || index}>
            {index > 0 && <div className="border-t pt-3"></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`tipo_devedor_${divida.id}`}>Tipo Devedor</Label>
                <Input
                  id={`tipo_devedor_${divida.id}`}
                  value={divida.tipo_devedor || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor={`nome_devedor_${divida.id}`}>Nome Devedor</Label>
                <Input
                  id={`nome_devedor_${divida.id}`}
                  value={divida.nome_devedor || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
              
              <div>
                <Label htmlFor={`uf_${divida.id}`}>UF Devedor</Label>
                <Input
                  id={`uf_${divida.id}`}
                  value={divida.uf_devedor || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
              
              <div>
                <Label htmlFor={`numero_${divida.id}`}>Número Inscrição</Label>
                <Input
                  id={`numero_${divida.id}`}
                  value={divida.numero_inscricao || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`tipo_situacao_${divida.id}`}>Tipo Situação Inscrição</Label>
                <Input
                  id={`tipo_situacao_${divida.id}`}
                  value={divida.tipo_situacao_inscricao || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
              
              <div>
                <Label htmlFor={`situacao_${divida.id}`}>Situação Inscrição</Label>
                <Input
                  id={`situacao_${divida.id}`}
                  value={divida.situacao_inscricao || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
              
              <div>
                <Label htmlFor={`receita_${divida.id}`}>Receita Principal</Label>
                <Input
                  id={`receita_${divida.id}`}
                  value={divida.receita_principal || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
              
              <div>
                <Label htmlFor={`data_${divida.id}`}>Data Inscrição</Label>
                <Input
                  id={`data_${divida.id}`}
                  value={divida.data_inscricao || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`ajuizado_${divida.id}`}>Indicador Ajuizado</Label>
                <Input
                  id={`ajuizado_${divida.id}`}
                  value={divida.indicador_ajuizado || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
              
              <div>
                <Label htmlFor={`valor_${divida.id}`}>Valor Consolidado</Label>
                <Input
                  id={`valor_${divida.id}`}
                  value={divida.valor_consolidado ? `R$ ${Number(divida.valor_consolidado).toFixed(2)}` : '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DividasAtivasSection;
