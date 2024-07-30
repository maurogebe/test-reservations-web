import { Sale } from '../interfaces/sale.interface'
import ApiService from './ApiService'

export async function apiGetSales (data: any) {
    return ApiService.fetchData({
        url: '/sale',
        method: 'get',
        data
    })
}

export async function apiCreateSale (data: Sale) {
    return ApiService.fetchData({
        url: '/sale',
        method: 'post',
        data
    })
}

export async function apiUpdateSale (data: Sale) {
    return ApiService.fetchData({
        url: `/sale/${data.id}`,
        method: 'put',
        data
    })
}