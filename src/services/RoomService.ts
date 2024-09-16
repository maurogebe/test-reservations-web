import { RoomQueries } from '../interfaces/room.interface';
import ApiService from './ApiService'; // Asegúrate de ajustar la importación según tu estructura de carpetas

/**
 * Obtiene las habitaciones filtradas por los parámetros proporcionados.
 * 
 * @param {string|null} startDate - Fecha de inicio en formato YYYY-MM-DDTHH:MM:SS (opcional)
 * @param {string|null} endDate - Fecha de fin en formato YYYY-MM-DDTHH:MM:SS (opcional)
 * @param {string|null} capacity - Capacidad de las habitaciones (opcional)
 * @param {string|null} cityId - ID de la habitación (opcional)
 * @returns {Promise<Object>} - Promesa que resuelve con los datos de las habitaciones
 */
export async function apiGetRooms(queries: RoomQueries = { startDate: null, endDate: null, capacity: null, cityId: null }) {
    const queryParams = new URLSearchParams();

    if (queries.startDate !== null) {
        queryParams.append('startDate', queries.startDate);
    }
    if (queries.endDate !== null) {
        queryParams.append('endDate', queries.endDate);
    }
    if (queries.capacity !== null) {
        queryParams.append('capacity', queries.capacity);
    }
    if (queries.cityId !== null) {
        queryParams.append('cityId', queries.cityId);
    }

    // Construye la URL con los parámetros de consulta
    const url = `room?${queryParams.toString()}`;

    return ApiService.fetchData({
        url: url,
        method: 'get'
    });
}
