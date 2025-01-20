'use client'
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
};

type UserResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  docs: any[]
}

type UserProps = {
  url: string
  options?: AxiosRequestConfig
  immediate: true | false
  setLoading: (loading: boolean) => void
  setError: (error: boolean) => void
}

export default function useUsers<T = UserResponse>({ url, options, immediate = true, setLoading, setError }: UserProps) {
  const [state, setState] = useState<FetchState<T>>({
    data: null
  });

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios(url, options);
      setState({ data: response.data });
      setLoading(false)
      setError(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({
          data: null,
        });
        setLoading(false)
        setError(true)
      }
    }
  }, [url, options]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate]);

  return { ...state, refetch: fetchData };
}