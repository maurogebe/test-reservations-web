import { Bid } from '../interfaces/bid.interface'
import ApiService from './ApiService'

export async function apiGetBid (id: number) {
    return ApiService.fetchData({
        url: `/bid/${id}`,
        method: 'get'
    })
}

export async function apiCreateBid (data: Bid) {
    return ApiService.fetchData({
        url: '/bid',
        method: 'post',
        data
    })
}

export async function apiUpdateBid (data: Bid) {
    return ApiService.fetchData({
        url: `/bid/${data.id}`,
        method: 'put',
        data
    })
}