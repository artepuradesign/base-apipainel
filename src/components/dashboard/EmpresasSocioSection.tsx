import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Loader2, Copy } from 'lucide-react';
import { useBaseEmpresaSocio } from '@/hooks/useBaseEmpresaSocio';
import { BaseEmpresaSocio } from '@/services/baseEmpresaSocioService';
import { formatCpf, formatCnpj, formatDateOnly } from '@/utils/formatters';
import { toast } from "sonner";

interface EmpresasSocioSectionProps {
  cpfId: number;
}

const EmpresasSocioSection: React.FC<EmpresasSocioSectionProps> = ({ cpfId }) => {
  const [empresas, setEmpresas] = useState<BaseEmpresaSocio[]>([]);
  const [loading, setLoading] = useState(true);
  const { getEmpresasSocioByCpfId } = useBaseEmpresaSocio();

  useEffect(() => {
    loadEmpresas();
  }, [cpfId]);

  const loadEmpresas = async () => {
    setLoading(true);
    try {
      const data = await getEmpresasSocioByCpfId(cpfId);
      setEmpresas(data);
    } catch (error) {
      console.error('Erro ao carregar empresas sócio:', error);
      setEmpresas([]);
    } finally {
      setLoading(false);
    }
  };

  const copyEmpresasData = () => {
    if (empresas.length === 0) return;
    
    const dados = empresas.map((empresa, idx) => 
      `Empresa ${idx + 1}:\n` +
      `CNPJ: ${empresa.empresa_cnpj ? formatCnpj(empresa.empresa_cnpj) : '-'}\n` +
      `Nome do Sócio: ${empresa.socio_nome || '-'}\n` +
      `CPF do Sócio: ${empresa.socio_cpf ? formatCpf(empresa.socio_cpf) : '-'}\n` +
      `Qualificação: ${empresa.socio_qualificacao || '-'}\n` +
      `Data de Entrada: ${empresa.socio_data_entrada ? formatDateOnly(empresa.socio_data_entrada) : '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados das empresas copiados!');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Briefcase className="h-5 w-5" />
            Empresas como Sócio
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

  if (empresas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Briefcase className="h-5 w-5" />
            Empresas como Sócio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Nenhuma empresa encontrada</p>
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
              <Briefcase className="h-5 w-5" />
              Empresas como Sócio
            </CardTitle>
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
              {empresas.length}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyEmpresasData}
            className="h-8 w-8"
            title="Copiar dados da seção"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {empresas.map((empresa, index) => (
          <div key={empresa.id}>
            {index > 0 && <div className="border-t pt-3"></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`cnpj_${empresa.id}`}>CNPJ da Empresa</Label>
                <Input
                  id={`cnpj_${empresa.id}`}
                  value={empresa.empresa_cnpj || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`nome_${empresa.id}`}>Nome do Sócio</Label>
                <Input
                  id={`nome_${empresa.id}`}
                  value={empresa.socio_nome?.toUpperCase() || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`cpf_${empresa.id}`}>CPF do Sócio</Label>
                <Input
                  id={`cpf_${empresa.id}`}
                  value={empresa.socio_cpf || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`qualificacao_${empresa.id}`}>Qualificação</Label>
                <Input
                  id={`qualificacao_${empresa.id}`}
                  value={empresa.socio_qualificacao?.toUpperCase() || '-'}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor={`data_${empresa.id}`}>Data de Entrada</Label>
                <Input
                  id={`data_${empresa.id}`}
                  value={empresa.socio_data_entrada || '-'}
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

export default EmpresasSocioSection;
