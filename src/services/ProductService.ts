import { GetProductByIdResponse, GetProductsParams, GetProductsResponse } from '../interfaces/product.interface';
import ApiService from './ApiService';
import { AxiosResponse } from 'axios';

export async function apiGetProducts(params: GetProductsParams): Promise<AxiosResponse<GetProductsResponse>> {
  return ApiService.fetchData({
    url: '/items',
    method: 'get',
    params
  });
}

export async function apiGetProductById(id: string): Promise<AxiosResponse<GetProductByIdResponse>> {
  return ApiService.fetchData({
    url: `/items/${id}`,
    method: 'get'
  });
}
