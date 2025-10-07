import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

export function useStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const loadStoredValue = async () => {
      if (!isMounted.current) {
        return;
      }

      try {
        // 웹 환경에서는 sessionStorage 사용 (브라우저 탭이 닫히면 삭제됨)
        const stored = sessionStorage.getItem(key);

        if (stored !== null) {
          try {
            const parsed = JSON.parse(stored) as T;
            setState(parsed);
          } catch {
            console.warn(`저장된 데이터가 손상되었습니다: ${key}`);
            setState(initialValue);
          }
        } else {
          setState(initialValue);
        }
      } catch (error) {
        console.error(`데이터를 불러올 수 없습니다: ${key}:`, error);
        setState(initialValue);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredValue();
    return () => {
      isMounted.current = false;
    };
  }, [key, initialValue]);

  useEffect(() => {
    const saveValue = async () => {
      try {
        if (state === undefined || state === null) {
          sessionStorage.removeItem(key);
        } else {
          sessionStorage.setItem(key, JSON.stringify(state));
        }
      } catch (error) {
        console.error(`데이터 저장 실패: ${key}:`, error);
      }
    };

    if (!isLoading) {
      saveValue();
    }
  }, [key, state, isLoading]);

  return [state, setState, isLoading];
}
