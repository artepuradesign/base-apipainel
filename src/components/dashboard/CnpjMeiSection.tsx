import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Loader2, Copy } from 'lucide-react';
import { useBaseCnpjMei } from '@/hooks/useBaseCnpjMei';
import { toast } from "sonner";

interface CnpjMeiSectionProps {
  cpfId: number;
}

const CnpjMeiSection: React.FC<CnpjMeiSectionProps> = ({ cpfId }) => {
  const { getCnpjMeisByCpfId, cnpjMeis, isLoading } = useBaseCnpjMei();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (cpfId && !dataLoaded) {
      getCnpjMeisByCpfId(cpfId).then(() => {
        setDataLoaded(true);
      });
    }
  }, [cpfId, getCnpjMeisByCpfId, dataLoaded]);

  const copyCnpjMeiData = () => {
    if (!cnpjMeis || cnpjMeis.length === 0) return;
    
    const dados = cnpjMeis.map((cnpj, idx) => 
      `CNPJ MEI ${idx + 1}:\n` +
      `CNPJ: ${cnpj.cnpj || '-'}\n` +
      `Razão Social: ${cnpj.razao_social || '-'}\n` +
      `Natureza Jurídica: ${cnpj.natureza_juridica || '-'}\n` +
      `Qualificação: ${cnpj.qualificacao || '-'}\n` +
      `Capital Social: ${cnpj.capital_social ? `R$ ${cnpj.capital_social}` : '-'}\n` +
      `Porte da Empresa: ${cnpj.porte_empresa || '-'}\n` +
      `Ente Federativo: ${cnpj.ente_federativo || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados de CNPJ MEI copiados!');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Building2 className="h-5 w-5" />
            CNPJ MEI
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

  if (!cnpjMeis || cnpjMeis.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Building2 className="h-5 w-5" />
            CNPJ MEI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mb-3" />
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
              <Building2 className="h-5 w-5" />
              CNPJ MEI
            </CardTitle>
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
              {cnpjMeis.length}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyCnpjMeiData}
            className="h-8 w-8"
            title="Copiar dados da seção"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cnpjMeis.map((cnpj, index) => (
          <div key={cnpj.id || index}>
            {index > 0 && <div className="border-t pt-3"></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`cnpj_${cnpj.id}`}>CNPJ</Label>
                <Input
                  id={`cnpj_${cnpj.id}`}
                  value={cnpj.cnpj || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor={`razao_${cnpj.id}`}>Razão Social</Label>
                <Input
                  id={`razao_${cnpj.id}`}
                  value={cnpj.razao_social || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
              
              <div>
                <Label htmlFor={`natureza_${cnpj.id}`}>Natureza Jurídica</Label>
                <Input
                  id={`natureza_${cnpj.id}`}
                  value={cnpj.natureza_juridica || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`qualificacao_${cnpj.id}`}>Qualificação</Label>
                <Input
                  id={`qualificacao_${cnpj.id}`}
                  value={cnpj.qualificacao || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`capital_${cnpj.id}`}>Capital Social</Label>
                <Input
                  id={`capital_${cnpj.id}`}
                  value={cnpj.capital_social || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`porte_${cnpj.id}`}>Porte Empresa</Label>
                <Input
                  id={`porte_${cnpj.id}`}
                  value={cnpj.porte_empresa || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`ente_${cnpj.id}`}>Ente Federativo Responsável</Label>
                <Input
                  id={`ente_${cnpj.id}`}
                  value={cnpj.ente_federativo || '-'}
                  disabled
                  className="bg-muted uppercase"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CnpjMeiSection;
