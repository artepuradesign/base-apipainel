import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Phone, Copy } from 'lucide-react';
import { useBaseTelefone } from '@/hooks/useBaseTelefone';
import { BaseTelefone } from '@/services/baseTelefoneService';
import { toast } from "sonner";

interface TelefonesSectionProps {
  cpfId?: number;
}

const TelefonesSection: React.FC<TelefonesSectionProps> = ({ cpfId }) => {
  const { isLoading, getTelefonesByCpfId } = useBaseTelefone();
  const [telefones, setTelefones] = useState<BaseTelefone[]>([]);

  useEffect(() => {
    const loadTelefones = async () => {
      if (cpfId) {
        const result = await getTelefonesByCpfId(cpfId);
        if (result) {
          setTelefones(result);
        }
      }
    };

    loadTelefones();
  }, [cpfId, getTelefonesByCpfId]);

  const copyTelefonesData = () => {
    if (telefones.length === 0) return;
    
    const dados = telefones.map((tel, idx) => 
      `Telefone ${idx + 1}:\n` +
      `Número: ${tel.telefone || '-'}\n` +
      `Tipo: ${tel.tipo || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados dos telefones copiados!');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Phone className="h-5 w-5" />
            Telefones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            <div className="animate-spin mx-auto w-6 h-6 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
            <p className="text-sm">Carregando telefones...</p>
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
              Telefones
            </CardTitle>
            {telefones.length > 0 && (
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                {telefones.length}
              </div>
            )}
          </div>
          {telefones.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copyTelefonesData}
              className="h-8 w-8"
              title="Copiar dados da seção"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {telefones.length > 0 ? (
          <div className="space-y-4">
            {telefones.map((telefone, index) => (
              <div key={telefone.id}>
                {index > 0 && <div className="border-t pt-3"></div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`tel_${telefone.id}`}>Telefone</Label>
                    <Input
                      id={`tel_${telefone.id}`}
                      value={telefone.telefone || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`tipo_${telefone.id}`}>Tipo</Label>
                    <Input
                      id={`tipo_${telefone.id}`}
                      value={telefone.tipo || '-'}
                      disabled
                      className="bg-muted uppercase"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <Phone className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm">
              Nenhum telefone adicional encontrado para este CPF
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TelefonesSection;
