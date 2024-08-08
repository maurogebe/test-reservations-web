import { Bid } from '../interfaces/bid.interface'
import ApiService from './ApiService'

export async function apiGetPlayers (data: any) {
    return ApiService.fetchData({
        url: `/players?page=${data.pageIndex}&tab=${data.selectedTab}&limit=${data.pageSize}${data.query?.length > 2 ? `&name=${data.query}` : ''}`,
        method: 'get'
    })
}