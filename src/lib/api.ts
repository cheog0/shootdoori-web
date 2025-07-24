import { BASE_URL, getAuthTokenFromSession } from '@/constants/api';
import type { GiftTheme, Product, ThemeInfo, GiftOrderForm } from '@/types';

export class ApiError extends Error {
  status: number;
  response: Record<string, unknown>;

  constructor(
    message: string,
    status: number,
    response: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = getAuthTokenFromSession();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: Record<string, unknown> = {};
      try {
        errorData = await response.json();
      } catch {}

      const errorMessage =
        errorData.data &&
        typeof errorData.data === 'object' &&
        'message' in errorData.data
          ? String(errorData.data.message)
          : response.statusText;

      throw new ApiError(errorMessage, response.status, errorData);
    }

    const data = await response.json();
    return data.data;
  }

  async getThemes(): Promise<GiftTheme[]> {
    return this.request<GiftTheme[]>('/api/themes');
  }

  async getThemeInfo(themeId: string | number): Promise<ThemeInfo> {
    return this.request<ThemeInfo>(`/api/themes/${themeId}/info`);
  }

  async getThemeProducts(themeId: string | number): Promise<Product[]> {
    return this.request<Product[]>(`/api/themes/${themeId}/products`);
  }

  async getThemeProductsWithPagination(
    themeId: string | number,
    params: { cursor: number; limit: number }
  ): Promise<{
    list: Product[];
    nextCursor: number | null;
    hasMoreList: boolean;
  }> {
    const searchParams = new URLSearchParams({
      cursor: String(params.cursor),
      limit: String(params.limit),
    });

    return this.request<{
      list: Product[];
      nextCursor: number | null;
      hasMoreList: boolean;
    }>(`/api/themes/${themeId}/products?${searchParams}`);
  }

  async getRankingProducts(
    targetType: string,
    rankType: string
  ): Promise<Product[]> {
    const params = new URLSearchParams({ targetType, rankType });
    return this.request<Product[]>(`/api/products/ranking?${params}`);
  }

  async getProductSummary(productId: string | number): Promise<{
    id: number;
    name: string;
    brandName?: string;
    price: number;
    imageURL: string;
  }> {
    return this.request(`/api/products/${productId}/summary`);
  }

  async login(credentials: { email: string; password: string }): Promise<{
    authToken: string;
    user: { id: number; email: string; name: string };
  }> {
    return this.request<{
      authToken: string;
      user: { id: number; email: string; name: string };
    }>('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async createGiftOrder(orderData: GiftOrderForm): Promise<{
    orderId: string;
    status: string;
  }> {
    return this.request('/api/gift-orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async createOrder(orderData: {
    productId: number;
    ordererName: string;
    message: string;
    messageCardId: string;
    receivers: Array<{
      name: string;
      phoneNumber: string;
      quantity: number;
    }>;
  }): Promise<{
    orderId: string;
    status: string;
  }> {
    return this.request('/api/order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }
}

export const apiService = new ApiService(BASE_URL);
