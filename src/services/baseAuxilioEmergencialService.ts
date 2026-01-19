import { cookieUtils } from '@/utils/cookieUtils';
import { getFullApiUrl, getBaseApiUrl } from '@/utils/apiHelper';

export interface BaseAuxilioEmergencial {
  id?: number;
  cpf_id: number;
  uf?: string;
  mes_disponibilizacao?: string;
  enquadramento?: string;
  parcela?: string;
  observacao?: string;
  valor_beneficio?: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateBaseAuxilioEmergencial = Omit<BaseAuxilioEmergencial, 'id' | 'created_at' | 'updated_at'>;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class BaseAuxilioEmergencialService {
  private getHeaders() {
    const token = cookieUtils.get('session_token') || cookieUtils.get('api_session_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-API-Key': 'bG92YWJsZS5kZXY='
    };
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const config: RequestInit = {
        method,
        headers: this.getHeaders(),
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(data);
      }

      const url = getFullApiUrl(endpoint);
      console.log(`🔄 [BASE_AUXILIO_EMERGENCIAL_SERVICE] ${method} ${url}`, data);
      
      const response = await fetch(url, config);
      
      if (!response.ok) {
        console.warn('⚠️ [BASE_AUXILIO_EMERGENCIAL_SERVICE] HTTP Error:', {
          status: response.status,
          statusText: response.statusText,
          url
        });
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const result = await response.json();
      console.log('✅ [BASE_AUXILIO_EMERGENCIAL_SERVICE] Response:', result);
      
      return result;
    } catch (error) {
      console.error(`❌ [BASE_AUXILIO_EMERGENCIAL_SERVICE] Error in ${method} ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async create(data: CreateBaseAuxilioEmergencial): Promise<ApiResponse<BaseAuxilioEmergencial>> {
    return this.request('POST', '/base-auxilio-emergencial', data);
  }

  async getByCpfId(cpfId: number): Promise<ApiResponse<BaseAuxilioEmergencial[]>> {
    return this.request('GET', `/base-auxilio-emergencial/cpf-id/${cpfId}`);
  }

  async update(id: number, data: Partial<CreateBaseAuxilioEmergencial>): Promise<ApiResponse<BaseAuxilioEmergencial>> {
    return this.request('PUT', `/base-auxilio-emergencial/${id}`, data);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.request('DELETE', `/base-auxilio-emergencial/${id}`);
  }

  async deleteByCpfId(cpfId: number): Promise<ApiResponse<void>> {
    return this.request('DELETE', `/base-auxilio-emergencial/cpf-id/${cpfId}`);
  }
}

export const baseAuxilioEmergencialService = new BaseAuxilioEmergencialService();