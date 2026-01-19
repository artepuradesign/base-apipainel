import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Copy } from 'lucide-react';
import { useBaseEmail } from '@/hooks/useBaseEmail';
import { BaseEmail } from '@/services/baseEmailService';
import { toast } from "sonner";

interface EmailsSectionProps {
  cpfId?: number;
}

const EmailsSection: React.FC<EmailsSectionProps> = ({ cpfId }) => {
  const { isLoading, getEmailsByCpfId } = useBaseEmail();
  const [emails, setEmails] = useState<BaseEmail[]>([]);

  useEffect(() => {
    const loadEmails = async () => {
      if (cpfId) {
        const result = await getEmailsByCpfId(cpfId);
        if (result) {
          setEmails(result);
        }
      }
    };

    loadEmails();
  }, [cpfId, getEmailsByCpfId]);

  const copyEmailsData = () => {
    if (emails.length === 0) return;
    
    const dados = emails.map((email, idx) => 
      `Email ${idx + 1}:\n` +
      `Endereço: ${email.email || '-'}\n` +
      `Tipo: ${email.tipo || '-'}\n` +
      `Observação: ${email.observacao || '-'}`
    ).join('\n\n');

    navigator.clipboard.writeText(dados);
    toast.success('Dados dos emails copiados!');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Mail className="h-5 w-5" />
            Emails
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            <div className="animate-spin mx-auto w-6 h-6 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
            <p className="text-sm">Carregando emails...</p>
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
              <Mail className="h-5 w-5" />
              Emails
            </CardTitle>
            {emails.length > 0 && (
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                {emails.length}
              </div>
            )}
          </div>
          {emails.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copyEmailsData}
              className="h-8 w-8"
              title="Copiar dados da seção"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {emails.length > 0 ? (
          <div className="space-y-4">
            {emails.map((email, index) => (
              <div key={email.id}>
                {index > 0 && <div className="border-t pt-3"></div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor={`email_${email.id}`}>Email</Label>
                    <Input
                      id={`email_${email.id}`}
                      value={email.email || ''}
                      disabled
                      className="bg-muted lowercase"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`tipo_${email.id}`}>Tipo</Label>
                    <Input
                      id={`tipo_${email.id}`}
                      value={email.tipo || ''}
                      disabled
                      className="bg-muted uppercase"
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <Label htmlFor={`obs_${email.id}`}>Observação</Label>
                    <Input
                      id={`obs_${email.id}`}
                      value={email.observacao || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <Mail className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm">
              Nenhum email adicional encontrado para este CPF
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailsSection;
