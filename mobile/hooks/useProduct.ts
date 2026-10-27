import { useQuery } from '@tanstack/react-query'
import { useApi } from '../lib/api'
import { Product } from '../types'
export const useProduct = (productId: string ) => {
    const api = useApi()
    const result = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const { data} = await api.get(`/products/${productId}`)
            return data
        },
        enabled:!!productId 
    })
    return result
}
    // const { data: addresses, isLoading, isError } = useQuery({
    //     queryKey: ['addresses'],
    //     queryFn: async () => {
    //         const { data } = await api.get<{ addresses: Address[] }>('/users/addresses')
    //         return data.addresses
    //     }
    // })