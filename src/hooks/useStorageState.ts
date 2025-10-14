import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

interface StorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

const promiseCache = new Map<string, Promise<string | null>>();

// 웹 환경에서 localStorage를 사용하는 헬퍼 함수들
const getItem = (key: string): Promise<string | null> => {
  return Promise.resolve(localStorage.getItem(key));
};

const setItem = (key: string, value: string): Promise<void> => {
  return Promise.resolve(localStorage.setItem(key, value));
};

const deleteItem = (key: string): Promise<void> => {
  return Promise.resolve(localStorage.removeItem(key));
};

export function useStorageState<T>(
  key: string,
  initialValue: T,
  options?: StorageOptions<T>
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);
  const isMounted = useRef(true);

  const serialize = options?.serialize ?? ((value: T) => JSON.stringify(value));
  const deserialize =
    options?.deserialize ?? ((value: string) => JSON.parse(value) as T);

  useEffect(() => {
    isMounted.current = true;

    if (promiseCache.has(key)) {
      promiseCache.get(key)!.then(stored => {
        if (!isMounted.current) return;

        if (stored !== null) {
          try {
            const parsed = deserialize(stored);
            setState(parsed);
          } catch {
            console.warn(`저장된 데이터가 손상되었습니다: 
${key}`);
            setState(initialValue);
          }
        } else {
          setState(initialValue);
        }
      });
      return;
    }

    const loadPromise = getItem(key)
      .then(stored => {
        if (!isMounted.current) return stored;

        if (stored !== null) {
          try {
            const parsed = deserialize(stored);
            setState(parsed);
          } catch {
            console.warn(`저장된 데이터가 손상되었습니다: 
${key}`);
            setState(initialValue);
          }
        } else {
          setState(initialValue);
        }

        return stored;
      })
      .catch(error => {
        console.error(`데이터를 불러올 수 없습니다: ${key}:`, error);
        if (isMounted.current) {
          setState(initialValue);
        }
        return null;
      });

    promiseCache.set(key, loadPromise);

    return () => {
      isMounted.current = false;
    };
  }, [key, initialValue, deserialize]);

  useEffect(() => {
    const saveValue = async () => {
      try {
        if (state === undefined || state === null) {
          await deleteItem(key);
        } else {
          await setItem(key, serialize(state));
        }
      } catch (error) {
        console.error(`데이터 저장 실패: ${key}:`, error);
      }
    };

    saveValue();
  }, [key, state, serialize]);

  return [state, setState];
}
