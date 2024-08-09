import ApiService from "./ApiService"

export async function apiGetTeam (data: any) {
    return ApiService.fetchData({
        url: '/team',
        method: 'get'
    })
}

export async function apiCreateTeam (data: any) {
    return ApiService.fetchData({
        url: '/team',
        method: 'post',
        data
    })
}

export async function apiUpdateTeam (data: any) {
    return ApiService.fetchData({
        url: '/team',
        method: 'put',
        data: data
    })
}