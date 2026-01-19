import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { formatPhone } from '@/utils/formatters';
import { CreateBaseTelefone } from '@/services/baseTelefoneService';
import { CreateBaseEmail } from '@/services/baseEmailService';

// Interfaces estendidas para incluir campos extras necessários na UI
interface ExtendedTelefone extends CreateBaseTelefone {
  principal?: boolean;
  ativo?: boolean;
  fonte_dados?: string;
}

interface ExtendedEmail extends CreateBaseEmail {
  pessoal?: boolean;
  score?: number;
  fonte_dados?: string;
}

interface AdditionalDataSectionProps {
  telefonesAdicionais: ExtendedTelefone[];
  setTelefonesAdicionais: (telefones: ExtendedTelefone[]) => void;
  emailsAdicionais: ExtendedEmail[];
  setEmailsAdicionais: (emails: ExtendedEmail[]) => void;
  enderecosAdicionais: Array<{
    cpf_id: number;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  }>;
  setEnderecosAdicionais: (enderecos: any[]) => void;
  emailPessoal: boolean;
  setEmailPessoal: (value: boolean) => void;
  emailScore: number;
  setEmailScore: (value: number) => void;
}

const AdditionalDataSection = ({ 
  telefonesAdicionais, 
  setTelefonesAdicionais,
  emailsAdicionais,
  setEmailsAdicionais,
  enderecosAdicionais,
  setEnderecosAdicionais,
  emailPessoal,
  setEmailPessoal,
  emailScore,
  setEmailScore
}: AdditionalDataSectionProps) => {
  const addTelefone = () => {
    const novoTelefone: ExtendedTelefone = {
      cpf_id: 0,
      telefone: '',
      tipo: 'Celular' as any,
      observacao: '',
      principal: false,
      ativo: true,
      fonte_dados: 'cadastro_manual'
    };
    setTelefonesAdicionais([...telefonesAdicionais, novoTelefone]);
  };

  const removeTelefone = (index: number) => {
    const novosTelefones = telefonesAdicionais.filter((_, i) => i !== index);
    setTelefonesAdicionais(novosTelefones);
  };

  const updateTelefone = (index: number, field: keyof ExtendedTelefone, value: any) => {
    const novosTelefones = [...telefonesAdicionais];
    novosTelefones[index] = { ...novosTelefones[index], [field]: value };
    setTelefonesAdicionais(novosTelefones);
  };

  const addEmail = () => {
    const novoEmail: ExtendedEmail = {
      cpf_id: 0,
      email: '',
      senha_email: '',
      tipo: 'Pessoal' as any,
      observacao: '',
      pessoal: true,
      score: 50,
      fonte_dados: 'cadastro_manual'
    };
    setEmailsAdicionais([...emailsAdicionais, novoEmail]);
  };

  const removeEmail = (index: number) => {
    const novosEmails = emailsAdicionais.filter((_, i) => i !== index);
    setEmailsAdicionais(novosEmails);
  };

  const updateEmail = (index: number, field: keyof ExtendedEmail, value: any) => {
    const novosEmails = [...emailsAdicionais];
    novosEmails[index] = { ...novosEmails[index], [field]: value };
    setEmailsAdicionais(novosEmails);
  };

  const addEndereco = () => {
    const novoEndereco = {
      cpf_id: 0, // Será preenchido no backend
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    };
    setEnderecosAdicionais([...enderecosAdicionais, novoEndereco]);
  };

  const removeEndereco = (index: number) => {
    const novosEnderecos = enderecosAdicionais.filter((_, i) => i !== index);
    setEnderecosAdicionais(novosEnderecos);
  };

  const updateEndereco = (index: number, field: string, value: string) => {
    const novosEnderecos = [...enderecosAdicionais];
    novosEnderecos[index] = { ...novosEnderecos[index], [field]: value };
    setEnderecosAdicionais(novosEnderecos);
  };

  return (
    <div className="space-y-6">
      {/* Telefones Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Telefones Adicionais
          </CardTitle>
          <CardDescription>
            Números de telefone extras
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {telefonesAdicionais.map((telefone, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={telefone.telefone}
                  onChange={(e) => updateTelefone(index, 'telefone', formatPhone(e.target.value))}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={telefone.tipo}
                  onValueChange={(value) => updateTelefone(index, 'tipo', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CELULAR">Celular</SelectItem>
                    <SelectItem value="RESIDENCIAL">Residencial</SelectItem>
                    <SelectItem value="COMERCIAL">Comercial</SelectItem>
                    <SelectItem value="RECADO">Recado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Principal</Label>
                <Select
                  value={telefone.principal ? 'true' : 'false'}
                  onValueChange={(value) => updateTelefone(index, 'principal', value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Ativo</Label>
                <Select
                  value={telefone.ativo ? 'true' : 'false'}
                  onValueChange={(value) => updateTelefone(index, 'ativo', value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Fonte</Label>
                <Select
                  value={telefone.fonte_dados}
                  onValueChange={(value) => updateTelefone(index, 'fonte_dados', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cadastro_manual">Manual</SelectItem>
                    <SelectItem value="api_externa">API</SelectItem>
                    <SelectItem value="importacao">Importação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeTelefone(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addTelefone}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Telefone
          </Button>
        </CardContent>
      </Card>

      {/* Emails Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Emails Adicionais
          </CardTitle>
          <CardDescription>
            Endereços de email extras
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {emailsAdicionais.map((email, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email.email}
                  onChange={(e) => updateEmail(index, 'email', e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Pessoal</Label>
                <Select
                  value={email.pessoal ? 'true' : 'false'}
                  onValueChange={(value) => updateEmail(index, 'pessoal', value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Score</Label>
                <Input
                  type="number"
                  value={email.score}
                  onChange={(e) => updateEmail(index, 'score', Number(e.target.value))}
                  placeholder="0-100"
                  min="0"
                  max="100"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Fonte</Label>
                <Select
                  value={email.fonte_dados}
                  onValueChange={(value) => updateEmail(index, 'fonte_dados', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cadastro_manual">Manual</SelectItem>
                    <SelectItem value="api_externa">API</SelectItem>
                    <SelectItem value="importacao">Importação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEmail(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addEmail}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Email
          </Button>
        </CardContent>
      </Card>

      {/* Endereços Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Endereços Adicionais
          </CardTitle>
          <CardDescription>
            Endereços extras do cadastro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {enderecosAdicionais.map((endereco, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>CEP</Label>
                  <Input
                    value={endereco.cep}
                    onChange={(e) => updateEndereco(index, 'cep', e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Logradouro</Label>
                  <Input
                    value={endereco.logradouro}
                    onChange={(e) => updateEndereco(index, 'logradouro', e.target.value)}
                    placeholder="Rua, Avenida..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Número</Label>
                  <Input
                    value={endereco.numero}
                    onChange={(e) => updateEndereco(index, 'numero', e.target.value)}
                    placeholder="123"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Complemento</Label>
                  <Input
                    value={endereco.complemento}
                    onChange={(e) => updateEndereco(index, 'complemento', e.target.value)}
                    placeholder="Apto, Bloco..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Bairro</Label>
                  <Input
                    value={endereco.bairro}
                    onChange={(e) => updateEndereco(index, 'bairro', e.target.value)}
                    placeholder="Nome do bairro"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input
                    value={endereco.cidade}
                    onChange={(e) => updateEndereco(index, 'cidade', e.target.value)}
                    placeholder="Nome da cidade"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>UF</Label>
                  <Input
                    value={endereco.uf}
                    onChange={(e) => updateEndereco(index, 'uf', e.target.value)}
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>
              </div>
              
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeEndereco(index)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remover Endereço
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addEndereco}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Endereço
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalDataSection;
