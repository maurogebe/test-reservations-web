import { Allergy } from '../interfaces/allergy.interface'
import ApiService from './ApiService'

export async function apiGetAllergies (data: any) {
    return ApiService.fetchData({
        url: '/allergy',
        method: 'get',
        data
    })
}

export async function apiCreateAllergy (data: Allergy) {
    return ApiService.fetchData({
        url: '/allergy',
        method: 'post',
        data
    })
}

export async function apiUpdateAllergy (data: Allergy) {
    return ApiService.fetchData({
        url: `/allergy/${data.id}`,
        method: 'put',
        data
    })
}