import { useThemesQuery } from './queries';

export function useThemes() {
  const { data: themes, isLoading: loading, error } = useThemesQuery();
  return { themes: themes || [], loading, error };
}
