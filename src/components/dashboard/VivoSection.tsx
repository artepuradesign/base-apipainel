import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Copy } from 'lucide-react';
import { useBaseVivo } from '@/hooks/useBaseVivo';
import { toast } from "sonner";

interface VivoSectionProps {
  cpfId: number;
}

const VivoSection: React.FC<VivoSectionProps> = ({ cpfId }) => {
  const { getVivosByCpfId, vivos, isLoading } = useBaseVivo();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (cpfId && !dataLoaded) {
      getVivosByCpfId(cpfId).then(() => {
        setDataLoaded(true);
      });
    }
  }, [cpfId, getVivosByCpfId, dataLoaded]);

  const copyVivoData = () => {
    if (!vivos || vivos.length === 0) return;
    
    const dados = vivos.map((vivo, idx) => 
      `Vivo ${idx + 1}:\n` +
      `Nome: ${vivo.nome_assinante || '-'}\n` +
      `Telefone: ${vivo.telefone || '-'}\n` +
      `Plano: ${vivo.plano || '-'}\n` +
      `UF: ${vivo.uf || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados da Vivo copiados!');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Phone className="h-5 w-5" />
            Operadora Vivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin mx-auto w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!vivos || vivos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Phone className="h-5 w-5" />
            Operadora Vivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Phone className="h-12 w-12 text-muted-foreground mb-3" />
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
              <Phone className="h-5 w-5" />
              Operadora Vivo
            </CardTitle>
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
              {vivos.length}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyVivoData}
            className="h-8 w-8"
            title="Copiar dados da seção"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {vivos.map((vivo, index) => (
          <div key={vivo.id || index} className="space-y-4">
            {index > 0 && <div className="border-t pt-4"></div>}
            
            {/* Dados Pessoais */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-primary">Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`nome_${vivo.id}`}>Nome Assinante</Label>
                  <Input
                    id={`nome_${vivo.id}`}
                    value={vivo.nome_assinante?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`tipo_pessoa_${vivo.id}`}>Tipo Pessoa</Label>
                  <Input
                    id={`tipo_pessoa_${vivo.id}`}
                    value={vivo.tipo_pessoa?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`email_${vivo.id}`}>Email</Label>
                  <Input
                    id={`email_${vivo.id}`}
                    value={vivo.descricao_email || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>

            {/* Dados da Linha */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-primary">Dados da Linha</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`telefone_${vivo.id}`}>Telefone</Label>
                  <Input
                    id={`telefone_${vivo.id}`}
                    value={vivo.telefone || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`numero_${vivo.id}`}>Número</Label>
                  <Input
                    id={`numero_${vivo.id}`}
                    value={vivo.numero || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`telefone_anterior_${vivo.id}`}>Telefone Anterior</Label>
                  <Input
                    id={`telefone_anterior_${vivo.id}`}
                    value={vivo.telefone_anterior || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`plano_${vivo.id}`}>Plano</Label>
                  <Input
                    id={`plano_${vivo.id}`}
                    value={vivo.plano?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`descricao_produto_${vivo.id}`}>Descrição Produto</Label>
                  <Input
                    id={`descricao_produto_${vivo.id}`}
                    value={vivo.descricao_produto?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`descricao_estado_linha_${vivo.id}`}>Estado da Linha</Label>
                  <Input
                    id={`descricao_estado_linha_${vivo.id}`}
                    value={vivo.descricao_estado_linha?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`uf_${vivo.id}`}>UF</Label>
                  <Input
                    id={`uf_${vivo.id}`}
                    value={vivo.uf?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-primary">Endereço</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`tipo_endereco_${vivo.id}`}>Tipo Endereço</Label>
                  <Input
                    id={`tipo_endereco_${vivo.id}`}
                    value={vivo.tipo_endereco?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor={`endereco_${vivo.id}`}>Endereço</Label>
                  <Input
                    id={`endereco_${vivo.id}`}
                    value={vivo.endereco?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`numero_endereco_${vivo.id}`}>Número</Label>
                  <Input
                    id={`numero_endereco_${vivo.id}`}
                    value={vivo.numero_endereco || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`complemento_${vivo.id}`}>Complemento</Label>
                  <Input
                    id={`complemento_${vivo.id}`}
                    value={vivo.complemento?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`bairro_${vivo.id}`}>Bairro</Label>
                  <Input
                    id={`bairro_${vivo.id}`}
                    value={vivo.bairro?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`cep_${vivo.id}`}>CEP</Label>
                  <Input
                    id={`cep_${vivo.id}`}
                    value={vivo.cep || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>

            {/* Dados Financeiros e Datas */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-primary">Dados Financeiros e Datas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`valor_fatura_${vivo.id}`}>Valor Fatura</Label>
                  <Input
                    id={`valor_fatura_${vivo.id}`}
                    value={vivo.valor_fatura || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`flag_divida_${vivo.id}`}>Flag Dívida</Label>
                  <Input
                    id={`flag_divida_${vivo.id}`}
                    value={vivo.flag_divida?.toUpperCase() || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`maior_atraso_${vivo.id}`}>Maior Atraso</Label>
                  <Input
                    id={`maior_atraso_${vivo.id}`}
                    value={vivo.maior_atraso || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`menor_atraso_${vivo.id}`}>Menor Atraso</Label>
                  <Input
                    id={`menor_atraso_${vivo.id}`}
                    value={vivo.menor_atraso || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`ano_mes_contrato_${vivo.id}`}>Ano/Mês Contrato</Label>
                  <Input
                    id={`ano_mes_contrato_${vivo.id}`}
                    value={vivo.ano_mes_contrato || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`data_instalacao_${vivo.id}`}>Data Instalação</Label>
                  <Input
                    id={`data_instalacao_${vivo.id}`}
                    value={vivo.data_instalacao || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`data_primeira_recarga_${vivo.id}`}>Data Primeira Recarga</Label>
                  <Input
                    id={`data_primeira_recarga_${vivo.id}`}
                    value={vivo.data_primeira_recarga || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`data_ultima_recarga_${vivo.id}`}>Data Última Recarga</Label>
                  <Input
                    id={`data_ultima_recarga_${vivo.id}`}
                    value={vivo.data_ultima_recarga || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`data_vigencia_inclusao_${vivo.id}`}>Data Vigência Inclusão</Label>
                  <Input
                    id={`data_vigencia_inclusao_${vivo.id}`}
                    value={vivo.data_vigencia_inclusao || '-'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VivoSection;