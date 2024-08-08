import { Bidding } from '../interfaces/bidding.interface'
import ApiService from './ApiService'

export async function apiGetBiddings (data: any) {
    return ApiService.fetchData({
        url: `/biddings?page=${data.pageIndex}${data.query?.length > 0 ? `&name=${data.query}` : ''}`,
        method: 'get'
    })
}

export async function apiGetBidding (id: number) {
    return ApiService.fetchData({
        url: `/bidding/${id}`,
        method: 'get'
    })
}

export async function apiCreateBidding (data: Bidding) {
    return ApiService.fetchData({
        url: '/bidding',
        method: 'post',
        data
    })
}

export async function apiUpdateBidding (data: Bidding) {
    return ApiService.fetchData({
        url: `/bidding/${data.id}`,
        method: 'put',
        data
    })
}