import { Medicament } from '../interfaces/medicament.interface'
import ApiService from './ApiService'

export async function apiGetMedicaments (data: any = { queries: { name: '' } }) {
    return ApiService.fetchData({
        url: `/medicament?name=${data?.queries?.name}`,
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

export async function apiUpdateMedicament (data: Medicament) {
    return ApiService.fetchData({
        url: `/medicament/${data.id}`,
        method: 'put',
        data
    })
}