import { Prescription } from '../interfaces/prescription.interface'
import ApiService from './ApiService'

export async function apiGetPrescriptions (data: any) {
    return ApiService.fetchData({
        url: '/prescription',
        method: 'get',
        data
    })
}

export async function apiCreatePrescription (data: Prescription) {
    return ApiService.fetchData({
        url: '/prescription',
        method: 'post',
        data
    })
}

export async function apiUpdatePrescription (data: Prescription) {
    return ApiService.fetchData({
        url: `/prescription/${data.id}`,
        method: 'put',
        data
    })
}

export async function apiPrescriptionOCR (data: FormData) {
    const headers = {
        'Content-Type': 'multipart/form-data',
      };
    return ApiService.fetchData({
        url: '/prescription/ocr',
        method: 'post',
        headers,
        data
    })
}