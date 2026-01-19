import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Copy } from 'lucide-react';
import { baseSenhaCpfService, BaseSenhaCpf } from '@/services/baseSenhaCpfService';
import { toast } from "sonner";

interface SenhaCpfSectionProps {
  cpfId: number;
}

const SenhaCpfSection: React.FC<SenhaCpfSectionProps> = ({ cpfId }) => {
  const [senhas, setSenhas] = useState<BaseSenhaCpf[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSenhas();
  }, [cpfId]);

  const loadSenhas = async () => {
    setLoading(true);
    try {
      const response = await baseSenhaCpfService.getByCpfId(cpfId);
      if (response.success && response.data) {
        setSenhas(response.data);
      } else {
        setSenhas([]);
      }
    } catch (error) {
      console.error('Erro ao carregar senhas de CPF:', error);
      setSenhas([]);
    } finally {
      setLoading(false);
    }
  };

  const copySenhasData = () => {
    if (senhas.length === 0) return;
    
    const dados = senhas.map((senha, idx) => 
      `Senha ${idx + 1}:\n` +
      `CPF: ${senha.cpf || '-'}\n` +
      `Senha: ${senha.senha || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Senhas de CPF copiadas!');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Shield className="h-5 w-5" />
            Senhas de CPF
          </CardTitle>
          <CardDescription>Credenciais de CPF vazadas</CardDescription>
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
              Senhas de CPF
            </CardTitle>
            {senhas.length > 0 && (
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                {senhas.length}
              </div>
            )}
          </div>
          <div>
            <CardDescription>
              {senhas.length === 0 ? '' : `${senhas.length} credencial(is) encontrada(s)`}
            </CardDescription>
          </div>
          {senhas.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copySenhasData}
              className="h-8 w-8"
              title="Copiar dados da seção"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {senhas.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <Shield className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm">Nenhuma senha de CPF vazada encontrada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {senhas.map((senha, index) => (
              <div key={senha.id}>
                {index > 0 && <div className="border-t pt-3"></div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`cpf_${senha.id}`}>CPF</Label>
                    <Input
                      id={`cpf_${senha.id}`}
                      value={senha.cpf || '-'}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`senha_${senha.id}`}>Senha</Label>
                    <Input
                      id={`senha_${senha.id}`}
                      value={senha.senha || '-'}
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

export default SenhaCpfSection;
