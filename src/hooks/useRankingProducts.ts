import { useRankingProductsQuery } from './queries';

export function useRankingProducts(targetType: string, rankType: string) {
  const {
    data: products,
    isLoading: loading,
    error,
  } = useRankingProductsQuery(targetType, rankType);
  return { products: products || [], loading, error };
}
