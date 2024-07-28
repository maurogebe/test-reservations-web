import { Medicament } from '../interfaces/medicament.interface'
import ApiService from './ApiService'

export async function apiGetMedicaments (data: any) {
    return ApiService.fetchData({
        url: '/medicament',
        method: 'get',
        data
    })
}

export async function apiCreateMedicament (data: Medicament) {
    return ApiService.fetchData({
        url: '/medicament',
        method: 'post',
        data
    })
}