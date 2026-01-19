import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Copy, Download, Send, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { baseFotoService, BaseFoto } from '@/services/baseFotoService';
import { toast } from 'sonner';
import placeholderImage from '@/assets/placeholder-photo.png';
import PhotoZoomOverlay from '@/components/ui/PhotoZoomOverlay';

interface FotosSectionProps {
  cpfId: number;
  cpfNumber: string;
}

const FotosSection: React.FC<FotosSectionProps> = ({ cpfId, cpfNumber }) => {
  const [fotos, setFotos] = useState<BaseFoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFotos();
  }, [cpfId]);

  const loadFotos = async () => {
    try {
      setLoading(true);
      const response = await baseFotoService.getByCpfId(cpfId);
      
      if (response.success && response.data) {
        setFotos(response.data);
      } else {
        setFotos([]);
      }
    } catch (error) {
      console.error('Erro ao carregar fotos:', error);
      setFotos([]);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (filename: string) => {
    const f = (filename || '').trim().replace(/^\/+/, '');
    if (f.startsWith('http')) return f;
    if (f.toLowerCase().startsWith('fotos/')) return `https://api.apipainel.com.br/${f}`;
    return `https://api.apipainel.com.br/fotos/${f}`;
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL da foto copiada!');
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      toast.success('Foto baixada com sucesso!');
    } catch (error) {
      toast.error('Erro ao baixar foto');
    }
  };

  const handleShareTelegram = (url: string) => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleShareWhatsApp = (url: string) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl">
            <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
            Fotos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Carregando fotos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl">
            <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
            Fotos
          </CardTitle>
          {fotos.length > 0 && (
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
              {fotos.length}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {fotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fotos.map((foto, index) => {
              const photoUrl = getPhotoUrl(foto.photo);
              return (
                <div key={foto.id} className="relative">
                  <PhotoZoomOverlay
                    photoUrl={photoUrl}
                    alt={`Foto ${index + 1}`}
                    onCopyUrl={handleCopyUrl}
                    onDownload={handleDownload}
                    onShareTelegram={handleShareTelegram}
                    onShareWhatsApp={handleShareWhatsApp}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 border-2 cursor-pointer group">
                      <div className="relative bg-muted aspect-[3/4] flex items-center justify-center overflow-hidden">
                        <img
                          src={photoUrl}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                          onLoad={() => {
                            console.log('[FOTOS] Imagem carregada:', photoUrl);
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.warn('[FOTOS] Falha ao carregar imagem:', photoUrl);
                            target.src = placeholderImage;
                          }}
                          loading="lazy"
                        />
                        
                        {/* Action buttons overlay on thumbnail */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 bg-background/90 hover:bg-background shadow-lg"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCopyUrl(photoUrl);
                            }}
                            title="Copiar URL"
                          >
                            <Copy className="h-4 w-4 text-foreground dark:text-foreground" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 bg-background/90 hover:bg-background shadow-lg"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDownload(photoUrl, foto.photo);
                            }}
                            title="Baixar foto"
                          >
                            <Download className="h-4 w-4 text-green-600 dark:text-foreground" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 bg-background/90 hover:bg-background shadow-lg"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleShareTelegram(photoUrl);
                            }}
                            title="Compartilhar no Telegram"
                          >
                            <Send className="h-4 w-4 text-blue-500 dark:text-foreground" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 bg-background/90 hover:bg-background shadow-lg"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleShareWhatsApp(photoUrl);
                            }}
                            title="Compartilhar no WhatsApp"
                          >
                            <MessageCircle className="h-4 w-4 text-green-500 dark:text-foreground" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-2 bg-primary text-primary-foreground text-center text-sm font-medium">
                        {`Foto ${index + 1}`}
                      </div>
                    </Card>
                  </PhotoZoomOverlay>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nenhuma foto cadastrada para este CPF</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FotosSection;
