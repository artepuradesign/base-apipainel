
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTheme } from '@/components/ThemeProvider';

interface TemplatePreviewProps {
  template: 'modern' | 'corporate' | 'creative' | 'minimal' | 'elegant' | 'forest' | 'rose' | 'cosmic' | 'neon' | 'matrix';
  theme?: 'light' | 'dark';
  isSelected?: boolean;
  onClick?: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ 
  template, 
  theme = 'light', 
  isSelected = false,
  onClick 
}) => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  const getTemplateStyles = () => {
    const baseStyles = {
      container: theme === 'dark' ? 'bg-gray-900 border-gray-600' : 'bg-white border-gray-200',
      text: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
      textMuted: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      icon: theme === 'dark' ? 'text-purple-300' : 'text-purple-600',
      iconBg: theme === 'dark' ? 'bg-purple-800/60 border-purple-600/30' : 'bg-purple-100 border-purple-200',
      button: theme === 'dark' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
    };

    switch (template) {
      case 'corporate':
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gray-800 border-gray-600 shadow-lg' 
            : 'bg-white border-gray-300 shadow-md',
          layout: 'structured',
          spacing: 'compact',
          iconBg: theme === 'dark' ? 'bg-blue-900/60 border-blue-600/40' : 'bg-blue-50 border-blue-200',
          icon: theme === 'dark' ? 'text-blue-300' : 'text-blue-600',
          button: theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
        };
      
      case 'creative':
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white border border-purple-600/30 shadow-2xl' 
            : 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 text-white border-0 shadow-xl',
          layout: 'dynamic',
          spacing: 'comfortable',
          text: 'text-white',
          textMuted: theme === 'dark' ? 'text-purple-100' : 'text-white/90',
          icon: 'text-white',
          iconBg: theme === 'dark' ? 'bg-purple-700/40 backdrop-blur-sm border border-purple-400/40' : 'bg-white/20 backdrop-blur-sm border border-white/30',
          button: theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
        };
      
      case 'minimal':
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gray-850 border-gray-700 shadow-sm' 
            : 'bg-gray-50 border-gray-200 shadow-sm',
          layout: 'clean',
          spacing: 'minimal',
          iconBg: theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300',
          icon: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
          button: theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white border-gray-500' : 'bg-gray-600 hover:bg-gray-700 text-white border-gray-300'
        };
      
      case 'elegant':
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gradient-to-br from-amber-950/80 via-yellow-900/60 to-amber-900/70 border border-amber-600/30 shadow-xl' 
            : 'bg-gradient-to-br from-amber-50 via-yellow-50/80 to-amber-100/60 border border-amber-200/60 shadow-lg',
          layout: 'luxurious',
          spacing: 'spacious',
          iconBg: theme === 'dark' ? 'bg-amber-800/40 border border-amber-500/40 backdrop-blur-sm' : 'bg-amber-100/90 border border-amber-300/60',
          icon: theme === 'dark' ? 'text-amber-300' : 'text-amber-700',
          text: theme === 'dark' ? 'text-amber-100' : 'text-amber-900',
          textMuted: theme === 'dark' ? 'text-amber-200/80' : 'text-amber-800/80',
          button: theme === 'dark' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white'
        };
      
      case 'cosmic':
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gradient-to-br from-indigo-950/90 via-purple-950/80 to-blue-950/90 border border-indigo-600/40 shadow-2xl' 
            : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 border border-indigo-300/60 shadow-xl',
          layout: 'futuristic',
          spacing: 'dynamic',
          iconBg: theme === 'dark' ? 'bg-indigo-800/50 border border-indigo-400/50 backdrop-blur-sm' : 'bg-indigo-200/80 border border-indigo-400/60',
          icon: theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700',
          text: theme === 'dark' ? 'text-indigo-100' : 'text-indigo-900',
          textMuted: theme === 'dark' ? 'text-indigo-200/90' : 'text-indigo-800/90',
          button: theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        };

      case 'neon':
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gradient-to-br from-cyan-950/90 via-teal-950/80 to-emerald-950/90 border border-cyan-500/40 shadow-2xl' 
            : 'bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 border border-cyan-300/60 shadow-xl',
          layout: 'electric',
          spacing: 'vibrant',
          iconBg: theme === 'dark' ? 'bg-cyan-800/50 border border-cyan-400/50 backdrop-blur-sm' : 'bg-cyan-200/80 border border-cyan-400/60',
          icon: theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700',
          text: theme === 'dark' ? 'text-cyan-100' : 'text-cyan-900',
          textMuted: theme === 'dark' ? 'text-cyan-200/90' : 'text-cyan-800/90',
          button: theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-700 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'
        };

      case 'matrix':
        return {
          ...baseStyles,
          card: 'bg-black border border-green-400/40 shadow-2xl shadow-green-500/20',
          layout: 'digital',
          spacing: 'matrix',
          iconBg: 'bg-black border border-green-400/60 shadow-inner shadow-green-400/20',
          icon: 'text-green-400',
          text: 'text-green-400',
          textMuted: 'text-green-300/80',
          button: 'bg-black hover:bg-green-900/30 text-green-400 border border-green-400/60 shadow-lg shadow-green-400/20'
        };
      
      case 'forest':
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gradient-to-br from-green-950/80 via-emerald-900/60 to-green-900/70 border border-green-600/30 shadow-xl' 
            : 'bg-gradient-to-br from-green-50 via-emerald-50/80 to-green-100/60 border border-green-200/60 shadow-lg',
          layout: 'natural',
          spacing: 'organic',
          iconBg: theme === 'dark' ? 'bg-green-800/40 border border-green-500/40 backdrop-blur-sm' : 'bg-green-100/90 border border-green-300/60',
          icon: theme === 'dark' ? 'text-green-300' : 'text-green-700',
          text: theme === 'dark' ? 'text-green-100' : 'text-green-900',
          textMuted: theme === 'dark' ? 'text-green-200/80' : 'text-green-800/80',
          button: theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
        };
      
      
      case 'rose':
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gradient-to-br from-pink-950/80 via-fuchsia-900/60 to-pink-900/70 border border-pink-600/30 shadow-xl' 
            : 'bg-gradient-to-br from-pink-50 via-fuchsia-50/80 to-pink-100/60 border border-pink-200/60 shadow-lg',
          layout: 'romantic',
          spacing: 'delicate',
          iconBg: theme === 'dark' ? 'bg-pink-800/40 border border-pink-500/40 backdrop-blur-sm' : 'bg-pink-100/90 border border-pink-300/60',
          icon: theme === 'dark' ? 'text-pink-300' : 'text-pink-700',
          text: theme === 'dark' ? 'text-pink-100' : 'text-pink-900',
          textMuted: theme === 'dark' ? 'text-pink-200/80' : 'text-pink-800/80',
          button: theme === 'dark' ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-pink-600 hover:bg-pink-700 text-white'
        };
      
      
      default: // modern
        return {
          ...baseStyles,
          card: theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border-gray-600 shadow-lg' 
            : 'bg-gradient-to-br from-white via-purple-50/30 to-blue-50 border-purple-200 shadow-md',
          layout: 'balanced',
          spacing: 'comfortable',
          iconBg: theme === 'dark' ? 'bg-purple-800/50 border-purple-600/40' : 'bg-purple-100 border-purple-200',
          icon: theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
        };
    }
  };

  const styles = getTemplateStyles();

    return (
    <div className="w-[180px] mx-auto">
      <div className="space-y-3">
        {/* Preview Card */}
        <div 
          className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          onClick={onClick}
        >
           <Card className={`w-[180px] h-[260px] ${styles.card} transition-all duration-300 relative`}>
              {template === 'corporate' ? (
                <CardContent className="p-4 h-full flex flex-col">
                  {/* Price in top right corner */}
                  <div className="absolute top-3 right-3 text-right z-10">
                     <div className="flex flex-col space-y-1">
                       {/* Valor com desconto - sem R$ */}
                       <div className={`text-base font-bold text-green-600 dark:text-green-400`}>
                         2,00
                       </div>
                       {/* Valor original tachado */}
                       <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                         R$ 3,00
                       </div>
                       {/* Porcentagem do desconto */}
                       <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1 py-0 rounded-full text-center">
                         -33%
                       </div>
                     </div>
                  </div>
                  {/* Icon in top left corner - 3x larger */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`p-3 ${styles.iconBg} rounded-lg border`}>
                      <Package className={`h-16 w-16 ${styles.icon}`} />
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-between pt-20">
                    <div className="flex-grow">
                      <h3 className={`font-semibold text-base ${styles.text} mb-2 mt-4 truncate`}>Módulo Exemplo</h3>
                      <p className={`text-sm ${styles.textMuted} line-clamp-2 mb-2`}>
                        Descrição detalhada do módulo com mais...
                      </p>
                    </div>
                      <Button className={`w-full text-sm h-9 ${styles.button} mb-1`}>
                        Acessar
                      </Button>
                  </div>
                </CardContent>
              ) : template === 'creative' ? (
                <CardContent className="p-4 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                   {/* Price in top right corner */}
                   <div className="absolute top-3 right-3 text-right z-20">
                     <div className="flex flex-col space-y-1">
                       {/* Valor com desconto - sem R$ */}
                       <div className="text-base font-bold text-white">
                         2,00
                       </div>
                       {/* Valor original tachado */}
                       <div className="text-xs text-white/70 line-through">
                         R$ 3,00
                       </div>
                       {/* Porcentagem do desconto */}
                       <div className="text-xs bg-white/20 text-white px-1 py-0 rounded-full text-center">
                         -33%
                       </div>
                     </div>
                   </div>
                  {/* Icon in top left corner - 3x larger */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className={`p-3 ${styles.iconBg} rounded-lg`}>
                      <Package className="h-16 w-16" style={{ color: 'white' }} />
                    </div>
                  </div>
                  <div className="relative z-10 h-full flex flex-col pt-20">
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex-grow">
                        <h3 className="text-base font-bold mb-2 mt-4 truncate">Módulo Exemplo</h3>
                        <p className="text-sm text-white/90 mb-2 line-clamp-2">
                          Descrição detalhada do módulo com mais...
                        </p>
                      </div>
                        <Button className={`w-full text-sm h-9 ${styles.button} group mb-1`}>
                          <span>Acessar</span>
                          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                  </div>
                </CardContent>
              ) : template === 'minimal' ? (
                <CardContent className="p-4 h-full flex flex-col relative">
                   {/* Price in top right corner */}
                   <div className="absolute top-3 right-3 text-right z-10">
                     <div className="flex flex-col space-y-1">
                       {/* Valor com desconto - sem R$ */}
                       <div className={`text-base font-bold text-green-600 dark:text-green-400`}>
                         2,00
                       </div>
                       {/* Valor original tachado */}
                       <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                         R$ 3,00
                       </div>
                       {/* Porcentagem do desconto */}
                       <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1 py-0 rounded-full text-center">
                         -33%
                       </div>
                     </div>
                   </div>
                  {/* Icon in top left corner - 3x larger */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`p-3 ${styles.iconBg} rounded-lg border`}>
                      <Package className={`h-16 w-16 ${styles.icon}`} />
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-between pt-20">
                    <div className="flex-grow">
                      <h3 className={`font-semibold text-base ${styles.text} mb-2 mt-4 truncate`}>Módulo Exemplo</h3>
                      <p className={`text-sm ${styles.textMuted} line-clamp-2 mb-2`}>
                        Descrição detalhada do módulo com mais...
                      </p>
                    </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={`w-full text-sm h-9 mb-1 ${styles.button}`}
                      >
                       Acessar
                     </Button>
                  </div>
                </CardContent>
              ) : template === 'elegant' ? (
                <CardContent className="p-4 h-full flex flex-col relative overflow-hidden">
                  {/* Elegant overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                  
                   {/* Price in top right corner */}
                   <div className="absolute top-3 right-3 text-right z-20">
                     <div className="flex flex-col space-y-1">
                       {/* Valor com desconto - sem R$ */}
                       <div className={`text-base font-bold ${styles.icon}`}>
                         2,00
                       </div>
                       {/* Valor original tachado */}
                       <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                         R$ 3,00
                       </div>
                       {/* Porcentagem do desconto */}
                       <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1 py-0 rounded-full text-center">
                         -33%
                       </div>
                     </div>
                   </div>
                  
                  {/* Icon in top left corner */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className={`p-3 ${styles.iconBg} rounded-xl`}>
                      <Package className={`h-16 w-16 ${styles.icon}`} />
                    </div>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col pt-20">
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex-grow">
                        <h3 className={`font-semibold text-base ${styles.text} mb-2 mt-4 truncate`}>
                          Módulo Exemplo
                        </h3>
                        <p className={`text-sm ${styles.textMuted} line-clamp-2 mb-2`}>
                          Descrição detalhada do módulo com mais...
                        </p>
                      </div>
                      <Button className={`w-full text-sm h-9 ${styles.button} mb-1`}>
                         Acessar
                       </Button>
                    </div>
                  </div>
                </CardContent>
              ) : template === 'matrix' ? (
                <CardContent className="p-4 h-full flex flex-col relative overflow-hidden font-mono bg-black">
                  {/* Matrix digital rain effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
                  
                   {/* Price in top right corner - Matrix style */}
                   <div className="absolute top-3 right-3 text-right z-20">
                     <div className="flex flex-col space-y-1">
                       {/* Valor com desconto - sem R$ */}
                       <div className="text-base font-bold text-green-400 font-mono">
                         2.00
                       </div>
                       {/* Valor original tachado */}
                       <div className="text-xs text-green-300/70 line-through font-mono">
                         R$ 3.00
                       </div>
                       {/* Porcentagem do desconto */}
                       <div className="text-xs bg-green-400/20 text-green-400 px-1 py-0 rounded text-center font-mono">
                         -33%
                       </div>
                     </div>
                   </div>
                  
                  {/* Icon in top left corner - Matrix style */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className={`p-3 ${styles.iconBg} rounded border font-mono`}>
                      <Package className={`h-16 w-16 ${styles.icon}`} />
                    </div>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col pt-20">
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex-grow">
                        <h3 className={`font-semibold text-base ${styles.text} mb-2 mt-4 truncate font-mono`}>
                          MÓDULO_EX.EXE
                        </h3>
                        <p className={`text-sm ${styles.textMuted} line-clamp-2 mb-2 font-mono`}>
                          // Sistema de consulta avançado...
                        </p>
                      </div>
                        <Button className={`w-full text-sm h-9 ${styles.button} mb-1 font-mono`}>
                         {'>'} ACESSAR
                       </Button>
                    </div>
                  </div>
                </CardContent>
              ) : ['forest', 'rose', 'cosmic', 'neon'].includes(template) ? (
                <CardContent className="p-4 h-full flex flex-col relative overflow-hidden">
                  {/* Colorful overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                  
                   {/* Price in top right corner */}
                   <div className="absolute top-3 right-3 text-right z-20">
                     <div className="flex flex-col space-y-1">
                       {/* Valor com desconto - sem R$ */}
                       <div className={`text-base font-bold ${styles.icon}`}>
                         2,00
                       </div>
                       {/* Valor original tachado */}
                       <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                         R$ 3,00
                       </div>
                       {/* Porcentagem do desconto */}
                       <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1 py-0 rounded-full text-center">
                         -33%
                       </div>
                     </div>
                   </div>
                  
                  {/* Icon in top left corner */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className={`p-3 ${styles.iconBg} rounded-xl`}>
                      <Package className={`h-16 w-16 ${styles.icon}`} />
                    </div>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col pt-20">
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex-grow">
                        <h3 className={`font-semibold text-base ${styles.text} mb-2 mt-4 truncate`}>
                          Módulo Exemplo
                        </h3>
                        <p className={`text-sm ${styles.textMuted} line-clamp-2 mb-2`}>
                          Descrição detalhada do módulo com mais...
                        </p>
                      </div>
                        <Button className={`w-full text-sm h-9 ${styles.button} mb-1`}>
                         Acessar
                       </Button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                // Modern template
                <CardContent className="p-4 h-full flex flex-col relative">
                   {/* Price in top right corner */}
                   <div className="absolute top-3 right-3 text-right z-10">
                     <div className="flex flex-col space-y-1">
                       {/* Valor com desconto - sem R$ */}
                       <div className={`text-base font-bold text-green-600 dark:text-green-400`}>
                         2,00
                       </div>
                       {/* Valor original tachado */}
                       <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                         R$ 3,00
                       </div>
                       {/* Porcentagem do desconto */}
                       <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1 py-0 rounded-full text-center">
                         -33%
                       </div>
                     </div>
                   </div>
                  {/* Icon in top left corner - 3x larger */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`p-3 ${styles.iconBg} rounded-lg border group-hover:bg-purple-600 group-hover:text-white transition-colors`}>
                      <Package className={`h-16 w-16 ${styles.icon} group-hover:text-white transition-colors`} />
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between pt-20">
                    <div className="flex-grow">
                      <h3 className={`font-semibold ${styles.text} group-hover:text-purple-600 transition-colors mb-2 mt-4 text-base truncate`}>
                        Módulo Exemplo
                      </h3>
                      
                      <p className={`text-sm ${styles.textMuted} group-hover:text-gray-700 dark:group-hover:text-gray-300 mb-2 transition-colors line-clamp-2`}>
                        Descrição detalhada do módulo com mais...
                      </p>
                    </div>
                    
                     <Button 
                       size="sm" 
                       variant="outline" 
                       className={`w-full text-sm h-9 mb-1 ${styles.button}`}
                     >
                       Acessar
                     </Button>
                  </div>
                </CardContent>
            )}
          </Card>
        </div>
        
        {/* Radio Button Selection */}
        <div className="flex flex-col items-center space-y-2">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onClick}
          >
            <div 
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                isSelected 
                  ? 'border-purple-600 bg-purple-600' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <Label 
              className={`text-sm font-medium cursor-pointer ${
                isSelected ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {template.charAt(0).toUpperCase() + template.slice(1)}
            </Label>
          </div>
          <p className="text-xs text-gray-500 text-center">
            {theme === 'dark' ? 'Tema Escuro' : 'Tema Claro'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
