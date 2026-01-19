import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { HandCoins, Copy } from 'lucide-react';
import { BaseAuxilioEmergencial } from '@/services/baseAuxilioEmergencialService';
import { toast } from "sonner";

interface AuxilioEmergencialSectionProps {
  auxilios: BaseAuxilioEmergencial[];
}

export const AuxilioEmergencialSection = ({ auxilios }: AuxilioEmergencialSectionProps) => {
  const copyAuxiliosData = () => {
    if (!auxilios || auxilios.length === 0) return;
    
    const dados = auxilios.map((auxilio, idx) => 
      `Auxílio ${idx + 1}:\n` +
      `UF: ${auxilio.uf || '-'}\n` +
      `Mês Disponibilização: ${auxilio.mes_disponibilizacao || '-'}\n` +
      `Enquadramento: ${auxilio.enquadramento || '-'}\n` +
      `Parcela: ${auxilio.parcela || '-'}\n` +
      `Valor Benefício: ${auxilio.valor_beneficio ? `R$ ${Number(auxilio.valor_beneficio).toFixed(2)}` : '-'}\n` +
      `Observação: ${auxilio.observacao || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados de auxílio emergencial copiados!');
  };

  if (!auxilios || auxilios.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <HandCoins className="h-5 w-5" />
            Auxílio Emergencial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <HandCoins className="h-12 w-12 mb-2 opacity-50" />
            <p className="text-sm">Nenhum auxílio emergencial encontrado</p>
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
              <HandCoins className="h-5 w-5" />
              Auxílio Emergencial
            </CardTitle>
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
              {auxilios.length}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyAuxiliosData}
            className="h-8 w-8"
            title="Copiar dados da seção"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auxilios.map((auxilio, index) => (
            <div key={auxilio.id || index}>
              {index > 0 && <div className="border-t pt-3"></div>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`uf_${auxilio.id}`}>UF</Label>
                  <Input
                    id={`uf_${auxilio.id}`}
                    value={auxilio.uf || '-'}
                    disabled
                    className="bg-muted uppercase"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`mes_${auxilio.id}`}>Mês Disponibilização</Label>
                  <Input
                    id={`mes_${auxilio.id}`}
                    value={auxilio.mes_disponibilizacao || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`enquadramento_${auxilio.id}`}>Enquadramento</Label>
                  <Input
                    id={`enquadramento_${auxilio.id}`}
                    value={auxilio.enquadramento || '-'}
                    disabled
                    className="bg-muted uppercase"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`parcela_${auxilio.id}`}>Parcela</Label>
                  <Input
                    id={`parcela_${auxilio.id}`}
                    value={auxilio.parcela || '-'}
                    disabled
                    className="bg-muted uppercase"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor={`obs_${auxilio.id}`}>Observação</Label>
                  <Input
                    id={`obs_${auxilio.id}`}
                    value={auxilio.observacao || '-'}
                    disabled
                    className="bg-muted uppercase"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor={`valor_${auxilio.id}`}>Valor Benefício</Label>
                  <Input
                    id={`valor_${auxilio.id}`}
                    value={auxilio.valor_beneficio || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
