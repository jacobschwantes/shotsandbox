import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useTokens = (userId: string) => {
    const { data, error } = useSWR(`/api/user/${userId}/tokens`, fetcher)
  
    return {
      tokens: data,
      isLoading: !error && !data,
      isError: error
    }
  }