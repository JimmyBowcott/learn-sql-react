import axios from 'axios';
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const api = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:3456',
    headers: {
        'Content-Type': 'application/json',
    },
});

export function useRequest() {
  const { user } = useAuth();

  const request = useCallback(
    async (method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any) => {
      try {
        const res = await api.request({
          method,
          url,
          data,
          headers: {
            Authorization: (user.token && user.token.length > 0) ? `Bearer ${user.token}` : "",
          },
        })
        return res.data
      } catch (err: any) {
        throw err.response?.data || err
      }
    },
    []
  )

  return { request }
}
