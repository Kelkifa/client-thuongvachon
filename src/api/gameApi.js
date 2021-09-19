import axiosClient from "./axiosClient";

export const gameApi = {
    clientGet: () => {
        const url = '/games/clientGet';
        return axiosClient.get(url);
    },
    adminGet: () => {
        const url = '/games/adminGet';
        return axiosClient.get(url);
    },
    softDelete: (data) => {
        const url = '/games/delete';
        return axiosClient.patch(url, data);
    },
    forceDelete: (data) => {
        const url = '/games/delete';
        return axiosClient.delete(url, data);
    },
    restore: (data) => {
        const url = '/games/restore';
        return axiosClient.patch(url, data);
    },
    create: (data) => {
        const url = 'games/create';
        return axiosClient.post(url, data);
    }
}
