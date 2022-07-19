import useSWR, { mutate } from "swr";

const fetcher = (url, token) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then(res => res.json());

export const useTokens = (token: string) => {
  const { data, error, mutate } = useSWR(['/api/user/tokens', token], fetcher);

  return {
    update: mutate,
    tokens: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useUsage = (token: string) => {
  const { data, error} = useSWR(['/api/user/usage', token], fetcher);

  return {
    usage: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useLogs = (token: string) => {
  const { data, error} = useSWR(['/api/user/logs', token], fetcher);

  return {
    logs: data,
    isLoadingLogs: !error && !data,
    isErrorLogs: error,
  };
};
