import ApiService from './ApiService'

export async function apiGetCities() {
    return ApiService.fetchData({
        url: 'city',
        method: 'get'
    })
}