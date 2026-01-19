import { cookieUtils } from '@/utils/cookieUtils';

const API_BASE_URL = 'https://api.apipainel.com.br';

export interface CreateBaseCnpjMei {
  cpf_id: number;
  cnpj: string;
  razao_social?: string;
  natureza_juridica?: string;
  qualificacao?: string;
  capital_social?: number;
  porte_empresa?: string;
  ente_federativo?: string;
}

export interface BaseCnpjMei extends CreateBaseCnpjMei {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class BaseCnpjMeiService {
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

      console.log(`🔄 [BASE_CNPJ_MEI_SERVICE] ${method} ${API_BASE_URL}${endpoint}`, data);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        console.warn('⚠️ [BASE_CNPJ_MEI_SERVICE] HTTP Error:', {
          status: response.status,
          statusText: response.statusText,
          url: `${API_BASE_URL}${endpoint}`
        });
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const result = await response.json();
      console.log('✅ [BASE_CNPJ_MEI_SERVICE] Response:', result);
      
      return result;
    } catch (error) {
      console.error(`❌ [BASE_CNPJ_MEI_SERVICE] Error in ${method} ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async create(data: CreateBaseCnpjMei): Promise<ApiResponse<BaseCnpjMei>> {
    return this.request('POST', '/base-cnpj-mei', data);
  }

  async getById(id: number): Promise<ApiResponse<BaseCnpjMei>> {
    return this.request('GET', `/base-cnpj-mei/${id}`);
  }

  async getByCpfId(cpfId: number): Promise<ApiResponse<BaseCnpjMei[]>> {
    return this.request('GET', `/base-cnpj-mei?cpf_id=${cpfId}`);
  }

  async update(id: number, data: Partial<CreateBaseCnpjMei>): Promise<ApiResponse<BaseCnpjMei>> {
    return this.request('PUT', `/base-cnpj-mei/${id}`, data);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.request('DELETE', `/base-cnpj-mei/${id}`);
  }
}

export const baseCnpjMeiService = new BaseCnpjMeiService();