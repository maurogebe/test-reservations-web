import { ReservationQueries } from '../interfaces/reservation.interface';
import ApiService from './ApiService'; // Asegúrate de ajustar la importación según tu estructura de carpetas

/**
 * Obtiene las reservas filtradas por los parámetros proporcionados.
 * 
 * @param {number|null} customerId - ID del cliente (opcional)
 * @param {string|null} startDate - Fecha de inicio en formato YYYY-MM-DDTHH:MM:SS (opcional)
 * @param {string|null} endDate - Fecha de fin en formato YYYY-MM-DDTHH:MM:SS (opcional)
 * @param {number|null} roomId - ID de la habitación (opcional)
 * @returns {Promise<Object>} - Promesa que resuelve con los datos de las reservas
 */
export async function apiGetReservations(queries: ReservationQueries = { customerId: null, startDate: null, endDate: null, roomId: null }) {
    const queryParams = new URLSearchParams();

    if (queries.customerId !== null) {
        queryParams.append('customerId', queries.customerId);
    }
    if (queries.startDate !== null) {
        queryParams.append('startDate', queries.startDate);
    }
    if (queries.endDate !== null) {
        queryParams.append('queries.', queries.endDate);
    }
    if (queries.roomId !== null) {
        queryParams.append('roomId', queries.roomId);
    }

    // Construye la URL con los parámetros de consulta
    const url = `reservation?${queryParams.toString()}`;

    return ApiService.fetchData({
        url: url,
        method: 'get'
    });
}

export async function apiCreateReservation(data: any) {
    return ApiService.fetchData({
        url: 'reservation',
        method: 'post',
        data
    })
}

export async function apiUpdateReservation(id: number, data: any) {
    return ApiService.fetchData({
        url: `reservation/${id}`,
        method: 'put',
        data
    })
}

export async function apiDeleteReservation(id: number) {
    return ApiService.fetchData({
        url: `reservation/${id}`,
        method: 'delete'
    })
}
