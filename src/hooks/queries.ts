import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import type { GiftOrderForm } from '@/types';

export const queryKeys = {
  themes: ['themes'] as const,
  themeInfo: (themeId: string | number) => ['themes', themeId, 'info'] as const,
  themeProducts: (themeId: string | number) =>
    ['themes', themeId, 'products'] as const,
  rankingProducts: (targetType: string, rankType: string) =>
    ['products', 'ranking', targetType, rankType] as const,
  productSummary: (productId: string | number) =>
    ['products', productId, 'summary'] as const,
} as const;

export function useThemesQuery() {
  return useQuery({
    queryKey: queryKeys.themes,
    queryFn: () => apiService.getThemes(),
  });
}

export function useThemeInfoQuery(themeId: string | number) {
  return useQuery({
    queryKey: queryKeys.themeInfo(themeId),
    queryFn: () => apiService.getThemeInfo(themeId),
    enabled: !!themeId,
  });
}

export function useThemeProductsQuery(themeId: string | number) {
  return useQuery({
    queryKey: queryKeys.themeProducts(themeId),
    queryFn: () => apiService.getThemeProducts(themeId),
    enabled: !!themeId,
  });
}

export function useRankingProductsQuery(targetType: string, rankType: string) {
  return useQuery({
    queryKey: queryKeys.rankingProducts(targetType, rankType),
    queryFn: () => apiService.getRankingProducts(targetType, rankType),
    enabled: !!targetType && !!rankType,
  });
}

export function useProductSummaryQuery(productId: string | number) {
  return useQuery({
    queryKey: queryKeys.productSummary(productId),
    queryFn: () => apiService.getProductSummary(productId),
    enabled: !!productId,
  });
}

export function useThemeProductsInfiniteQuery(
  themeId: string | number,
  limit: number = 20
) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.themeProducts(themeId), 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      apiService.getThemeProductsWithPagination(themeId, {
        cursor: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const currentCursor = allPages.length * limit;
      return lastPage.hasMoreList ? currentCursor : undefined;
    },
    initialPageParam: 0,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiService.login(credentials),
    onSuccess: data => {
      // 로그인 성공 시 사용자 정보를 세션에 저장
      sessionStorage.setItem('userInfo', JSON.stringify(data));

      // 캐시 무효화
      queryClient.invalidateQueries();
    },
  });
}

export function useCreateGiftOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: GiftOrderForm) =>
      apiService.createGiftOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
    },
  });
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: {
      productId: number;
      ordererName: string;
      message: string;
      messageCardId: string;
      receivers: Array<{
        name: string;
        phoneNumber: string;
        quantity: number;
      }>;
    }) => apiService.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
