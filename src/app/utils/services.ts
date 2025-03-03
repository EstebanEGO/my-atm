import axios from "axios";
import { urlApi } from "./enviroment";

export const saveTransaction = (id: string, data: any): Promise<any> => {
    return axios.post(`${urlApi}/atm/customer/${id}/transaction`, data);
}

export const onRegister = (data: any) => {
    return axios.post(`${urlApi}'/customers'`, data);
}

export const onLogin = (data: any) => {
    return axios.post(`${urlApi}/atm/validate/card`, data);
}

export const getTransactions = (id: string) => {
    return axios.get(`${urlApi}/atm/customer/${id}/transactions`);
}