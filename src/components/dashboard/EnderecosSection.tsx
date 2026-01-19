import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Copy } from 'lucide-react';
import { useBaseEndereco, BaseEndereco } from '@/hooks/useBaseEndereco';
import { toast } from "sonner";

interface EnderecosSectionProps {
  cpfId?: number;
}

const EnderecosSection: React.FC<EnderecosSectionProps> = ({ cpfId }) => {
  const { isLoading, getEnderecosByCpfId } = useBaseEndereco();
  const [enderecos, setEnderecos] = useState<BaseEndereco[]>([]);

  useEffect(() => {
    const loadEnderecos = async () => {
      if (cpfId) {
        const result = await getEnderecosByCpfId(cpfId);
        if (result) {
          setEnderecos(result);
        }
      }
    };

    loadEnderecos();
  }, [cpfId, getEnderecosByCpfId]);

  const copyEnderecosData = () => {
    if (enderecos.length === 0) return;
    
    const dados = enderecos.map((end, idx) => 
      `Endereço ${idx + 1}:\n` +
      `CEP: ${end.cep || '-'}\n` +
      `Logradouro: ${end.logradouro || '-'}\n` +
      `Número: ${end.numero || '-'}\n` +
      `Complemento: ${end.complemento || '-'}\n` +
      `Bairro: ${end.bairro || '-'}\n` +
      `Cidade: ${end.cidade || '-'}\n` +
      `UF: ${end.uf || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados dos endereços copiados!');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <MapPin className="h-5 w-5" />
            Endereços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            <div className="animate-spin mx-auto w-6 h-6 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
            <p className="text-sm">Carregando endereços...</p>
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
              <MapPin className="h-5 w-5" />
              Endereços
            </CardTitle>
            {enderecos.length > 0 && (
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                {enderecos.length}
              </div>
            )}
          </div>
          {enderecos.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copyEnderecosData}
              className="h-8 w-8"
              title="Copiar dados da seção"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {enderecos.length > 0 ? (
          <div className="space-y-4">
            {enderecos.map((endereco, index) => (
              <div key={endereco.id}>
                {index > 0 && <div className="border-t pt-3"></div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`cep_${endereco.id}`}>CEP</Label>
                    <Input
                      id={`cep_${endereco.id}`}
                      value={endereco.cep || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor={`logradouro_${endereco.id}`}>Logradouro</Label>
                    <Input
                      id={`logradouro_${endereco.id}`}
                      value={endereco.logradouro || ''}
                      disabled
                      className="bg-muted uppercase"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`numero_${endereco.id}`}>Número</Label>
                    <Input
                      id={`numero_${endereco.id}`}
                      value={endereco.numero || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`complemento_${endereco.id}`}>Complemento</Label>
                    <Input
                      id={`complemento_${endereco.id}`}
                      value={endereco.complemento || ''}
                      disabled
                      className="bg-muted uppercase"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`bairro_${endereco.id}`}>Bairro</Label>
                    <Input
                      id={`bairro_${endereco.id}`}
                      value={endereco.bairro || ''}
                      disabled
                      className="bg-muted uppercase"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`cidade_${endereco.id}`}>Cidade</Label>
                    <Input
                      id={`cidade_${endereco.id}`}
                      value={endereco.cidade || ''}
                      disabled
                      className="bg-muted uppercase"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`uf_${endereco.id}`}>UF</Label>
                    <Input
                      id={`uf_${endereco.id}`}
                      value={endereco.uf || ''}
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
            <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm">
              Nenhum endereço adicional encontrado para este CPF
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnderecosSection;
