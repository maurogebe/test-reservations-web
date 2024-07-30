import ApiService from './ApiService'

export async function apiSignIn (data: any) {
    return ApiService.fetchData({
        url: '/auth/sign-in',
        method: 'post',
        data
    })
}