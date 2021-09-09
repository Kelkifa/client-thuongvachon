import axiosClient from "./axiosClient";

export const gameApi = {
    clientGet: () => {
        const url = '/games/clientGet';
        return axiosClient.get(url);
    },
    adminGet: () => {
        const url = '/games/adminGet';
        return axiosClient.get(url);
    }
}