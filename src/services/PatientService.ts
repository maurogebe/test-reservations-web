import { Patient } from '../interfaces/patient.interface'
import ApiService from './ApiService'

export async function apiGetPatients (data: any) {
    return ApiService.fetchData({
        url: '/patient',
        method: 'get',
        data
    })
}

export async function apiCreatePatient (data: Patient) {
    return ApiService.fetchData({
        url: '/patient',
        method: 'post',
        data
    })
}

export async function apiUpdatePatient (data: Patient) {
    return ApiService.fetchData({
        url: `/patient/${data.id}`,
        method: 'put',
        data
    })
}