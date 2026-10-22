import { View, Text } from 'react-native'
import React from 'react'
import {Product} from '../types'
import { useApi } from '../lib/api'
import { useQuery } from '@tanstack/react-query'

const useProducts = () => {
    const api = useApi()
    const result = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await api.get<Product[]>('/products')
            return data
        }
    })
  return result
}

export default useProducts